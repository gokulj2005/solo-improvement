# Daily Quest Reset Function

This Edge Function automatically resets daily quests for all users at midnight UTC.

## How it works

1. **Fetches all user profiles** from the database
2. **Checks each user's daily quests** in their character's game state
3. **Resets completed daily quests** that were completed before the current day
4. **Updates the database** with the reset quest states
5. **Returns a summary** of how many users had their quests reset

## Scheduling

To run this function automatically every day at midnight UTC, you can use:

### Option 1: External Cron Service (Recommended)
Use a service like [cron-job.org](https://cron-job.org) or [EasyCron](https://www.easycron.com/) to make a POST request to:

```
https://your-project-id.supabase.co/functions/v1/reset-daily-quests
```

Set the schedule to: `0 0 * * *` (daily at midnight UTC)

### Option 2: GitHub Actions
Create a GitHub Action workflow that runs daily and calls the function.

### Option 3: Server Cron Job
If you have a server, add this to your crontab:

```bash
0 0 * * * curl -X POST https://your-project-id.supabase.co/functions/v1/reset-daily-quests
```

## Manual Testing

You can manually trigger the function by making a POST request to the endpoint:

```bash
curl -X POST https://your-project-id.supabase.co/functions/v1/reset-daily-quests
```

## Response Format

```json
{
  "message": "Daily quest reset completed successfully",
  "resetCount": 5,
  "processedProfiles": 10,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Error Handling

The function includes comprehensive error handling:
- Skips profiles without character data
- Logs errors for individual profile processing failures
- Continues processing even if some profiles fail
- Returns detailed error information if the function fails

## Security

- Uses Supabase service role key for admin access
- Only resets daily quests (preserves other quest types)
- Maintains data integrity by only updating necessary fields
- Includes CORS headers for web-based triggers