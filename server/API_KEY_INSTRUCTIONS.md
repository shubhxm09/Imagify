# ClipDrop API Key Instructions

## Issue: 403 Forbidden Error - "Revocated API key"

If you're seeing a "Request failed with status code 403" error when generating images, it means your ClipDrop API key has been revoked or is no longer valid.

## How to Fix:

1. **Get a new API key from ClipDrop**:
   - Visit [ClipDrop APIs](https://clipdrop.co/apis)
   - Sign in to your account or create a new one
   - Navigate to your account page
   - Generate a new API key

2. **Test your new API key**:
   ```bash
   node test-api.js YOUR_NEW_API_KEY
   ```
   This will test if your API key works correctly and offer to update your `.env` file automatically.

3. **Manually update your .env file**:
   - Open the `.env` file in the server directory
   - Replace the value for `CLIPDROP_API` with your new API key
   ```
   CLIPDROP_API = 'your-new-api-key-here'
   ```

4. **Restart your server**:
   - After updating the API key, restart your server to apply the changes

## ClipDrop API Credits

- Each successful image generation uses 1 credit
- New accounts get 100 free credits for development and testing
- You can purchase more credits from the ClipDrop website

## Need Help?

Contact ClipDrop support at contact@clipdrop.co or join their [Slack community](https://community.clipdrop.co/).# ClipDrop API Key Instructions

## Issue: 403 Forbidden Error - "Revocated API key"

If you're seeing a "Request failed with status code 403" error when generating images, it means your ClipDrop API key has been revoked or is no longer valid.

## How to Fix:

1. **Get a new API key from ClipDrop**:
   - Visit [ClipDrop APIs](https://clipdrop.co/apis)
   - Sign in to your account or create a new one
   - Navigate to your account page
   - Generate a new API key

2. **Test your new API key**:
   ```bash
   node test-api.js YOUR_NEW_API_KEY
   ```
   This will test if your API key works correctly and offer to update your `.env` file automatically.

3. **Manually update your .env file**:
   - Open the `.env` file in the server directory
   - Replace the value for `CLIPDROP_API` with your new API key
   ```
   CLIPDROP_API = 'your-new-api-key-here'
   ```

4. **Restart your server**:
   - After updating the API key, restart your server to apply the changes

## ClipDrop API Credits

- Each successful image generation uses 1 credit
- New accounts get 100 free credits for development and testing
- You can purchase more credits from the ClipDrop website

## Need Help?

Contact ClipDrop support at contact@clipdrop.co or join their [Slack community](https://community.clipdrop.co/).