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
    const response = await fetch(url);
    const text = await response.text();
    return text;
  } catch (error) {
    console.error(`Error fetching content from ${url}:`, error);
    return `Failed to fetch content from ${url}`;
  }
}

// Function to extract relevant information from GitHub profile
async function fetchGitHubInfo(username: string = "Sagexd08"): Promise<string> {
  try {
    // Fetch GitHub profile
    const profileUrl = `https://api.github.com/users/${username}`;
    const profileResponse = await fetch(profileUrl);
    const profileData = await profileResponse.json();

    // Fetch repositories
    const reposUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`;
    const reposResponse = await fetch(reposUrl);
    const reposData = await reposResponse.json();

    // Fetch contribution data by scraping the GitHub profile page
    let contributionInfo = "";
    try {
      const githubProfilePage = await fetch(`https://github.com/${username}`);
      const profileHtml = await githubProfilePage.text();

      // Extract contribution information (simplified approach)
      if (profileHtml.includes("contributions in the last year")) {
        const contributionMatch = profileHtml.match(/(\d+) contributions in the last year/);
        if (contributionMatch && contributionMatch[1]) {
          contributionInfo = `Contributions in the last year: ${contributionMatch[1]}`;
        }
      }
    } catch (error) {
      console.error("Error fetching contribution data:", error);
    }

    // Format the data
    let githubInfo = `
GitHub Profile for ${profileData.name || username}:
Bio: ${profileData.bio || 'No bio available'}
Followers: ${profileData.followers}
Following: ${profileData.following}
Public Repositories: ${profileData.public_repos}
${contributionInfo ? contributionInfo : ''}
Location: ${profileData.location || 'Not specified'}
Profile URL: https://github.com/${username}

Recent Repositories:
`;

    // Add repository details
    for (const repo of reposData) {
      githubInfo += `- ${repo.name}: ${repo.description || 'No description'} (${repo.language || 'No language specified'})
  Stars: ${repo.stargazers_count}, Forks: ${repo.forks_count}
  Last updated: ${new Date(repo.updated_at).toLocaleDateString()}
  URL: ${repo.html_url}
`;

      // Try to fetch README content for more context
      try {
        const readmeUrl = `https://api.github.com/repos/${username}/${repo.name}/readme`;
        const readmeResponse = await fetch(readmeUrl);
        if (readmeResponse.ok) {
          const readmeData = await readmeResponse.json();
          const readmeContent = atob(readmeData.content); // Decode base64 content

          // Extract first paragraph or summary from README (simplified)
          const firstParagraph = readmeContent.split('\n\n')[0].substring(0, 200);
          if (firstParagraph && firstParagraph.length > 20) {
            githubInfo += `  README Summary: ${firstParagraph}...\n`;
          }
        }
      } catch (error) {
        // Silently fail for README fetching
      }
    }

    return githubInfo;
  } catch (error) {
    console.error(`Error fetching GitHub info for ${username}:`, error);
    return `Failed to fetch GitHub info for ${username}`;
  }
}

