import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';

// Test MongoDB Connection
async function testMongoDBConnection() {
  console.log('Testing MongoDB Connection...');
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/imagify`);
    console.log('✅ MongoDB Connection Successful!');
    return true;
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    return false;
  } finally {
    await mongoose.disconnect();
  }
}

// Test Express Server
async function testExpressServer() {
  console.log('Testing Express Server...');
  try {
    const app = express();
    const server = app.listen(4001, () => {
      console.log('✅ Express Server Started Successfully on port 4001');
      server.close();
    });
    return true;
  } catch (error) {
    console.error('❌ Express Server Failed to Start:', error.message);
    return false;
  }
}

// Run all tests
async function runTests() {
  console.log('=== BACKEND CONNECTION TESTS ===');
  
  const mongoResult = await testMongoDBConnection();
  const expressResult = await testExpressServer();
  
  console.log('\n=== TEST SUMMARY ===');
  console.log(`MongoDB: ${mongoResult ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Express Server: ${expressResult ? '✅ PASSED' : '❌ FAILED'}`);
}

runTests();