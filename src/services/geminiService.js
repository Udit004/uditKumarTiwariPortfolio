// Gemini API Service with enhanced context understanding
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// Debug logging
console.log('Environment check:', {
  hasApiKey: !!GEMINI_API_KEY,
  apiKeyLength: GEMINI_API_KEY?.length,
  apiKeyStart: GEMINI_API_KEY?.substring(0, 10) + '...',
  allEnvVars: Object.keys(process.env).filter(key => key.includes('GEMINI'))
});

// Portfolio context for Udit Kumar Tiwari
const portfolioContext = `
You are Udit's AI assistant on his portfolio website. Here's information about Udit Kumar Tiwari:

PROFESSIONAL BACKGROUND:
- Full-stack developer with expertise in modern web technologies
- Experienced in building scalable applications and AI-integrated solutions
- Skilled in both frontend and backend development
- Passionate about creating innovative digital solutions

TECHNICAL SKILLS:
- Frontend: React, Next.js, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS
- Backend: Node.js, Express.js, Python, RESTful APIs, GraphQL
- Databases: MongoDB, PostgreSQL, MySQL, Firebase
- Cloud & DevOps: AWS, Google Cloud, Docker, CI/CD
- AI/ML: Integration with AI APIs, machine learning model implementation
- Mobile: React Native, responsive web design
- Tools: Git, GitHub, VS Code, Figma, Postman

NOTABLE PROJECTS:
- AI-powered portfolio website with intelligent chatbot
- E-commerce platforms with payment gateway integration
- Real-time chat applications with WebSocket implementation
- Mobile applications with cross-platform compatibility
- Automation tools and workflow optimization systems
- Various web applications with modern UI/UX

CONTACT INFORMATION:
- Email: rajankumart266@gmail.com
- Available for freelance projects and full-time opportunities
- Open to collaborations in web development and AI integration

Respond naturally and helpfully about Udit's background, skills, and experience when asked.
`;

export const generateAIResponse = async (userMessage) => {
  try {
    if (!GEMINI_API_KEY) {
      throw new Error("Gemini API key not found");
    }

    // Check if the message is about Udit or general conversation
    const isAboutUdit = /\b(udit|developer|portfolio|skills|projects|experience|contact|hire|work|background|about\s+(him|you))\b/i.test(userMessage);
    
    let contextualPrompt;
    if (isAboutUdit) {
      contextualPrompt = `${portfolioContext}\n\nUser is asking about Udit Kumar Tiwari. Please provide detailed, specific information about him based on the portfolio data provided. Be conversational and engaging.`;
    } else {
      contextualPrompt = `You are a helpful AI assistant. The user is having a general conversation with you. Respond naturally and helpfully to their question or comment. Be engaging, informative, and conversational like ChatGPT would be.`;
    }

    const contents = [
      {
        role: "user",
        parts: [{ text: contextualPrompt }],
      },
      {
        role: "model",
        parts: [
          {
            text: "I understand. I'll respond appropriately based on whether the question is about Udit or a general conversation.",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: `${userMessage}`,
          },
        ],
      },
    ];

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

    const geminiPayload = {
      contents: contents,
      generationConfig: {
        temperature: 0.9, // Increased for more natural, conversational responses
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 800, // Optimized for conversational responses
        stopSequences: [],
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(geminiPayload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Gemini API error response:", errorBody);

      if (response.status === 403) {
        throw new Error("API key is invalid or has insufficient permissions");
      } else if (response.status === 404) {
        throw new Error("Invalid API endpoint or model not found");
      } else if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later");
      } else {
        throw new Error(
          `Gemini API request failed: ${response.status} ${response.statusText}`
        );
      }
    }

    const data = await response.json();

    if (data.error) {
      console.error("Gemini API error:", data.error);
      throw new Error(data.error.message || "Unknown API error");
    }

    const aiResponse =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response. Please try again.";

    if (data.candidates?.[0]?.finishReason === "SAFETY") {
      throw new Error(
        "Response was blocked by safety filters. Please rephrase your message."
      );
    }

    return aiResponse;
  } catch (error) {
    console.error("Error calling Gemini API:", error);

    if (error.message.includes("API key not found")) {
      return "API configuration issue. Please contact the developer to fix the API setup.";
    } else if (error.message.includes("403")) {
      return "API access issue. The API key might need proper permissions or billing setup.";
    } else if (error.message.includes("404")) {
      return "API endpoint issue. The service might be temporarily unavailable.";
    } else {
      return "I'm having trouble connecting right now. Feel free to ask me anything else, or you can reach out to Udit directly at rajankumart266@gmail.com!";
    }
  }
};

// If you want to integrate with actual Gemini API, replace the above with:
/*
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

export const generateAIResponse = async (message) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `You are Udit's AI assistant on his portfolio website. You should help visitors learn about Udit's skills, projects, and experience, but you can also engage in general conversation. 

    Context about Udit:
    - Full-stack developer with expertise in React, Node.js, and modern web technologies
    - Experience with AI/ML integration
    - Has built various projects including e-commerce platforms, chatbots, and mobile applications
    - Skilled in JavaScript, TypeScript, React, Next.js, Node.js, MongoDB, PostgreSQL
    - Experienced with cloud platforms like AWS and Google Cloud
    
    User message: ${message}
    
    Respond in a helpful, friendly manner. Keep responses concise but informative.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.";
  }
};
*/