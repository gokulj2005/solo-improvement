import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client with service role key for admin access
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    console.log('Starting daily quest reset...')

    // Get all user profiles
    const { data: profiles, error: fetchError } = await supabaseAdmin
      .from('profiles')
      .select('id, user_id, character')

    if (fetchError) {
      throw new Error(`Failed to fetch profiles: ${fetchError.message}`)
    }

    if (!profiles || profiles.length === 0) {
      console.log('No profiles found')
      return new Response(
        JSON.stringify({ message: 'No profiles found', resetCount: 0 }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    let resetCount = 0
    const currentDate = new Date().toISOString().split('T')[0] // Get current date in YYYY-MM-DD format

    // Process each profile
    for (const profile of profiles) {
      try {
        if (!profile.character || !profile.character.gameState) {
          console.log(`Skipping profile ${profile.id} - no character or game state`)
          continue
        }

        const character = profile.character
        const gameState = character.gameState

        if (!gameState.quests || !Array.isArray(gameState.quests)) {
          console.log(`Skipping profile ${profile.id} - no quests array`)
          continue
        }

        let hasChanges = false
        const updatedQuests = gameState.quests.map((quest: any) => {
          // Reset daily quests that were completed before today
          if (quest.type === 'daily' && quest.completed && quest.completedAt) {
            const completedDate = new Date(quest.completedAt).toISOString().split('T')[0]
            
            // If quest was completed on a previous day, reset it
            if (completedDate < currentDate) {
              hasChanges = true
              return {
                ...quest,
                completed: false,
                completedAt: undefined
              }
            }
          }
          return quest
        })

        // Only update if there are changes
        if (hasChanges) {
          const updatedCharacter = {
            ...character,
            gameState: {
              ...gameState,
              quests: updatedQuests,
              lastSaved: new Date().toISOString()
            }
          }

          const { error: updateError } = await supabaseAdmin
            .from('profiles')
            .update({ 
              character: updatedCharacter,
              updated_at: new Date().toISOString()
            })
            .eq('id', profile.id)

          if (updateError) {
            console.error(`Failed to update profile ${profile.id}:`, updateError.message)
          } else {
            resetCount++
            console.log(`Reset daily quests for profile ${profile.id}`)
          }
        }
      } catch (profileError) {
        console.error(`Error processing profile ${profile.id}:`, profileError)
      }
    }

    console.log(`Daily quest reset completed. Reset quests for ${resetCount} users.`)

    return new Response(
      JSON.stringify({ 
        message: 'Daily quest reset completed successfully',
        resetCount,
        processedProfiles: profiles.length,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in daily quest reset:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})