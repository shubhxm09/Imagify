import 'dotenv/config';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

async function debugClipDropAPI() {
  try {
    const apiKey = process.env.CLIPDROP_API;
    console.log('Using API Key:', apiKey.substring(0, 5) + '...' + apiKey.substring(apiKey.length - 5));
    
    const formdata = new FormData();
    formdata.append('prompt', 'A beautiful sunset over mountains');
    
    console.log('Making API request to ClipDrop...');
    console.log('Request URL: https://clipdrop-api.co/text-to-image/v1');
    console.log('Request Headers:');
    console.log('  x-api-key:', apiKey.substring(0, 5) + '...' + apiKey.substring(apiKey.length - 5));
    
    try {
      const response = await axios.post('https://clipdrop-api.co/text-to-image/v1', formdata, {
        headers: {
          'x-api-key': apiKey,
        },
        responseType: "arraybuffer",
        validateStatus: function (status) {
          return true; // Always return true to handle all status codes
        }
      });
      
      console.log('Response received:');
      console.log('Status Code:', response.status);
      console.log('Status Text:', response.statusText);
      console.log('Headers:', JSON.stringify(response.headers, null, 2));
      
      if (response.status === 200) {
        console.log('Response data is binary (length:', response.data.length, 'bytes)');
        const outputPath = './debug-image.png';
        fs.writeFileSync(outputPath, response.data);
        console.log(`Image saved to ${outputPath}`);
      } else {
        // Try to parse the error response
        const errorText = Buffer.from(response.data).toString('utf8');
        try {
          const errorJson = JSON.parse(errorText);
          console.log('Error response:', JSON.stringify(errorJson, null, 2));
        } catch (e) {
          console.log('Error response (raw):', errorText);
        }
      }
    } catch (error) {
      console.error('Request failed with exception:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        
        if (error.response.data) {
          try {
            const errorText = Buffer.from(error.response.data).toString('utf8');
            try {
              const errorJson = JSON.parse(errorText);
              console.error('Error response:', JSON.stringify(errorJson, null, 2));
            } catch (e) {
              console.error('Error response (raw):', errorText);
            }
          } catch (e) {
            console.error('Could not parse error response');
          }
        }
      }
    }
  } catch (error) {
    console.error('Script error:', error);
  }
}

debugClipDropAPI();