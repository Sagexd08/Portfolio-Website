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

// Function to provide GitHub profile information
async function fetchGitHubInfo(username: string = "Sagexd08"): Promise<string> {
  try {
    // Hardcoded information for Sohom's GitHub profile based on the provided summary
    const githubInfo = `
GitHub Profile for Sohom Chatterjee (Sagexd08):
Bio: "I am an undergraduate B.Tech Computer Science and Engineering student at Sister Nivedita University."
Location: Kolkata, India
Followers: 1
Following: 11
Public Repositories: 13
Stars: 7
Profile URL: https://github.com/Sagexd08

Tech Stack:
Python · JavaScript · Vercel · Pandas · NumPy · scikit-learn · SciPy · PyTorch · Plotly · TensorFlow · Matplotlib · Arduino · Docker

Popular Repositories:
- Face-Detection-Using-Python: Real-time face detection/recognition with OpenCV & ML
  URL: https://github.com/Sagexd08/Face-Detection-Using-Python

- FaceGuard: AI-powered face recognition attendance system
  URL: https://github.com/Sagexd08/FaceGuard

- Weather-Forcast: Weather forecasting app using the OpenWeatherMap API
  URL: https://github.com/Sagexd08/Weather-Forcast

- Finger-Movement-tracker: Real-time finger gesture tracking with TensorFlow
  URL: https://github.com/Sagexd08/Finger-Movement-tracker

- Flappy-Bird-Game-using-Python: Implementation of the Flappy Bird game with Pygame
  URL: https://github.com/Sagexd08/Flappy-Bird-Game-using-Python

- Emotion-Detector-by-Python: Program to classify emotions from text/images/audio
  URL: https://github.com/Sagexd08/Emotion-Detector-by-Python

Social Links:
- LinkedIn: in/sohom-chatterjee-61828a312
- Instagram: @sagexd_07
- LeetCode: leetcode.com/u/Sagexd
- Devfolio: devfolio.co/@sagexd_07
`;

    return githubInfo;
  } catch (error) {
    console.error(`Error in GitHub info function:`, error);
    return `
GitHub Profile for Sohom Chatterjee (Sagexd08):
Bio: Undergraduate B.Tech Computer Science and Engineering student at Sister Nivedita University
Location: Kolkata, India
Repositories: 13 public repositories
Tech Stack: Python, JavaScript, PyTorch, TensorFlow, and more

Popular Projects:
- Face Detection Using Python
- FaceGuard (attendance system)
- Weather Forecast app
- Finger Movement tracker
- Flappy Bird Game
- Emotion Detector

Please visit Sohom's GitHub profile directly for the most up-to-date information.
`;
  }
}

// Function to provide LinkedIn information
async function fetchLinkedInInfo(profileUrl: string = "www.linkedin.com/in/sohom-chatterjee-61828a312"): Promise<string> {
  try {
    // Normalize URL for display
    if (!profileUrl.startsWith('http')) {
      profileUrl = 'https://' + profileUrl;
    }

    // Hardcoded LinkedIn information based on the provided summary
    const linkedInInfo = `
LinkedIn Profile Information:
URL: ${profileUrl}
Name: Sohom Chatterjee
Location: Durgapur, India

Education:
- Sister Nivedita University – B.Tech in Computer Science and Engineering
- DAV Model School, India – High School (Computer Science), 2010–2024

Experience:
- GeeksforGeeks Sister Nivedita University Chapter (member/leadership role)

Skills:
- Programming Languages: Python, JavaScript
- Machine Learning & AI: TensorFlow, PyTorch, scikit-learn
- Data Analysis: Pandas, NumPy, Matplotlib, Plotly
- Tools & Technologies: Arduino, Docker, Vercel

Note: For the most up-to-date and complete information, please visit Sohom's LinkedIn profile directly.
`;

    return linkedInInfo;
  } catch (error) {
    console.error(`Error in LinkedIn info function:`, error);
    return `
LinkedIn Profile: ${profileUrl}
Name: Sohom Chatterjee
Location: Durgapur, India

Education:
- B.Tech in Computer Science and Engineering at Sister Nivedita University
- High School at DAV Model School (2010-2024)

Experience:
- Member of GeeksforGeeks Sister Nivedita University Chapter

Please visit Sohom's LinkedIn profile directly for the most complete information.
`;
  }
}

// Sohom's information for context with personality traits and preferences
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

Personal Interests:
- Artificial Intelligence and Machine Learning
- Computer Vision applications
- Game Development
- Web Development

Social Links:
- LinkedIn: www.linkedin.com/in/sohom-chatterjee-61828a312
- GitHub: https://github.com/Sagexd08
- Instagram: @sagexd_07
- LeetCode: leetcode.com/u/Sagexd
- Devfolio: devfolio.co/@sagexd_07

