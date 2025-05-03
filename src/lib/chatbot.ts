import { GoogleGenerativeAI } from '@google/generative-ai';


const API_KEY = 'AIzaSyCg-Tqu4iJjhcuf7ORrbEFQg4Dtw-PrrtY';

// Sohom's information for context
const sohomInfo = {
  basic: `
Sohom Chatterjee is an AI/ML Developer with expertise in machine learning, deep learning, and data science.
He has 1.5+ years of experience in AI/ML development and is currently an undergraduate B.Tech Computer Science and Engineering student at Sister Nivedita University.
  `,
  
  background: `
Personal Background:
- Passionate about artificial intelligence and its applications in solving real-world problems
- Enjoys exploring cutting-edge technologies and implementing innovative solutions
- Values clean, efficient code and well-designed systems
- Prefers PyTorch over TensorFlow for deep learning projects
- Interested in the intersection of AI and creative applications like music generation
- Enjoys collaborating on open-source projects and contributing to the AI community
  `,
  
  education: `
Education:
- Sister Nivedita University – B.Tech in Computer Science and Engineering
- DAV Model School, India – High School (Computer Science), 2010–2024
  `,
  
  experience: `
Experience:
- GeeksforGeeks Sister Nivedita University Chapter (member/leadership role)
- 1.5+ years of experience in AI/ML development
  `,
  
  skills: `
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
  `,
  
  projects: `
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
  `,
  
  interests: `
Personal Interests:
- Artificial Intelligence and Machine Learning
- Computer Vision applications
- Game Development
- Web Development
  `,
  
  contact: `
Contact Information:
- Email: sohomchatterjee07@gmail.com
- LinkedIn: www.linkedin.com/in/sohom-chatterjee-61828a312
- GitHub: https://github.com/Sagexd08
- Instagram: @sagexd_07
- LeetCode: leetcode.com/u/Sagexd
- Devfolio: devfolio.co/@sagexd_07
  `,
  
  location: `
Location:
- Kolkata/Durgapur, India
  `,
  
  github: `
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
- FaceGuard: AI-powered face recognition attendance system
- Weather-Forcast: Weather forecasting app using the OpenWeatherMap API
- Finger-Movement-tracker: Real-time finger gesture tracking with TensorFlow
- Flappy-Bird-Game-using-Python: Implementation of the Flappy Bird game with Pygame
- Emotion-Detector-by-Python: Program to classify emotions from text/images/audio
  `,
  
  linkedin: `
LinkedIn Profile Information:
URL: https://www.linkedin.com/in/sohom-chatterjee-61828a312
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
  `,
  
  ai_ml: `
AI/ML Experience:
- 1.5+ years of experience in AI/ML development
- Expertise in machine learning, deep learning, and data science
- Practical projects in computer vision and emotion detection
- Experience with PyTorch, TensorFlow, and other ML frameworks
- Knowledge of neural networks and deep learning architectures
  `,
  
  frameworks: `
Framework Preferences:
- Prefers PyTorch over TensorFlow for deep learning projects
- Experience with various ML frameworks and libraries
- Skilled in using scikit-learn, Pandas, NumPy for data analysis
- Familiar with web frameworks like React
  `,
  
  computer_vision: `
Computer Vision Experience:
- Developed Face-Detection-Using-Python project using OpenCV & ML
- Created FaceGuard, an AI-powered face recognition attendance system
- Built Finger-Movement-tracker using TensorFlow
- Experience with image processing and computer vision algorithms
  `,
  
  nlp: `
Natural Language Processing Experience:
- Skills in text processing and analysis
- Experience with NLP libraries and techniques
- Knowledge of sentiment analysis and text classification
  `,
  
  creative_ai: `
Creative AI Interests:
- Passionate about the intersection of AI and creative applications
- Interest in music generation using AI
- Exploring innovative AI solutions for creative problems
  `
};

// Function to detect user intent from prompt using Gemini API
async function detectIntent(prompt: string): Promise<string> {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const intentPrompt = `Identify the intent from this user query about Sohom Chatterjee: "${prompt}". 
Possible intents: help, background, education, skills, projects, github, contact, ai_ml, frameworks, experience, interests, creative_ai, computer_vision, nlp, location, about.
Respond with just the intent keyword.`;
    
    const result = await model.generateContent(intentPrompt);
    const intent = (await result.response.text()).trim().toLowerCase();
    
    // Map Gemini's intent to our response categories
    switch(intent) {
      case 'help': return 'help';
      case 'background': return 'background';
      case 'education': return 'education';
      case 'skills': return 'skills';
      case 'projects':
      case 'github': return 'github';
      case 'contact': return 'contact';
      case 'location': return 'location';
      case 'ai':
      case 'ml':
      case 'ai_ml': return 'ai_ml';
      case 'pytorch':
      case 'tensorflow':
      case 'frameworks': return 'frameworks';
      case 'experience': return 'experience';
      case 'interests': return 'interests';
      case 'creative_ai': return 'creative_ai';
      case 'computer_vision': return 'computer_vision';
      case 'nlp': return 'nlp';
      case 'about': return 'about';
      default: return 'general';
    }
  } catch (error) {
    console.error('Error detecting intent with Gemini:', error);
    // Fallback to simple regex matching
    const lowerPrompt = prompt.toLowerCase();
    
    if (/help|assist|what can you do/i.test(lowerPrompt)) return "help";
    else if (/github|repositories|repos/i.test(lowerPrompt)) return "github";
    else if (/linkedin|profile/i.test(lowerPrompt)) return "linkedin";
    else if (/education|university|school/i.test(lowerPrompt)) return "education";
    else if (/skills|abilities|technologies/i.test(lowerPrompt)) return "skills";
    else if (/contact|email|reach out/i.test(lowerPrompt)) return "contact";
    else if (/location|where|based/i.test(lowerPrompt)) return "location";
    else if (/ai|ml|machine learning/i.test(lowerPrompt)) return "ai_ml";
    else if (/pytorch|tensorflow|framework/i.test(lowerPrompt)) return "frameworks";
    else if (/experience|work|professional/i.test(lowerPrompt)) return "experience";
    else if (/passion|interest|enjoy/i.test(lowerPrompt)) return "interests";
    else if (/music|creative|generation/i.test(lowerPrompt)) return "creative_ai";
    else if (/computer vision|cv|image|vision|recognition|detection/i.test(lowerPrompt)) return "computer_vision";
    else if (/nlp|natural language|text|language processing|sentiment/i.test(lowerPrompt)) return "nlp";
    else if (/who|about|tell me about|background|intro/i.test(lowerPrompt)) return "about";
    
    return "general";
  }
}

