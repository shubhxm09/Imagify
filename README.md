# Imagify

Imagify is a full-stack web application that allows users to generate AI-powered images from text prompts. The application features user authentication, credit system, payment integration, and image gallery functionality.

## Features

- **AI Image Generation**: Convert text prompts into high-quality images using ClipDrop API
- **Multiple Style Options**: Generate images in various styles including cartoon, realistic, abstract, sketch, and watercolor
- **User Authentication**: Secure login and registration system
- **Credit System**: Pay-as-you-go model with different credit packages
- **Payment Integration**: Supports both Razorpay and Stripe payment gateways
- **Image Gallery**: View and manage your previously generated images
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Tailwind CSS for styling
- Framer Motion for animations
- Axios for API requests
- React Toastify for notifications

### Backend
- Node.js with Express
- MongoDB with Mongoose for database
- JWT for authentication
- Bcrypt for password hashing
- Razorpay and Stripe for payment processing
- ClipDrop API for image generation

## Project Structure

```
Imagify/
├── client/                 # Frontend React application
│   ├── public/             # Public assets
│   ├── src/                # Source files
│   │   ├── assets/         # Static assets
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context providers
│   │   ├── pages/          # Page components
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Entry point
│   └── package.json        # Frontend dependencies
│
├── server/                 # Backend Node.js application
│   ├── configs/            # Configuration files
│   ├── controllers/        # API controllers
│   ├── middlewares/        # Express middlewares
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── server.js           # Server entry point
│   └── package.json        # Backend dependencies
│
└── package.json            # Root package.json
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Razorpay and/or Stripe account
- ClipDrop API key

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/imagify.git
   cd imagify
   ```

2. Install dependencies
   ```
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd ../server
   npm install
   ```

3. Environment Setup
   
   Create a `.env` file in the server directory with the following variables:
   ```
   PORT=4000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIPDROP_API=your_clipdrop_api_key
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   CURRENCY=USD
   ```

### Running the Application

1. Start the backend server
   ```
   cd server
   npm run server
   ```

2. Start the frontend development server
   ```
   cd client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Usage

1. **Register/Login**: Create an account or log in to access the image generation features
2. **Purchase Credits**: Buy credits using Razorpay or Stripe payment options
3. **Generate Images**: Enter a text prompt, select a style, and generate your image
4. **View Gallery**: Access your previously generated images in the gallery section

## Credit Plans

- **Basic**: 100 credits for $10
- **Advanced**: 500 credits for $50
- **Business**: 5000 credits for $250

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [ClipDrop API](https://clipdrop.co/apis) for image generation
- [Razorpay](https://razorpay.com/) and [Stripe](https://stripe.com/) for payment processing
- [React](https://reactjs.org/) and [Express](https://expressjs.com/) communities for excellent documentation