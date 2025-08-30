import Groq from 'groq-sdk';
import 'dotenv/config';


const client = new Groq({
  apiKey: process.env['GROQ_API_KEY'], // This is the default and can be omitted
});

const chatCompletion = await client.chat.completions.create({
  messages: [{role: 'system', content: "Answer in short"},{ role: 'user', content: 'Explain the importance of low latency LLMs' }],
  model: 'llama3-8b-8192',
});

console.log(chatCompletion.choices[0].message.content);