import 'dotenv/config';
import axios from 'axios';

// First, let's get a valid user ID from the database
import mongoose from 'mongoose';
import userModel from './models/userModel.js';
import connectDB from './configs/mongodb.js';

async function debugImageGenerationEndpoint() {
  try {
    // Connect to the database
    await connectDB();
    console.log('Connected to MongoDB');
    
    // Find a user with credit balance > 0
    const user = await userModel.findOne({ creditBalance: { $gt: 0 } });
    
    if (!user) {
      console.log('No user found with credit balance > 0. Please create a user with credits.');
      return;
    }
    
    console.log(`Found user: ${user._id} with credit balance: ${user.creditBalance}`);
    
    // Now test the image generation endpoint
    try {
      console.log('Testing image generation endpoint...');
      console.log('Request data:', {
        userId: user._id.toString(),
        prompt: 'A beautiful sunset over mountains',
        style: 'default'
      });
      
      const response = await axios.post('http://localhost:4000/api/image/generate', {
        userId: user._id.toString(),
        prompt: 'A beautiful sunset over mountains',
        style: 'default'
      });
      
      console.log('Response status:', response.status);
      console.log('Response data:', JSON.stringify(response.data, null, 2));
      
    } catch (error) {
      console.error('Request to endpoint failed:');
      console.error('Error message:', error.message);
      
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', JSON.stringify(error.response.data, null, 2));
      }
    }
    
  } catch (error) {
    console.error('Script error:', error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  }
}

debugImageGenerationEndpoint();