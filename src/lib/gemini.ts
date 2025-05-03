import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI('AIzaSyBUS_G7RP-5QBHxGW3RFFSt3Snbs983okQ');

// Access the Gemini Pro model with enhanced configuration
const model = genAI.getGenerativeModel({
  model: 'gemini-pro',
  generationConfig: {
    temperature: 0.8,  // Slightly higher temperature for more creative responses
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 1024,
  },
  safetySettings: [
    {
      category: 'HARM_CATEGORY_HARASSMENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
      category: 'HARM_CATEGORY_HATE_SPEECH',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
      category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
      category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE'
    }
  ]
});

// Function to fetch data from a URL
async function fetchWebContent(url: string): Promise<string> {
  try {
    // Use a proxy or direct fetch depending on CORS restrictions
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const text = await response.text();
    return text;
  } catch (error) {
    console.error(`Error fetching content from ${url}:`, error);
    return `Failed to fetch content from ${url}. This could be due to CORS restrictions or the website blocking automated access.`;
  }
}

// Function to extract relevant information from GitHub profile
async function fetchGitHubInfo(username: string = "Sagexd08"): Promise<string> {
  try {
    // Hardcoded information for Sohom's GitHub profile to ensure reliability
    const githubInfo = `
GitHub Profile for Sohom Chatterjee (Sagexd08):
Bio: AI/ML Developer passionate about creating intelligent solutions
Followers: 15+
Public Repositories: 10+
Profile URL: https://github.com/Sagexd08

Key Repositories:
- SoundScape-AI: AI-powered music generation system using deep learning techniques
  Technologies: Python, PyTorch, TensorFlow, Web Audio API
  URL: https://github.com/Sagexd08/SoundScape-Ai

- Sentinal-AI: Security monitoring system with AI-based threat detection
  Technologies: Python, OpenCV, TensorFlow, Flask
  URL: https://github.com/Sagexd08/Sentinal-AI

- Stock-Price-Prediction-LSTM-model: LSTM model for predicting stock market trends
  Technologies: Python, Keras, Pandas, Matplotlib
  URL: https://github.com/Sagexd08/Stock-Price-Prediction-LSTM-model

- Community-Pulse: Social sentiment analysis platform for community insights
  Technologies: Python, NLTK, SpaCy, React, D3.js
  URL: https://github.com/Sagexd08/Community-Pulse

Recent Activity:
- Contributions to machine learning projects
- Updates to data visualization components
- Optimization of neural network architectures
`;

    // Try to fetch real-time data from GitHub API as a fallback
    try {
      // Fetch GitHub profile
      const profileUrl = `https://api.github.com/users/${username}`;
      const profileResponse = await fetch(profileUrl);

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();

        // Fetch repositories
        const reposUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`;
        const reposResponse = await fetch(reposUrl);

        if (reposResponse.ok) {
          const reposData = await reposResponse.json();

          // Add real-time data
          let realTimeInfo = `
Real-time GitHub data for ${profileData.name || username}:
Followers: ${profileData.followers}
Following: ${profileData.following}
Public Repositories: ${profileData.public_repos}
Location: ${profileData.location || 'Not specified'}

Recently Updated Repositories:
`;

          for (const repo of reposData) {
            realTimeInfo += `- ${repo.name}: ${repo.description || 'No description'} (${repo.language || 'No language specified'})
  Last updated: ${new Date(repo.updated_at).toLocaleDateString()}
  URL: ${repo.html_url}
`;
          }

          return githubInfo + "\n" + realTimeInfo;
        }
      }
    } catch (error) {
      console.error("Error fetching real-time GitHub data:", error);
    }

    return githubInfo;
  } catch (error) {
    console.error(`Error in GitHub info function:`, error);
    return `
GitHub Profile for Sohom Chatterjee:
URL: https://github.com/Sagexd08

Key Repositories:
- SoundScape-AI: AI-powered music generation system
- Sentinal-AI: Security monitoring system with AI-based threat detection
- Stock-Price-Prediction-LSTM-model: LSTM model for stock market predictions
- Community-Pulse: Social sentiment analysis platform

Please visit Sohom's GitHub profile directly for the most up-to-date information.
`;
  }
}

// Function to provide LinkedIn information
async function fetchLinkedInInfo(profileUrl: string = "www.linkedin.com/in/sohom-chatterjee-61828a312"): Promise<string> {
  // LinkedIn blocks scraping, so we'll provide static information
  try {
    // Normalize URL for display
    if (!profileUrl.startsWith('http')) {
      profileUrl = 'https://' + profileUrl;
    }

    // Provide curated LinkedIn information
    const linkedInInfo = `
LinkedIn Profile Information:
URL: ${profileUrl}
Name: Sohom Chatterjee

Professional Summary:
Sohom Chatterjee is an AI/ML Developer with 1.5+ years of experience specializing in machine learning,
deep learning, and data science applications. He has expertise in developing and deploying AI models
for various domains including computer vision, natural language processing, and predictive analytics.

Skills:
- Python Programming
- PyTorch (preferred over TensorFlow)
- Machine Learning & Deep Learning
- Natural Language Processing
- Computer Vision
- Data Analysis & Visualization
- Neural Network Architecture Design
- MLOps & Model Deployment

Experience:
- AI/ML Developer with focus on innovative solutions
- Developed multiple machine learning models for real-world applications
- Implemented computer vision systems for security applications
- Created NLP solutions for text analysis and sentiment detection

Note: For the most up-to-date and complete information, please visit Sohom's LinkedIn profile directly.
`;

    return linkedInInfo;
  } catch (error) {
    console.error(`Error in LinkedIn info function:`, error);
    return `
LinkedIn Profile: ${profileUrl}

Sohom Chatterjee is an AI/ML Developer with 1.5+ years of experience specializing in:
- Machine Learning & Deep Learning
- Python, PyTorch, and TensorFlow
- Computer Vision and NLP applications
- Data Analysis & Visualization

Please visit Sohom's LinkedIn profile directly for the most complete information.
`;
  }
}

// Sohom's information for context with personality traits and preferences
const sohomInfo = `
Sohom Chatterjee is an AI/ML Developer with expertise in machine learning, deep learning, and data science.
He has 1.5+ years of experience in AI/ML development.

Personal Background:
- Passionate about artificial intelligence and its applications in solving real-world problems
- Enjoys exploring cutting-edge technologies and implementing innovative solutions
- Values clean, efficient code and well-designed systems
- Prefers PyTorch over TensorFlow for deep learning projects
- Interested in the intersection of AI and creative applications like music generation
- Enjoys collaborating on open-source projects and contributing to the AI community

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
   Description: A system that leverages neural networks to create original music compositions based on various styles and inputs.

2. Sentinal-AI: Security monitoring system with AI-based threat detection
   GitHub: https://github.com/Sagexd08/Sentinal-AI
   Description: An intelligent security system that uses computer vision and anomaly detection to identify potential security threats in real-time.

3. Stock Price Prediction: LSTM model for predicting stock market trends and prices
   GitHub: https://github.com/Sagexd08/Stock-Price-Prediction-LSTM-model
   Description: A deep learning model using Long Short-Term Memory networks to analyze historical stock data and predict future price movements.

4. Community Pulse: Social sentiment analysis platform for community insights
   GitHub: https://github.com/Sagexd08/Community-Pulse
   Description: A platform that analyzes social media and other data sources to understand public sentiment and provide actionable insights.

Education:
- Self-taught in many aspects of AI and machine learning
- Continuously learning through online courses, research papers, and practical implementation

Interests:
- Exploring new AI research and applications
- Music and audio processing with AI
- Ethical AI development
- Open-source contribution

Contact:
- Email: sohomchatterjee07@gmail.com
- LinkedIn: www.linkedin.com/in/sohom-chatterjee-61828a312
- GitHub: https://github.com/Sagexd08

Communication Style Preferences:
- Clear, concise explanations
- Technical depth when appropriate
- Friendly and approachable tone
- Practical examples and applications
`;

// Helper function to retry API calls
async function retryOperation(operation: () => Promise<any>, maxRetries: number = 3, delay: number = 1000): Promise<any> {
  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      console.log(`Attempt ${attempt + 1} failed:`, error);
      lastError = error;

      // Wait before retrying
      if (attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (attempt + 1)));
      }
    }
  }

  throw lastError;
}

// Generate a response using Gemini
export async function generateResponse(prompt: string): Promise<string> {
  try {
    // Check if the prompt is asking for specific information
    const githubRegex = /github|repositories|repos|code|projects/i;
    const linkedinRegex = /linkedin|profile|work experience|job|career/i;
    const webScrapingRegex = /scrape|fetch|get info from|look up|search|find information/i;

    let additionalInfo = "";
    let fetchedExternalData = false;

    // Fetch GitHub information if requested
    if (githubRegex.test(prompt)) {
      try {
        console.log("Fetching GitHub information...");
        const githubInfo = await retryOperation(() => fetchGitHubInfo("Sagexd08"));
        additionalInfo += "\n\nHere's the latest information from GitHub:\n" + githubInfo;
        fetchedExternalData = true;
      } catch (error) {
        console.error("Error fetching GitHub info:", error);
        additionalInfo += "\n\nI tried to fetch the latest information from GitHub, but encountered an issue. I'll provide information based on what I already know about Sohom's GitHub profile.";
      }
    }

    // Fetch LinkedIn information if requested
    if (linkedinRegex.test(prompt)) {
      try {
        console.log("Fetching LinkedIn information...");
        const linkedinInfo = await retryOperation(() => fetchLinkedInInfo("www.linkedin.com/in/sohom-chatterjee-61828a312"));
        additionalInfo += "\n\n" + linkedinInfo;
        fetchedExternalData = true;
      } catch (error) {
        console.error("Error fetching LinkedIn info:", error);
        additionalInfo += "\n\nI tried to fetch the latest information from LinkedIn, but encountered an issue. I'll provide information based on what I already know about Sohom's LinkedIn profile.";
      }
    }

    // Handle web scraping requests for other URLs
    if (webScrapingRegex.test(prompt)) {
      // Extract URL from the prompt if present
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const urls = prompt.match(urlRegex);

      if (urls && urls.length > 0) {
        try {
          const url = urls[0];
          console.log(`Attempting to scrape content from: ${url}`);

          // Use retry mechanism for web scraping
          const content = await retryOperation(() => fetchWebContent(url));

          // Truncate content to avoid token limits
          const truncatedContent = content.substring(0, 2000) + (content.length > 2000 ? "... (content truncated)" : "");
          additionalInfo += `\n\nI've fetched information from ${url}. Here's a summary of what I found:\n${truncatedContent}`;
          fetchedExternalData = true;
        } catch (error) {
          console.error("Error in web scraping:", error);
          additionalInfo += `\n\nI tried to fetch information from the URL you provided, but encountered an error after multiple attempts. This might be due to CORS restrictions or the website blocking automated access. I can still answer questions based on my existing knowledge.`;
        }
      } else if (!fetchedExternalData) {
        additionalInfo += "\n\nI can fetch information from websites if you provide a specific URL. For example, you can ask me to 'fetch information from https://example.com' or 'scrape content from https://example.com'.";
      }
    }

    // If the prompt specifically mentions Sohom's profiles
    if ((prompt.toLowerCase().includes("sohom") &&
         (prompt.toLowerCase().includes("github") || prompt.toLowerCase().includes("linkedin"))) &&
        !fetchedExternalData) {
      try {
        console.log("Fetching profile information...");
        const githubInfo = await fetchGitHubInfo("Sagexd08");
        const linkedinInfo = await fetchLinkedInInfo("www.linkedin.com/in/sohom-chatterjee-61828a312");
        additionalInfo += "\n\nHere's information about Sohom's profiles:\n" + githubInfo + "\n\n" + linkedinInfo;
      } catch (error) {
        console.error("Error fetching profile info:", error);
      }
    }

    // Create a chat session with retry mechanism
    const chat = await retryOperation(() =>
      model.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: 'Tell me about Sohom Chatterjee' }],
          },
          {
            role: 'model',
            parts: [{ text: `I'm Friday, Sohom's AI assistant. ${sohomInfo}` }],
          },
        ],
      })
    );

    // Send the user's message and get a response with retry mechanism
    const result = await retryOperation(() =>
      chat.sendMessage(
        `You are Friday, Sohom Chatterjee's personal AI assistant. Answer the following question about Sohom based on the information provided.

        ${additionalInfo ? `I've gathered some additional information that might help: ${additionalInfo}` : ''}

        Question: ${prompt}

        Important guidelines:
        - Be friendly, helpful, and conversational in your response
        - If the question is about GitHub or LinkedIn, focus on highlighting Sohom's key projects and skills
        - Keep your response concise but informative
        - If you don't know something specific, be honest about it
        - For technical questions, provide accurate technical details when available
        - For general questions, focus on Sohom's background and interests
        - If you're asked about web scraping, explain how you can fetch information from GitHub and LinkedIn
        - Always provide accurate information about Sohom's projects and skills
        `
      )
    );

    // Return the response text
    return result.response.text();
  } catch (error) {
    console.error('Error generating response:', error);
    // Return a more helpful error message
    if (error instanceof Error) {
      console.log("Specific error:", error.message);

      if (error.message.includes("CORS") || error.message.includes("network")) {
        return "I'm having trouble connecting to external resources due to network restrictions. I can still answer questions about Sohom based on my existing knowledge.";
      } else if (error.message.includes("quota") || error.message.includes("limit")) {
        return "I've reached my usage limit for external API calls. I can still answer general questions about Sohom.";
      } else if (error.message.includes("permission") || error.message.includes("access")) {
        return "I don't have permission to access some resources. Let me tell you what I know about Sohom without those external sources.";
      }
    }

    return "I'm having trouble processing your request right now. Let me tell you what I know about Sohom without connecting to external sources.";
  }
}
