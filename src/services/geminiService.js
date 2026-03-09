// Backend API Service for Chatbot
// This service communicates with the Node.js backend deployed on Render

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ai-agent-backend-qvxn.onrender.com';

/**
 * Generate AI response by calling the backend API
 * @param {string} userMessage - The user's message
 * @returns {Promise<string>} - AI generated response
 */
export const generateAIResponse = async (userMessage) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/public/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `Server error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.response || "Sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error('Error calling backend API:', error);

    if (error.message.includes('Failed to fetch')) {
      return "I'm having trouble connecting to the server. Please check your internet connection.";
    }

    return "I'm having trouble processing your request right now. Please try again in a moment.";
  }
};
