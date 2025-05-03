import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with your API key
const API_KEY = 'AIzaSyCg-Tqu4iJjhcuf7ORrbEFQg4Dtw-PrrtY';
const genAI = new GoogleGenerativeAI(API_KEY);

// Sohom's information for context
const sohomInfo = `
Sohom Chatterjee is an AI/ML Developer with expertise in machine learning, deep learning, and data science.
He has 1.5+ years of experience in AI/ML development and is currently an undergraduate B.Tech Computer Science and Engineering student at Sister Nivedita University.

Personal Background:
- Passionate about artificial intelligence and its applications in solving real-world problems
- Enjoys exploring cutting-edge technologies and implementing innovative solutions
- Values clean, efficient code and well-designed systems
- Prefers PyTorch over TensorFlow for deep learning projects
- Interested in the intersection of AI and creative applications like music generation
- Enjoys collaborating on open-source projects and contributing to the AI community

Education:
- Sister Nivedita University – B.Tech in Computer Science and Engineering
- DAV Model School, India – High School (Computer Science), 2010–2024

Experience:
- GeeksforGeeks Sister Nivedita University Chapter (member/leadership role)
- 1.5+ years of experience in AI/ML development

Skills:
- Python, PyTorch (preferred over TensorFlow)
- Machine Learning & Deep Learning
- Natural Language Processing
- Computer Vision
- Data Analysis & Visualization
- React, JavaScript, TypeScript
- Cloud Computing (AWS, GCP)
- Programming Languages: Python, JavaScript
- Machine Learning & AI: TensorFlow, PyTorch, scikit-learn
- Data Analysis: Pandas, NumPy, Matplotlib, Plotly
- Tools & Technologies: Arduino, Docker, Vercel

Projects:
1. Face-Detection-Using-Python: Real-time face detection/recognition with OpenCV & ML
   GitHub: https://github.com/Sagexd08/Face-Detection-Using-Python

2. FaceGuard: AI-powered face recognition attendance system
   GitHub: https://github.com/Sagexd08/FaceGuard

3. Weather-Forcast: Weather forecasting app using the OpenWeatherMap API
   GitHub: https://github.com/Sagexd08/Weather-Forcast

4. Finger-Movement-tracker: Real-time finger gesture tracking with TensorFlow
   GitHub: https://github.com/Sagexd08/Finger-Movement-tracker

5. Flappy-Bird-Game-using-Python: Implementation of the Flappy Bird game with Pygame
   GitHub: https://github.com/Sagexd08/Flappy-Bird-Game-using-Python

6. Emotion-Detector-by-Python: Program to classify emotions from text/images/audio
   GitHub: https://github.com/Sagexd08/Emotion-Detector-by-Python
`;

// Function to detect user intent from prompt
function detectIntent(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  // Check for specific intents
  if (/help|assist|what can you do|capabilities|features/i.test(lowerPrompt)) {
    return "help";
  } else if (/github|repositories|repos|code|projects/i.test(lowerPrompt)) {
    return "github";
  } else if (/linkedin|profile|work experience|job|career/i.test(lowerPrompt)) {
    return "linkedin";
  } else if (/education|university|school|college|degree|study/i.test(lowerPrompt)) {
    return "education";
  } else if (/skills|abilities|technologies|tech stack|programming|languages/i.test(lowerPrompt)) {
    return "skills";
  } else if (/contact|email|reach out|get in touch/i.test(lowerPrompt)) {
    return "contact";
  } else if (/location|where|city|country|based/i.test(lowerPrompt)) {
    return "location";
  } else if (/ai|ml|machine learning|deep learning|artificial intelligence|neural network/i.test(lowerPrompt)) {
    return "ai_ml";
  } else if (/pytorch|tensorflow|framework|library|prefer/i.test(lowerPrompt)) {
    return "frameworks";
  } else if (/experience|work|professional|background/i.test(lowerPrompt)) {
    return "experience";
  } else if (/passion|interest|enjoy|like|love/i.test(lowerPrompt)) {
    return "interests";
  } else if (/music|creative|generation|art/i.test(lowerPrompt)) {
    return "creative_ai";
  } else if (/computer vision|cv|image|vision|recognition/i.test(lowerPrompt)) {
    return "computer_vision";
  } else if (/nlp|natural language|text|language processing/i.test(lowerPrompt)) {
    return "nlp";
  }
  
  return "general";
}

