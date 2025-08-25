import mongoose from 'mongoose'
const messageSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role:{
        type: String,
        enum: ["user", "system"],
    }
},{timestamps : true})

const Message = mongoose.model("Message", messageSchema)

export default Message;