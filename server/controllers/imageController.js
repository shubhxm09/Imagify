import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'
import userModel from '../models/userModel.js'
import imageModel from '../models/imageModel.js'


export const getImageHistory = async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.json({ success: false, message: 'User ID is required' });
    }
    
   
    const images = await imageModel.find({ userId }).sort({ createdAt: -1 });
    
    res.json({ success: true, images });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const generateImage = async (req, res) => {

  try {

    const { userId, prompt, style = 'default' } = req.body

    // Fetching User Details Using userId
    const user = await userModel.findById(userId)
    
    if (!user || !prompt) {
      return res.json({ success: false, message: 'Missing Details' })
    }

    // Checking User creditBalance
    if (user.creditBalance === 0 || user.creditBalance < 0) {
      return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance })
    }


    const formdata = new FormData()
    
    
    let styledPrompt = prompt;
    
    switch(style) {
      case 'cartoon':
        styledPrompt = `${prompt}, cartoon style, vibrant colors, stylized`;
        break;
      case 'realistic':
        styledPrompt = `${prompt}, photorealistic, detailed, high resolution`;
        break;
      case 'abstract':
        styledPrompt = `${prompt}, abstract art style, colorful, non-representational`;
        break;
      case 'sketch':
        styledPrompt = `${prompt}, pencil sketch, black and white, hand-drawn`;
        break;
      case 'watercolor':
        styledPrompt = `${prompt}, watercolor painting style, soft colors, artistic`;
        break;
      default:
        // Use the original prompt
        break;
    }
    
    formdata.append('prompt', styledPrompt)

    // Calling Clipdrop API
    const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formdata, {
      headers: {
        'x-api-key': process.env.CLIPDROP_API,
      },
      responseType: "arraybuffer"
    })

    // Convertion of arrayBuffer to base64
    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:image/png;base64,${base64Image}`

    // Deduction of user credit 
    await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 })
    
    // Save the generated image to history
    await imageModel.create({
      userId: user._id,
      prompt,
      imageUrl: resultImage,
      style
    })

    // Sending Response
    res.json({ success: true, message: "Image Generated", resultImage, creditBalance: user.creditBalance - 1 })

  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}