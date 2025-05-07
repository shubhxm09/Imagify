import 'dotenv/config';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

async function testClipDropAPI() {
  try {
    // Get the API key from command line argument or environment variable
    const apiKey = process.argv[2] || process.env.CLIPDROP_API;
    
    if (!apiKey || apiKey === 'YOUR_NEW_CLIPDROP_API_KEY_HERE') {
      console.error('Please provide a valid API key as a command line argument or in the .env file');
      console.error('Usage: node test-api.js YOUR_API_KEY');
      return;
    }
    
    console.log('Testing with API Key:', apiKey.substring(0, 5) + '...' + apiKey.substring(apiKey.length - 5));
    
    const formdata = new FormData();
    formdata.append('prompt', 'A beautiful sunset over mountains');
    
    console.log('Making API request to ClipDrop...');
    const response = await axios.post('https://clipdrop-api.co/text-to-image/v1', formdata, {
      headers: {
        'x-api-key': apiKey,
      },
      responseType: "arraybuffer"
    });
    
    console.log('API request successful!');
    console.log('Response status:', response.status);
    console.log('Response received with data length:', response.data.length);
    
    // Save the image to a file for verification
    const outputPath = './test-image.png';
    fs.writeFileSync(outputPath, response.data);
    console.log(`Image saved to ${outputPath}`);
    
    // If successful, offer to update the .env file
    console.log('\nWould you like to update your .env file with this API key? (y/n)');
    process.stdin.once('data', (data) => {
      const answer = data.toString().trim().toLowerCase();
      if (answer === 'y' || answer === 'yes') {
        try {
          const envPath = './.env';
          let envContent = fs.readFileSync(envPath, 'utf8');
          envContent = envContent.replace(
            /CLIPDROP_API\s*=\s*['"].*['"]/,
            `CLIPDROP_API = '${apiKey}'`
          );
          fs.writeFileSync(envPath, envContent);
          console.log('.env file updated successfully!');
        } catch (err) {
          console.error('Error updating .env file:', err.message);
        }
      }
      process.exit(0);
    });
    
  } catch (error) {
    console.error('API request failed:');
    console.error('Error message:', error.message);
    console.error('Error status:', error.response?.status);
    
    if (error.response?.data) {
      try {
        // Try to parse the error data as JSON
        const errorText = Buffer.from(error.response.data).toString('utf8');
        console.error('Error details:', errorText);
      } catch (e) {
        console.error('Error data:', error.response.data.toString());
      }
    }
    
    if (error.response?.status === 403) {
      console.error('\nYour API key is invalid or has been revoked.');
      console.error('Please get a new API key from ClipDrop:');
      console.error('1. Visit https://clipdrop.co/apis');
      console.error('2. Sign in or create an account');
      console.error('3. Go to your account page to manage API keys');
      console.error('4. Generate a new API key');
      console.error('5. Run this test again with your new key: node test-api.js YOUR_NEW_API_KEY');
    }
  }
}

testClipDropAPI();

testClipDropAPI();