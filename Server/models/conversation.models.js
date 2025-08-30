import mongoose from 'mongoose';

const turnSchema = new mongoose.Schema(
  {
    userMessage: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Message" 
    },
    systemResponse: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Message"
    },
  },
  { _id: false }
);

const conversationSchema = new mongoose.Schema(
  {
    title: { 
        type: String
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    messages: { 
        type: [turnSchema], 
        default: [] 
    }
  },
  { timestamps: true }
);

conversationSchema.pre("validate", async function (next) {
  if (!this.title) {
    const count = await mongoose.model("Conversation").countDocuments({ userId: this.userId });
    this.title = `Chat #${count + 1}`;
  }
  next();
});


const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;