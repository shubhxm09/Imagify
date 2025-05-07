import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    style: {
        type: String,
        default: 'default',
        enum: ['default', 'cartoon', 'realistic', 'abstract', 'sketch', 'watercolor']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const imageModel = mongoose.model('Image', imageSchema)
export default imageModel