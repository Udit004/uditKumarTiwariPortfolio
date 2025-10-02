import { vectorService } from "./vectorService";
import { generateAIResponse } from "./geminiService";

class RAGService {
  constructor() {
    this.isReady = false;
  }

  async initialize() {
    try {
      // Initialize vector service
      const vectorInitialized = await vectorService.initialize();

      if (vectorInitialized) {
        const info = await vectorService.getCollectionInfo();
        if (info.documentCount === 0) {
          console.log("No documents found, will populate knowledge base...");
          await this.populateKnowledgeBase();
        }
        this.isReady = true;
        console.log("RAG service initialized successfully");
      } else {
        console.warn("Vector database not available, falling back to basic AI");
        this.isReady = false;
      }

      return this.isReady;
    } catch (error) {
      console.error("Failed to initialize RAG service:", error);
      this.isReady = false;
      return false;
    }
  }

  async populateKnowledgeBase() {
    try {
      // Load portfolio data
      const portfolioData = await import(
        "../data/knowledge-base/portfolio-data.json"
      );
      const data = portfolioData.default;

      const documents = [];

      // Process personal info
      documents.push({
        content: `Name: ${data.personalInfo.name}
Title: ${data.personalInfo.title}
Bio: ${data.personalInfo.bio}
Experience: ${data.personalInfo.experience}
Location: ${data.personalInfo.location}
Contact: ${data.personalInfo.email}`,
        source: "portfolio-data.json",
        type: "personal_info",
        title: "Personal Information",
      });

      // Process skills
      [
        ...data.skills.frontend,
        ...data.skills.backend,
        ...data.skills.databases,
      ].forEach((skill) => {
        documents.push({
          content: `Skill: ${skill.name}
Level: ${skill.level}
Description: ${skill.description}`,
          source: "portfolio-data.json",
          type: "skill",
          title: `${skill.name} Skill`,
          metadata: { skillName: skill.name, level: skill.level },
        });
      });

      // Process projects
      data.projects.forEach((project) => {
        documents.push({
          content: `Project: ${project.name}
Description: ${project.description}
Technologies: ${project.technologies.join(", ")}
Features: ${project.features.join(", ")}
Status: ${project.status}`,
          source: "portfolio-data.json",
          type: "project",
          title: project.name,
          metadata: { projectName: project.name, status: project.status },
        });
      });

      // Add documents to vector database
      await vectorService.addDocuments(documents);
      console.log("Knowledge base populated successfully");
    } catch (error) {
      console.error("Error populating knowledge base:", error);
    }
  }

  async generateEnhancedResponse(userMessage) {
    try {
      let context = "";

      if (this.isReady) {
        // Search for relevant documents
        const relevantDocs = await vectorService.searchSimilarDocuments(
          userMessage,
          3
        );

        if (relevantDocs.length > 0) {
          context = "Based on the following information about Udit:\n\n";
          relevantDocs.forEach((doc, index) => {
            context += `${index + 1}. ${doc.content}\n\n`;
          });
          context +=
            "Please provide a comprehensive answer using this information.\n\n";
        }
      }

      // Combine context with user message
      const enhancedPrompt = context + `User question: ${userMessage}`;

      // Generate response using Gemini with enhanced context
      const response = await generateAIResponse(enhancedPrompt);

      return {
        response,
        usedRAG: this.isReady && context.length > 0,
        sources: this.isReady
          ? await vectorService.searchSimilarDocuments(userMessage, 3)
          : [],
      };
    } catch (error) {
      console.error("Error generating enhanced response:", error);

      // Fallback to regular AI response
      const fallbackResponse = await generateAIResponse(userMessage);
      return {
        response: fallbackResponse,
        usedRAG: false,
        sources: [],
      };
    }
  }

  async getStatus() {
    const vectorInfo = await vectorService.getCollectionInfo();
    return {
      isReady: this.isReady,
      documentCount: vectorInfo.documentCount,
      vectorDBInitialized: vectorInfo.isInitialized,
    };
  }
}

export const ragService = new RAGService();
