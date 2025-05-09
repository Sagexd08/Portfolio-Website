// Gemini API client for enhanced chatbot capabilities

// Gemini API key
const GEMINI_API_KEY = 'AIzaSyCg-Tqu4iJjhcuf7ORrbEFQg4Dtw-PrrtY';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Knowledge base for Sohom's information
const sohomKnowledgeBase = `
# About Sohom Chatterjee
Sohom Chatterjee is an AI/ML Developer with 1.5+ years of experience in machine learning, deep learning, and data science.
He is currently an undergraduate B.Tech Computer Science and Engineering student at Sister Nivedita University.
He is passionate about artificial intelligence and its applications in solving real-world problems.
He enjoys exploring cutting-edge technologies and implementing innovative solutions.
He values clean, efficient code and well-designed systems.
He prefers PyTorch over TensorFlow for deep learning projects.
He is interested in the intersection of AI and creative applications like music generation.
He enjoys collaborating on open-source projects and contributing to the AI community.

# Education
- Sister Nivedita University – B.Tech in Computer Science and Engineering
- DAV Model School, India – High School (Computer Science), 2010–2024

# Experience
- GeeksforGeeks Sister Nivedita University Chapter (member/leadership role)
- 1.5+ years of experience in AI/ML development

# Skills
- Python (3 years experience, 10 projects)
- JavaScript (1 year experience, 2 projects)
- TypeScript (1 year experience, 1 project)
- HTML (1 year experience, 2 projects)
- CSS (1 year experience, 2 projects)
- React (1 year experience, 1 project)
- Supabase (1 year experience, 2 projects)
- AWS (1 year experience, 1 project)
- Google Cloud (1 year experience, 1 project)
- Machine Learning & Deep Learning
- Natural Language Processing
- Computer Vision
- Data Analysis & Visualization
- Cloud Computing (AWS, GCP)
- Programming Languages: Python, JavaScript
- Machine Learning & AI: TensorFlow, PyTorch, scikit-learn
- Data Analysis: Pandas, NumPy, Matplotlib, Plotly
- Tools & Technologies: Arduino, Docker, Vercel

# Projects
1. SoundScape-AI: AI-powered music generation and audio processing platform
2. Sentinal-AI: Advanced security system using computer vision and facial recognition
3. Stock-Price-Prediction-LSTM-model: Financial forecasting using deep learning
4. Community-Pulse: Social sentiment analysis platform for community insights
5. Face-Detection-Using-Python: Real-time face detection/recognition with OpenCV & ML
6. FaceGuard: AI-powered face recognition attendance system
7. Weather-Forcast: Weather forecasting app using the OpenWeatherMap API
8. Finger-Movement-tracker: Real-time finger gesture tracking with TensorFlow
9. Flappy-Bird-Game-using-Python: Implementation of the Flappy Bird game with Pygame
10. Emotion-Detector-by-Python: Program to classify emotions from text/images/audio

# Personal Interests
- Artificial Intelligence and Machine Learning
- Computer Vision applications
- Game Development
- Web Development
- Music generation using AI
- Creative AI applications

# Contact Information
- Email: sohomchatterjee07@gmail.com
- LinkedIn: www.linkedin.com/in/sohom-chatterjee-61828a312
- GitHub: https://github.com/Sagexd08
- Instagram: @sagexd_07
- LeetCode: leetcode.com/u/Sagexd
- Devfolio: devfolio.co/@sagexd_07

# Location
- Kolkata/Durgapur, India

# Framework Preferences
- Prefers PyTorch over TensorFlow for deep learning projects
- Experience with various ML frameworks and libraries
- Skilled in using scikit-learn, Pandas, NumPy for data analysis
- Familiar with web frameworks like React
`;

// Types for Gemini API
interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
  promptFeedback?: {
    blockReason?: string;
  };
}

interface GeminiError {
  error: {
    message: string;
    status: string;
  };
}

// Function to analyze sentiment using Gemini
export async function analyzeSentiment(text: string): Promise<string> {
  try {
    const prompt = `
    Analyze the sentiment of the following text and classify it as positive, negative, or neutral.
    Also identify the main topics or entities mentioned.
    
    Text: "${text}"
    
    Provide your analysis in this format:
    Sentiment: [positive/negative/neutral]
    Topics: [comma-separated list of main topics]
    Intent: [what the user is trying to accomplish]
    `;
    
    const response = await callGeminiAPI(prompt);
    return response;
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    return 'neutral';
  }
}

// Function to generate enhanced responses with Gemini
export async function generateEnhancedResponse(userInput: string, chatHistory: string = ''): Promise<string> {
  try {
    // Create a prompt that includes the knowledge base and user input
    const prompt = `
    You are Friday, an AI assistant for Sohom Chatterjee's portfolio website. Your purpose is to provide information about Sohom to visitors.
    
    Here is information about Sohom that you should use to answer questions:
    ${sohomKnowledgeBase}
    
    Previous conversation:
    ${chatHistory}
    
    User question: ${userInput}
    
    Provide a helpful, friendly, and concise response based on the information about Sohom. If you don't know the answer, say so politely and suggest what information you can provide instead. Keep your response under 150 words and focus on being accurate and helpful.
    `;
    
    const response = await callGeminiAPI(prompt);
    return response;
  } catch (error) {
    console.error('Error generating enhanced response:', error);
    
    // Fallback to the basic response if Gemini API fails
    return `I'm having trouble connecting to my knowledge base at the moment. Here's what I know about Sohom:

Sohom Chatterjee is an AI/ML Developer with 1.5+ years of experience who specializes in Python, machine learning, and data science. He's currently pursuing his B.Tech in Computer Science and Engineering.

Is there something specific about Sohom's skills, projects, or background you'd like to know?`;
  }
}

// Function to call Gemini API
async function callGeminiAPI(prompt: string): Promise<string> {
  try {
    const url = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json() as GeminiError;
      throw new Error(`Gemini API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json() as GeminiResponse;
    
    // Check if the response was blocked for safety reasons
    if (data.promptFeedback?.blockReason) {
      throw new Error(`Prompt blocked: ${data.promptFeedback.blockReason}`);
    }
    
    // Extract the generated text from the response
    if (data.candidates && data.candidates.length > 0) {
      const generatedText = data.candidates[0].content.parts[0].text;
      return generatedText.trim();
    } else {
      throw new Error('No response generated');
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}
