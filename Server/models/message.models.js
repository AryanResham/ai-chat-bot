import mongoose from 'mongoose'
const messageSchema = mongoose.Schema({
    conversationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true,
        index: true
    },
    message: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["user", "system"],
    },
    responseTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: null
    }
},{timestamps : true})

messageSchema.pre("validate", function (next) {
  if (this.role === "user" && this.responseTo) {
    return next(new Error("User messages cannot have responseTo"));
  }
  if (this.role === "assistant" && !this.responseTo) {
    return next(new Error("Assistant messages must reference responseTo"));
  }
  next();
});



const Message = mongoose.model("Message", messageSchema)

export default Message;