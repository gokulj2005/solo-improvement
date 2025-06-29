# Deployment Guide for Solo Improvement

This guide covers deploying the Solo Improvement application with automated daily quest reset functionality.

## Prerequisites

1. **Supabase Project**: Ensure your Supabase project is set up with the profiles table
2. **Environment Variables**: Make sure your `.env` file contains:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Setting Up the Daily Quest Reset

### Step 1: Deploy the Edge Function

The Edge Function is automatically deployed to Supabase. The function is located at:
```
supabase/functions/reset-daily-quests/index.ts
```

### Step 2: Set Up Automated Scheduling

Since Supabase doesn't have built-in cron scheduling, you'll need to use an external service to trigger the function daily.

#### Option A: Using cron-job.org (Recommended)

1. Go to [cron-job.org](https://cron-job.org)
2. Create a free account
3. Create a new cron job with these settings:
   - **URL**: `https://your-project-id.supabase.co/functions/v1/reset-daily-quests`
   - **Method**: POST
   - **Schedule**: `0 0 * * *` (daily at midnight UTC)
   - **Title**: "Solo Improvement Daily Quest Reset"

#### Option B: Using GitHub Actions

Create `.github/workflows/daily-reset.yml`:

```yaml
name: Daily Quest Reset

on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight UTC
  workflow_dispatch:  # Allow manual trigger

jobs:
  reset-quests:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Quest Reset
        run: |
          curl -X POST https://your-project-id.supabase.co/functions/v1/reset-daily-quests
```

#### Option C: Using EasyCron

1. Go to [EasyCron](https://www.easycron.com/)
2. Create a free account
3. Add a new cron job:
   - **URL**: `https://your-project-id.supabase.co/functions/v1/reset-daily-quests`
   - **Method**: POST
   - **When**: Daily at 00:00 UTC

### Step 3: Test the Function

You can manually test the function by making a POST request:

```bash
curl -X POST https://your-project-id.supabase.co/functions/v1/reset-daily-quests
```

Expected response:
```json
{
  "message": "Daily quest reset completed successfully",
  "resetCount": 5,
  "processedProfiles": 10,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Frontend Deployment

### Option 1: Netlify (Recommended)

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Option 2: Vercel

1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect the Vite configuration
3. Add environment variables in Vercel dashboard

### Option 3: Manual Build

```bash
npm run build
# Upload the dist/ folder to your hosting provider
```

## Monitoring and Maintenance

### Monitoring the Reset Function

1. **Check Supabase Logs**: Monitor the Edge Function logs in your Supabase dashboard
2. **Set Up Alerts**: Configure your cron service to send notifications if the function fails
3. **Manual Backup**: Users can manually reset their daily quests using the "Reset Now" button on the dashboard

### Database Maintenance

The system automatically:
- Updates the `updated_at` timestamp when profiles are modified
- Maintains data integrity by only resetting daily quests
- Preserves all other game progress and data

### Troubleshooting

**Function not triggering:**
- Check your cron service configuration
- Verify the Supabase URL is correct
- Ensure the function is deployed properly

**Users not seeing reset quests:**
- The app automatically syncs when users log in
- Users may need to refresh their browser
- Check the browser's localStorage for cached data

**Performance issues:**
- The function processes all users sequentially
- For large user bases, consider implementing batch processing
- Monitor Supabase usage and upgrade plan if needed

## Security Considerations

1. **Service Role Key**: The function uses the service role key for admin access
2. **CORS**: The function includes proper CORS headers
3. **Error Handling**: Comprehensive error handling prevents data corruption
4. **Rate Limiting**: Consider implementing rate limiting if the endpoint is exposed publicly

## Cost Optimization

1. **Edge Function Usage**: Monitor your Supabase Edge Function usage
2. **Database Reads/Writes**: The function minimizes database operations
3. **Cron Service**: Most cron services offer free tiers sufficient for this use case

## Future Enhancements

1. **Timezone Support**: Currently resets at UTC midnight, could be enhanced for user timezones
2. **Batch Processing**: For scaling to thousands of users
3. **Notification System**: Send push notifications when quests reset
4. **Analytics**: Track quest completion rates and user engagement