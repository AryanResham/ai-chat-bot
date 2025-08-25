import mongoose from 'mongoose'

const refreshTokenSchema = new mongoose.Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jti:{
        type: String,
        required: true
    },
    revoked: {
        type: Boolean,
        default: null
    },
    replacedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RefreshToken',
        default: null
    }
}, {timestamps: true})


const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema)
export default RefreshToken