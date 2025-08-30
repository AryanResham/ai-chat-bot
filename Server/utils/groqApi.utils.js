import Groq from 'groq-sdk';


// const chatCompletion = await client.chat.completions.create({
//   messages: [{role: 'system', content: "Answer in short"},{ role: 'user', content: 'Explain the importance of low latency LLMs' }],
//   model: 'llama3-8b-8192',
// });

async function getChatCompletion(message) {
    const client = new Groq({
    apiKey: process.env['GROQ_API_KEY'], 
    });

    const response = await client.chat.completions.create(
        {
        messages: [
            {
                role: 'system', content: "Answer in short"
            },
            {
                role: 'user', content: message
            }
        ],
        model: 'llama3-8b-8192',
    });
    return response.choices[0].message.content;
}



export { getChatCompletion };