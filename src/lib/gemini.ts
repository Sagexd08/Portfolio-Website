import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI('AIzaSyBUS_G7RP-5QBHxGW3RFFSt3Snbs983okQ');

// Access the Gemini Pro model
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Sohom's information for context
const sohomInfo = `
Sohom Chatterjee is an AI/ML Developer with expertise in machine learning, deep learning, and data science.
He has 1.5+ years of experience in AI/ML development.

Skills:
- Python, PyTorch (preferred over TensorFlow)
- Machine Learning & Deep Learning
- Natural Language Processing
- Computer Vision
- Data Analysis & Visualization
- React, JavaScript, TypeScript
- Cloud Computing (AWS, GCP)

Projects:
1. SoundScape-AI: AI-powered music generation system using deep learning techniques
   GitHub: https://github.com/Sagexd08/SoundScape-Ai
2. Sentinal-AI: Security monitoring system with AI-based threat detection
   GitHub: https://github.com/Sagexd08/Sentinal-AI
3. Stock Price Prediction: LSTM model for predicting stock market trends and prices
   GitHub: https://github.com/Sagexd08/Stock-Price-Prediction-LSTM-model
4. Community Pulse: Social sentiment analysis platform for community insights
   GitHub: https://github.com/Sagexd08/Community-Pulse

Contact:
- Email: sohomchatterjee07@gmail.com
- LinkedIn: www.linkedin.com/in/sohom-chatterjee-61828a312
- GitHub: https://github.com/Sagexd08
`;

// Generate a response using Gemini
export async function generateResponse(prompt: string): Promise<string> {
  try {
    // Create a chat session
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: 'I want to know about Sohom Chatterjee' }],
        },
        {
          role: 'model',
          parts: [{ text: `I'm Friday, Sohom's AI assistant. ${sohomInfo}` }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    // Send the user's message and get a response
    const result = await chat.sendMessage(
      `You are Friday, Sohom Chatterjee's AI assistant. Answer the following question about Sohom based on the information provided. Keep responses concise and friendly. If you don't know something specific, use the general information about Sohom but don't make up details. Question: ${prompt}`
    );

    // Return the response text
    return result.response.text();
  } catch (error) {
    console.error('Error generating response:', error);
    return "I'm having trouble connecting to my knowledge base right now. Please try again later or ask a different question.";
  }
}
