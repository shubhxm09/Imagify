import 'dotenv/config';
import axios from 'axios';

async function testImageGeneration() {
  try {
    console.log('Testing image generation endpoint...');
    
    // Replace with a valid user ID from your database
    const userId = ''; // You'll need to add a valid user ID here
    
    if (!userId) {
      console.log('Please add a valid user ID to this script before running it.');
      return;
    }
    
    const response = await axios.post('http://localhost:4000/api/image/generate', {
      userId,
      prompt: 'A beautiful sunset over mountains',
      style: 'default'
    });
    
    console.log('Response status:', response.status);
    console.log('Response success:', response.data.success);
    
    if (response.data.success) {
      console.log('Image generation successful!');
      console.log('Credit balance remaining:', response.data.creditBalance);
    } else {
      console.log('Image generation failed:', response.data.message);
    }
    
  } catch (error) {
    console.error('Request failed:');
    console.error('Error message:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testImageGeneration();