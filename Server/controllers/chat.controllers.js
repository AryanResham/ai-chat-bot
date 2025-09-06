import Conversation from '../models/conversation.models.js';
import { getChatCompletion } from '../utils/groqApi.utils.js';

async function createNewConversation(req, res) {
    const userId= req.user.userId;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    try {
        const chatTitle = req.body?.title || null;
        if (chatTitle){
            const newConversation = new Conversation({ userId, title: chatTitle});
            await newConversation.save();
            return res.status(201).json(newConversation);
        }
        else{
            const newConversation = new Conversation({ userId });
            await newConversation.save();
            return res.status(201).json(newConversation);
        }
    } catch (error) {
        console.error('Error creating new conversation:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
    return res.status(201).json({ message: 'New conversation created', conversation: newConversation });
}

async function handleUserMessage(req, res) {
    const conversationId = req.params.id;
    const message = req.body.message;
    console.log("Conversation ID: ", conversationId);
    if (!message || ! conversationId){
        return res.status(400).json({ error: 'Message and conversation ID are required' });
    }
    try{
        // fetch convo from db
        const convo  = await Conversation.findById(conversationId);
        console.log("Convo - ", convo);
        if (!convo) {
            return res.status(404).json({ error: 'Conversation not found' });
        }
        const response = await getChatCompletion(message);

        convo.messages.push({
            userMessage: message,
            systemResponse: response
        })

        await convo.save();
        return res.status(200).json({ message: response });

    } catch (error) {
        console.error('Error handling user message:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function getAllChatDetails(req, res) {
    const token = req.cookies?.accessToken;
    const userId = req.user.userId;
    if (!token || !userId) {
        return res.status(401).json({error: "unauthenticated"});
    }

    // Fetch chat details from the database
    try {
        const chatDetails = await Conversation.find({ userId });
        return res.status(200).json({ chatDetails });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error", message: error.message });
    }

}
export { handleUserMessage, createNewConversation, getAllChatDetails };  