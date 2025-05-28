import { createClient } from 'npm:@supabase/supabase-js@2.39.3'
import { Configuration, OpenAIApi } from 'npm:openai@4.24.1'

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
    const { input } = await req.json()

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    })

    const openai = new OpenAIApi(configuration)

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: "You are a helpful AI assistant for Brajesh's portfolio website. Be concise, professional, and friendly."
        },
        {
          role: 'user',
          content: input
        }
      ],
      temperature: 0.7,
    })

    const response = completion.data.choices[0].message

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
    console.error('Error:', error)
    
    let statusCode = 500
    let message = 'An internal error occurred'

    if (error.response) {
      statusCode = error.response.status
      switch (statusCode) {
        case 401:
          message = 'API key is invalid'
          break
        case 429:
          message = 'Too many requests. Please try again later'
          break
        case 500:
          message = 'OpenAI service is currently unavailable'
          break
        default:
          message = 'Failed to get response from AI'
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