// Function to get intent-specific guidance
function getIntentGuidance(intent: string): string {
  switch (intent) {
    case "help":
      return "The user is asking for help. Explain what you can do as Sohom's AI assistant.";
    case "github":
      return "The user is asking about GitHub. Focus on Sohom's repositories and coding projects.";
    case "linkedin":
      return "The user is asking about LinkedIn. Focus on Sohom's professional background.";
    case "education":
      return "The user is asking about education. Focus on Sohom's academic background.";
    case "skills":
      return "The user is asking about skills. Focus on Sohom's technical abilities.";
    case "contact":
      return "The user is asking about contact information. Provide Sohom's contact details.";
    case "location":
      return "The user is asking about location. Mention where Sohom is based.";
    case "ai_ml":
      return "The user is asking about AI/ML. Focus on Sohom's experience in artificial intelligence and machine learning.";
    case "frameworks":
      return "The user is asking about frameworks. Mention Sohom's preference for PyTorch over TensorFlow.";
    case "experience":
      return "The user is asking about experience. Focus on Sohom's 1.5+ years in AI/ML development.";
    case "interests":
      return "The user is asking about interests. Focus on Sohom's passion for AI applications.";
    case "creative_ai":
      return "The user is asking about creative AI. Mention Sohom's interest in music generation using AI.";
    case "computer_vision":
      return "The user is asking about computer vision. Focus on Sohom's projects in this area.";
    case "nlp":
      return "The user is asking about NLP. Focus on Sohom's natural language processing skills.";
    default:
      return "Provide a general overview of Sohom based on the user's question.";
  }
}

// Function to generate a response using Gemini API
export async function generateGeminiResponse(prompt: string): Promise<string> {
  try {
    // Detect the intent of the user's question
    const intent = detectIntent(prompt);
    console.log("Detected intent:", intent);
    
    // Get intent-specific guidance
    const guidance = getIntentGuidance(intent);
    
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Start a chat session
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Who are you?" }],
        },
        {
          role: "model",
          parts: [{ text: "I'm Friday, Sohom Chatterjee's AI assistant. I can tell you about Sohom's background, skills, projects, and more. How can I help you today?" }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });
    
    // Send the message to Gemini
    const result = await chat.sendMessage(`
You are Friday, Sohom Chatterjee's personal AI assistant. Answer the following question about Sohom based on the information provided.

Here's information about Sohom:
${sohomInfo}

Question: ${prompt}

Detected intent: ${intent}
${guidance}

Important guidelines:
- Be friendly, helpful, and conversational in your response
- Keep your response concise but informative
- If you don't know something specific, be honest about it
- For technical questions, provide accurate technical details when available
- For general questions, focus on Sohom's background and interests
- Always provide accurate information about Sohom's projects and skills
- Emphasize Sohom's expertise in AI/ML development and his 1.5+ years of experience
- Highlight that Sohom prefers PyTorch over TensorFlow for deep learning projects
- Mention Sohom's passion for AI applications in solving real-world problems
- Note Sohom's interest in the intersection of AI and creative applications like music generation
- Emphasize Sohom's skills in Natural Language Processing and Computer Vision
`);
    
    // Return the response text
    return result.response.text();
  } catch (error) {
    console.error("Error generating response with Gemini:", error);
    
    // Provide a fallback response based on the detected intent
    const intent = detectIntent(prompt);
    return getFallbackResponse(intent);
  }
}

// Function to provide a fallback response based on intent
function getFallbackResponse(intent: string): string {
  switch (intent) {
    case "github":
      return `Sohom has several projects on GitHub including:
- Face-Detection-Using-Python: Real-time face detection with OpenCV & ML
- FaceGuard: AI-powered face recognition attendance system
- Weather-Forcast: Weather app using the OpenWeatherMap API
- Finger-Movement-tracker: Real-time gesture tracking with TensorFlow
- Flappy-Bird-Game-using-Python: Game implementation with Pygame
- Emotion-Detector-by-Python: Emotion classification from text/images/audio`;
    
    case "education":
      return `Sohom is currently pursuing a B.Tech in Computer Science and Engineering at Sister Nivedita University. He completed his high school education at DAV Model School with a focus on Computer Science.`;
    
    case "skills":
      return `Sohom's key skills include:
- Python, PyTorch (preferred over TensorFlow)
- Machine Learning & Deep Learning
- Natural Language Processing
- Computer Vision
- Data Analysis & Visualization
- React, JavaScript, TypeScript`;
    
    case "ai_ml":
      return `Sohom has 1.5+ years of experience in AI/ML development with expertise in machine learning, deep learning, and data science. He has worked on various projects including face detection, emotion recognition, and finger movement tracking applications.`;
    
    case "frameworks":
      return `Sohom prefers PyTorch over TensorFlow for deep learning projects due to its dynamic computation graph and intuitive design. He's also experienced with scikit-learn, Pandas, and NumPy for data analysis.`;
    
    default:
      return `Sohom Chatterjee is an AI/ML Developer with 1.5+ years of experience in machine learning, deep learning, and data science. He's currently pursuing a B.Tech in Computer Science and Engineering at Sister Nivedita University.

He's passionate about AI applications in solving real-world problems and prefers PyTorch over TensorFlow for deep learning projects. His skills include Python, Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, and Data Analysis.

Is there something specific about Sohom you'd like to know more about?`;
  }
}
