import { createClient } from 'npm:@supabase/supabase-js@2.39.3'
import { Configuration, OpenAIApi } from 'npm:openai@4.24.1'
import config from '../../../src/data/chatbot.json' assert { type: "json" }

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Validate request body
    const body = await req.text();
    if (!body) {
      throw new Error('Request body is empty');
    }

    const { input } = JSON.parse(body);
    if (!input) {
      throw new Error('Input is required');
    }

    // Validate environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY');
    const openaiKey = Deno.env.get('OPENAI_API_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase configuration is missing');
    }

    if (!openaiKey) {
      throw new Error('OpenAI API key is missing');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const configuration = new Configuration({
      apiKey: openaiKey,
    })

    const openai = new OpenAIApi(configuration)

    const completion = await openai.createChatCompletion({
      model: config.settings.model,
      messages: [
        {
          role: 'system',
          content: config.systemPrompt
        },
        {
          role: 'user',
          content: input
        }
      ],
      temperature: config.settings.temperature,
      max_tokens: config.settings.maxTokens,
      top_p: config.settings.topP,
      frequency_penalty: config.settings.frequencyPenalty,
      presence_penalty: config.settings.presencePenalty
    })

    if (!completion.data.choices?.[0]?.message) {
      throw new Error('Invalid response from OpenAI');
    }

    const response = completion.data.choices[0].message;

    return new Response(
      JSON.stringify({ response }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    console.error('Error in chat function:', error);
    
    let statusCode = 500;
    let message = config.responses.error;

    if (error instanceof Error) {
      if (error.message === 'Request body is empty' || error.message === 'Input is required') {
        statusCode = 400;
        message = config.responses.empty;
      } else if (error.message === 'Supabase configuration is missing' || error.message === 'OpenAI API key is missing') {
        statusCode = 500;
        message = 'Server configuration error';
      }
    }
    
    if ('response' in error) {
      statusCode = error.response?.status || 500;
      switch (statusCode) {
        case 401:
          message = 'API key is invalid';
          break;
        case 429:
          message = 'Too many requests. Please try again later';
          break;
        case 500:
          message = 'OpenAI service is currently unavailable';
          break;
      }
    }

    return new Response(
      JSON.stringify({ error: message }),
      { 
        status: statusCode,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  }
})