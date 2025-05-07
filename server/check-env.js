import 'dotenv/config';

console.log('Environment variables:');
console.log('CLIPDROP_API:', process.env.CLIPDROP_API ? `${process.env.CLIPDROP_API.substring(0, 5)}...${process.env.CLIPDROP_API.substring(process.env.CLIPDROP_API.length - 5)}` : 'Not set');