// Generate a response based on intent
export async function generateResponse(prompt: string): Promise<string> {
  try {
    // Detect the intent of the user's question
    const intent = await detectIntent(prompt);
    console.log("Detected intent:", intent);
    
    // Generate a response based on the detected intent
    let response = "";
    
    switch (intent) {
      case "help":
        response = `I'm Friday, Sohom's AI assistant. I can tell you about:
- Sohom's background and education
- His skills and experience in AI/ML
- His projects and interests
- His contact information
- His preferences for frameworks like PyTorch vs TensorFlow
- His expertise in Computer Vision and NLP
- His location and social profiles

Just ask me anything about Sohom, and I'll provide you with the information!`;
        break;
        
      case "github":
        response = `${sohomInfo.github}

Would you like to know more about any specific project?`;
        break;
        
      case "linkedin":
        response = `${sohomInfo.linkedin}

Is there anything specific about Sohom's professional background you'd like to know?`;
        break;
        
      case "education":
        response = `${sohomInfo.education}

Sohom is currently pursuing his B.Tech in Computer Science and Engineering at Sister Nivedita University. He completed his high school education at DAV Model School with a focus on Computer Science.`;
        break;
        
      case "skills":
        response = `${sohomInfo.skills}

Sohom is particularly skilled in AI/ML development, with expertise in Python, PyTorch, and TensorFlow. He has experience in both Computer Vision and Natural Language Processing.`;
        break;
        
      case "contact":
        response = `${sohomInfo.contact}

You can reach out to Sohom through any of these platforms. His email is the best way for direct communication.`;
        break;
        
      case "location":
        response = `${sohomInfo.location}

Sohom is based in India, specifically in the Kolkata/Durgapur area.`;
        break;
        
      case "ai_ml":
        response = `${sohomInfo.ai_ml}

Sohom has 1.5+ years of experience in AI/ML development and has worked on various projects in this field, including face detection, emotion recognition, and finger movement tracking applications.`;
        break;
        
      case "frameworks":
        response = `${sohomInfo.frameworks}

Sohom prefers PyTorch over TensorFlow for deep learning projects due to its dynamic computation graph and intuitive design.`;
        break;
        
      case "experience":
        response = `${sohomInfo.experience}

Sohom has 1.5+ years of experience in AI/ML development. He's also been involved with the GeeksforGeeks Sister Nivedita University Chapter.`;
        break;
        
      case "interests":
        response = `${sohomInfo.interests}

Sohom is passionate about AI applications in solving real-world problems and enjoys exploring cutting-edge technologies.`;
        break;
        
      case "creative_ai":
        response = `${sohomInfo.creative_ai}

Sohom is particularly interested in the intersection of AI and creative applications like music generation.`;
        break;
        
      case "computer_vision":
        response = `${sohomInfo.computer_vision}

Sohom has developed several computer vision projects, including face detection and recognition systems.`;
        break;
        
      case "nlp":
        response = `${sohomInfo.nlp}

Sohom has skills in Natural Language Processing and text analysis techniques.`;
        break;
        
      case "background":
      case "about":
        response = `${sohomInfo.basic}
${sohomInfo.background}
Sohom is an AI/ML Developer with 1.5+ years of experience who is passionate about creating intelligent solutions that solve real-world problems.`;
        break;
        
      default:
        // General response for when no specific intent is detected
        response = `${sohomInfo.basic}

Sohom is passionate about AI applications in solving real-world problems and has worked on various projects including face detection, emotion recognition, and more.

Is there something specific about Sohom you'd like to know? You can ask about his education, skills, projects, or interests.`;
        break;
    }
    
    return response;
  } catch (error) {
    console.error("Error in generateResponse:", error);
    
    // Provide a fallback response if something goes wrong
    return `I can answer your question based on what I know about Sohom:

Sohom Chatterjee is an AI/ML Developer with 1.5+ years of experience in machine learning, deep learning, and data science. He's currently pursuing a B.Tech in Computer Science and Engineering at Sister Nivedita University.

He's passionate about AI applications in solving real-world problems and prefers PyTorch over TensorFlow for deep learning projects. His skills include Python, Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, and Data Analysis.

Some of his notable projects include Face Detection, FaceGuard (attendance system), and Emotion Detection applications.

Is there something specific about Sohom you'd like to know more about?`;
  }
}
