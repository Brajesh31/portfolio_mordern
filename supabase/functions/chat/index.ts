import { createClient } from 'npm:@supabase/supabase-js@4.39.5'
import { Configuration, OpenAIApi } from 'npm:openai@6.24.3'
import config from '../../../src/data/chatbot.json\' assert { type: "json" }

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
      throw new Error('Missing Supabase credentials');
    }

    if (!openaiKey) {
      throw new Error('Missing OpenAI API key');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const configuration = new Configuration({
      apiKey: openaiKey,
    })

    const openai = new OpenAIApi(configuration)

    try {
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
        throw new Error('No response received from OpenAI');
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
    } catch (openaiError: any) {
      // Handle OpenAI specific errors
      const statusCode = openaiError.response?.status || 500;
      let errorMessage = 'An error occurred while processing your request';

      if (openaiError.response?.data?.error?.message) {
        errorMessage = openaiError.response.data.error.message;
      } else {
        switch (statusCode) {
          case 401:
            errorMessage = 'Invalid OpenAI API key';
            break;
          case 429:
            errorMessage = 'Rate limit exceeded. Please try again later';
            break;
          case 500:
            errorMessage = 'OpenAI service is currently unavailable';
            break;
          case 503:
            errorMessage = 'OpenAI service is temporarily down for maintenance';
            break;
        }
      }

      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Error in chat function:', error);
    
    let statusCode = 500;
    let message = error instanceof Error ? error.message : 'An unexpected error occurred';

    // Handle validation errors
    if (message === 'Request body is empty' || message === 'Input is required') {
      statusCode = 400;
    }
    
    // Handle configuration errors
    if (message.includes('Missing')) {
      statusCode = 503;
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