// Function to extract information from LinkedIn profile
async function fetchLinkedInInfo(profileUrl: string = "www.linkedin.com/in/sohom-chatterjee-61828a312"): Promise<string> {
  // Note: LinkedIn blocks most scraping attempts, so this is a simplified approach
  try {
    // Normalize URL
    if (!profileUrl.startsWith('http')) {
      profileUrl = 'https://' + profileUrl;
    }

    // Try to fetch the LinkedIn profile page
    const response = await fetch(profileUrl);
    const html = await response.text();

    // Extract basic information (this is simplified and may not work reliably)
    let linkedInInfo = `
LinkedIn Profile Information:
URL: ${profileUrl}
`;

    // Extract name if possible
    const nameMatch = html.match(/<title>(.*?)(?: \| LinkedIn)?<\/title>/);
    if (nameMatch && nameMatch[1]) {
      linkedInInfo += `Name: ${nameMatch[1].trim()}\n`;
    }

    // Note about LinkedIn scraping limitations
    linkedInInfo += `
Note: LinkedIn restricts automated data collection. For the most accurate and up-to-date information,
please visit Sohom's LinkedIn profile directly at: ${profileUrl}

Key information from Sohom's LinkedIn profile:
- AI/ML Developer with 1.5+ years of experience
- Expertise in Python, PyTorch, TensorFlow, and other ML frameworks
- Projects focused on machine learning, deep learning, and data science applications
- Continuously learning and expanding skills in AI/ML technologies
`;

    return linkedInInfo;
  } catch (error) {
    console.error(`Error fetching LinkedIn info:`, error);
    return `
LinkedIn Profile: ${profileUrl}

Note: LinkedIn restricts automated data collection. For the most accurate information,
please visit Sohom's LinkedIn profile directly using the link above.

Key information from Sohom's LinkedIn profile:
- AI/ML Developer with 1.5+ years of experience
- Expertise in Python, PyTorch, TensorFlow, and other ML frameworks
- Projects focused on machine learning, deep learning, and data science applications
- Continuously learning and expanding skills in AI/ML technologies
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

// Generate a response using Gemini
export async function generateResponse(prompt: string): Promise<string> {
  try {
    // Check if the prompt is asking for GitHub information
    const githubRegex = /github|repositories|repos|code|projects/i;
    const linkedinRegex = /linkedin|profile|work experience|job|career/i;
    const webScrapingRegex = /scrape|fetch|get info from|look up|search|find information/i;

    let additionalInfo = "";

    // Fetch GitHub information if requested
    if (githubRegex.test(prompt)) {
      console.log("Fetching GitHub information...");
      const githubInfo = await fetchGitHubInfo("Sagexd08");
      additionalInfo += "\n\nHere's the latest information from GitHub:\n" + githubInfo;
    }

    // Fetch LinkedIn information if requested
    if (linkedinRegex.test(prompt)) {
      console.log("Fetching LinkedIn information...");
      const linkedinInfo = await fetchLinkedInInfo("www.linkedin.com/in/sohom-chatterjee-61828a312");
      additionalInfo += "\n\n" + linkedinInfo;
    }

    // Handle web scraping requests for other URLs
    if (webScrapingRegex.test(prompt)) {
      // Extract URL from the prompt if present
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const urls = prompt.match(urlRegex);

      if (urls && urls.length > 0) {
        // Filter out GitHub and LinkedIn URLs as they're handled separately
        const otherUrls = urls.filter(url =>
          !url.includes("github.com/Sagexd08") &&
          !url.includes("linkedin.com/in/sohom-chatterjee")
        );

        if (otherUrls.length > 0) {
          const url = otherUrls[0];
          console.log(`Attempting to scrape content from: ${url}`);
          try {
            const content = await fetchWebContent(url);
            // Truncate content to avoid token limits
            const truncatedContent = content.substring(0, 5000) + (content.length > 5000 ? "... (content truncated)" : "");
            additionalInfo += `\n\nI've fetched information from ${url}. Here's what I found:\n${truncatedContent}`;
          } catch (error) {
            additionalInfo += `\n\nI tried to fetch information from ${url}, but encountered an error.`;
          }
        }
      } else if (!githubRegex.test(prompt) && !linkedinRegex.test(prompt)) {
        // Only show this message if not already fetching GitHub or LinkedIn info
        additionalInfo += "\n\nI can fetch information from websites if you provide a specific URL.";
      }
    }

    // If the prompt specifically mentions Sohom's GitHub or LinkedIn without other context,
    // fetch both for a comprehensive response
    if ((prompt.toLowerCase().includes("sohom's github") || prompt.toLowerCase().includes("sohom's linkedin")) &&
        additionalInfo.length === 0) {
      console.log("Fetching both GitHub and LinkedIn information...");
      const githubInfo = await fetchGitHubInfo("Sagexd08");
      const linkedinInfo = await fetchLinkedInInfo("www.linkedin.com/in/sohom-chatterjee-61828a312");
      additionalInfo += "\n\nHere's the latest information from GitHub:\n" + githubInfo;
      additionalInfo += "\n\n" + linkedinInfo;
    }

    // Simple sentiment analysis function for personalization
    function analyzeSentiment(text: string) {
      const lowerText = text.toLowerCase();

      // Detect sentiment
      let sentiment = "neutral";
      const positiveWords = ["great", "awesome", "excellent", "good", "love", "amazing", "thanks", "thank", "helpful", "appreciate"];
      const negativeWords = ["bad", "terrible", "awful", "hate", "dislike", "problem", "issue", "wrong", "not working", "error"];

      const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
      const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;

      if (positiveCount > negativeCount) sentiment = "positive";
      else if (negativeCount > positiveCount) sentiment = "negative";

      // Detect formality
      let formality = "neutral";
      if (/hello|hi|hey|sup|yo/i.test(lowerText)) formality = "casual";
      if (/dear|kindly|please|would you|could you please/i.test(lowerText)) formality = "formal";

      return { sentiment, formality };
    }

    // Simple topic analysis function for personalization
    function analyzeTopicInterest(text: string) {
      const lowerText = text.toLowerCase();

      // Detect main topic
      let topic = "general";
      if (/machine learning|ml|ai|artificial intelligence|deep learning|neural/i.test(lowerText)) topic = "AI/ML";
      else if (/project|portfolio|work|github|repo/i.test(lowerText)) topic = "projects";
      else if (/skill|ability|expertise|experience|knowledge/i.test(lowerText)) topic = "skills";
      else if (/education|learn|study|course|degree/i.test(lowerText)) topic = "education";
      else if (/contact|email|reach|connect/i.test(lowerText)) topic = "contact";

      // Detect technical level
      let technicalLevel = "moderate";
      if (/algorithm|implementation|architecture|framework|code|technical|specific/i.test(lowerText)) {
        technicalLevel = "high";
      } else if (/simple|basic|explain|what is|how to/i.test(lowerText)) {
        technicalLevel = "low";
      }

      return { topic, technicalLevel };
    }

    // Analyze the user's prompt for personalization
    const sentimentAnalysis = analyzeSentiment(prompt);
    const topicAnalysis = analyzeTopicInterest(prompt);

    // Create a chat session with personalized context
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
        {
          role: 'user',
          parts: [{ text: 'How should you respond to users to make your answers personalized?' }],
        },
        {
          role: 'model',
          parts: [{ text: `
            I should:
            1. Match the user's tone and level of formality
            2. Reference Sohom's specific experiences and preferences when relevant
            3. Provide technical depth for technical questions, and simpler explanations for general questions
            4. Use friendly, conversational language with occasional emojis when appropriate
            5. Tailor responses based on the specific interests shown in the question
            6. Provide practical examples related to Sohom's work when possible
            7. Show enthusiasm for topics Sohom is passionate about
            8. Adapt my response length to the complexity of the question
          `}],
        },
      ],
    });

    // Send the user's message and get a response with personalization guidance
    const result = await chat.sendMessage(
      `You are Friday, Sohom Chatterjee's personal AI assistant. Answer the following question about Sohom based on the information provided.

      ${additionalInfo ? `I've gathered some additional information that might help: ${additionalInfo}` : ''}

      Question: ${prompt}

      Personalization guidance:
      - The user's message appears to be ${sentimentAnalysis.sentiment} in tone
      - The user seems ${sentimentAnalysis.formality} in their writing style
      - The topic appears to be related to ${topicAnalysis.topic} with ${topicAnalysis.technicalLevel} technical depth
      - Respond in a ${sentimentAnalysis.sentiment === 'negative' ? 'helpful and empathetic' : sentimentAnalysis.sentiment}, ${sentimentAnalysis.formality} manner with ${topicAnalysis.technicalLevel} technical detail
      - If the question relates to Sohom's interests in ${topicAnalysis.topic}, show enthusiasm and provide specific examples from his work
      - Make your response feel personal and tailored specifically to this user's question
      - Use Sohom's communication style preferences as a guide
      - Keep your response concise but informative, focusing on the most relevant information
      - If the user is asking about GitHub or LinkedIn information, highlight the most interesting and recent activities
      - If the user seems frustrated or confused, be extra helpful and clear in your response
      - If appropriate, suggest follow-up questions the user might be interested in
      `
    );

    // Return the response text
    return result.response.text();
  } catch (error) {
    console.error('Error generating response:', error);
    return "I apologize, but I'm having trouble processing your request at the moment. This could be due to a connection issue or a limitation in my current configuration. Could you try rephrasing your question or asking about a different topic? I'm here to help with information about Sohom's skills, projects, or anything else you'd like to know.";
  }
}