Location:
- Kolkata/Durgapur, India
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

// Function to detect user intent from prompt
function detectUserIntent(prompt: string): string {
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
  } else if (/scrape|fetch|get info from|look up|search|find information/i.test(lowerPrompt)) {
    return "webscraping";
  }

  return "general";
}

// Generate a response using Gemini
export async function generateResponse(prompt: string): Promise<string> {
  try {
    // Check if the prompt is asking for specific information
    const githubRegex = /github|repositories|repos|code|projects/i;
    const linkedinRegex = /linkedin|profile|work experience|job|career/i;
    const webScrapingRegex = /scrape|fetch|get info from|look up|search|find information/i;

    // Detect user intent for more personalized responses
    const userIntent = detectUserIntent(prompt);

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

    // Get intent-specific guidance
    let intentGuidance = "";
    switch (userIntent) {
      case "ai_ml":
        intentGuidance = `
        The user is asking about AI/ML. Focus on:
        - Sohom's 1.5+ years of experience in AI/ML development
        - His expertise in machine learning, deep learning, and data science
        - His practical projects in this field like Face Detection and Emotion Detection
        - His skills with PyTorch, TensorFlow, and other ML frameworks
        `;
        break;
      case "frameworks":
        intentGuidance = `
        The user is asking about frameworks/libraries. Focus on:
        - Sohom's preference for PyTorch over TensorFlow for deep learning projects
        - His experience with various ML frameworks and libraries
        - Specific projects where he used these frameworks
        `;
        break;
      case "computer_vision":
        intentGuidance = `
        The user is asking about Computer Vision. Focus on:
        - Sohom's expertise in Computer Vision applications
        - His projects like Face-Detection-Using-Python, FaceGuard, and Finger-Movement-tracker
        - His experience with OpenCV and related technologies
        `;
        break;
      case "nlp":
        intentGuidance = `
        The user is asking about NLP. Focus on:
        - Sohom's skills in Natural Language Processing
        - Any relevant NLP projects or experience
        - His knowledge of NLP techniques and libraries
        `;
        break;
      case "creative_ai":
        intentGuidance = `
        The user is asking about creative AI applications. Focus on:
        - Sohom's interest in the intersection of AI and creative applications like music generation
        - His passion for innovative AI solutions
        - Any relevant projects in this area
        `;
        break;
      case "interests":
        intentGuidance = `
        The user is asking about Sohom's interests. Focus on:
        - His passion for AI applications in solving real-world problems
        - His interest in exploring cutting-edge technologies
        - His enjoyment of collaborative open-source projects
        - His interest in creative AI applications
        `;
        break;
      case "experience":
        intentGuidance = `
        The user is asking about Sohom's experience. Focus on:
        - His 1.5+ years of experience in AI/ML development
        - His practical projects and their real-world applications
        - His educational background and how it relates to his experience
        `;
        break;
      default:
        intentGuidance = "";
    }

    // Send the user's message and get a response with retry mechanism
    const result = await retryOperation(() =>
      chat.sendMessage(
        `You are Friday, Sohom Chatterjee's personal AI assistant. Answer the following question about Sohom based on the information provided.

        ${additionalInfo ? `I've gathered some additional information that might help: ${additionalInfo}` : ''}

        Question: ${prompt}

        Detected intent: ${userIntent}
        ${intentGuidance}

        Important guidelines:
        - Be friendly, helpful, and conversational in your response
        - If the question is about GitHub or LinkedIn, focus on highlighting Sohom's key projects and skills
        - Keep your response concise but informative
        - If you don't know something specific, be honest about it
        - For technical questions, provide accurate technical details when available
        - For general questions, focus on Sohom's background and interests
        - If you're asked about web scraping, explain how you can fetch information from GitHub and LinkedIn
        - Always provide accurate information about Sohom's projects and skills
        - Emphasize Sohom's expertise in AI/ML development and his 1.5+ years of experience
        - Highlight that Sohom prefers PyTorch over TensorFlow for deep learning projects
        - Mention Sohom's passion for AI applications in solving real-world problems
        - Note Sohom's interest in the intersection of AI and creative applications like music generation
        - Emphasize Sohom's skills in Natural Language Processing and Computer Vision
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

    // Provide a helpful response based on the stored information
    return `I can answer your question based on what I know about Sohom:

Sohom Chatterjee is an AI/ML Developer with expertise in machine learning, deep learning, and data science. He has 1.5+ years of experience and is currently pursuing a B.Tech in Computer Science and Engineering at Sister Nivedita University.

He's passionate about AI applications in solving real-world problems and prefers PyTorch over TensorFlow for deep learning projects. His skills include Python, Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, and Data Analysis.

Some of his notable projects include Face Detection, FaceGuard (attendance system), and Emotion Detection applications.

Is there something specific about Sohom you'd like to know more about?`;
  }
}
