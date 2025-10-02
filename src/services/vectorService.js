import { v4 as uuidv4 } from 'uuid';

class SimpleVectorService {
  constructor() {
    // Load from localStorage if available
    const saved = typeof window !== 'undefined' ? 
      localStorage.getItem('portfolioVectorStore') : null;
    
    this.documents = saved ? JSON.parse(saved) : [];
    this.searchCache = new Map(); // Query results cache
    this.isInitialized = false;
  }

  async initialize() {
    try {
      this.isInitialized = true;
      console.log("Simple vector service initialized");
      return true;
    } catch (error) {
      console.error("Failed to initialize vector service:", error);
      return false;
    }
  }

  // Simple text similarity using cosine similarity
  calculateSimilarity(text1, text2) {
    const getWords = (text) => text.toLowerCase().match(/\b\w+\b/g) || [];
    
    const words1 = getWords(text1);
    const words2 = getWords(text2);
    
    // Create word frequency maps
    const freq1 = {};
    const freq2 = {};
    
    words1.forEach(word => freq1[word] = (freq1[word] || 0) + 1);
    words2.forEach(word => freq2[word] = (freq2[word] || 0) + 1);
    
    // Get all unique words
    const allWords = new Set([...words1, ...words2]);
    
    // Create vectors
    const vector1 = [];
    const vector2 = [];
    
    allWords.forEach(word => {
      vector1.push(freq1[word] || 0);
      vector2.push(freq2[word] || 0);
    });
    
    // Calculate cosine similarity
    const dotProduct = vector1.reduce((sum, val, i) => sum + val * vector2[i], 0);
    const magnitude1 = Math.sqrt(vector1.reduce((sum, val) => sum + val * val, 0));
    const magnitude2 = Math.sqrt(vector2.reduce((sum, val) => sum + val * val, 0));
    
    if (magnitude1 === 0 || magnitude2 === 0) return 0;
    
    return dotProduct / (magnitude1 * magnitude2);
  }

  async addDocuments(documents) {
    try {
      documents.forEach(doc => {
        this.documents.push({
          id: uuidv4(),
          content: doc.content,
          metadata: {
            source: doc.source,
            type: doc.type,
            title: doc.title || "",
            ...doc.metadata
          }
        });
      });

      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('portfolioVectorStore', JSON.stringify(this.documents));
      }

      console.log(`Added ${documents.length} documents to vector store`);
      return true;
    } catch (error) {
      console.error("Error adding documents:", error);
      return false;
    }
  }

  async searchSimilarDocuments(query, limit = 3) {
    // Check cache first
    const cacheKey = `${query}_${limit}`;
    if (this.searchCache.has(cacheKey)) {
      console.log("Cache hit for query:", query);
      return this.searchCache.get(cacheKey);
    }

    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      // Calculate similarity scores for all documents
      const scoredDocuments = this.documents.map(doc => ({
        ...doc,
        similarity: this.calculateSimilarity(query, doc.content)
      }));

      // Sort by similarity and return top results
      const results = scoredDocuments
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, limit)
        .filter(doc => doc.similarity > 0.1); // Only return reasonably similar documents

      // Cache the results
      this.searchCache.set(cacheKey, results);
      
      // Clear cache after 5 minutes
      setTimeout(() => {
        this.searchCache.delete(cacheKey);
      }, 5 * 60 * 1000);

      return results.map(doc => ({
        content: doc.content,
        metadata: doc.metadata,
        similarity: doc.similarity
      }));
    } catch (error) {
      console.error("Error searching documents:", error);
      return [];
    }
  }

  async getCollectionInfo() {
    return {
      documentCount: this.documents.length,
      isInitialized: this.isInitialized
    };
  }

  // Clear all documents (useful for testing)
  clearDocuments() {
    this.documents = [];
  }
}

export const vectorService = new SimpleVectorService();