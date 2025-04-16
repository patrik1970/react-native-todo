import { database } from "./appwrite";

const databaseService = {
  // List all documents
  async listDocuments(dbId, colId) {
    try {
      const response = await database.listDocuments(dbId, colId);
      return response.documents || []; // Return an empty array if no documents found
    } catch (error) {
      console.error("Error listing documents:", error.message);
      return { error: error.message };
    }
  },

  // Create a new document 
  async createDocument(dbId, colId, data, id = null) {
    try {
      return await database.createDocument(dbId, colId, id || undefined, data);
    } catch (error) {
      console.error("Error creating document:", error.message);
      return { error: error.message };
    }
  },

  // Update an existing document 
  async updateDocument(dbId, colId, id, data) {
    try {
      return await database.updateDocument(dbId, colId, id, data);
    } catch (error) {
      console.error("Error updating document:", error.message);
      return { error: error.message };
    }
  },

  // Delete a document by ID
  async deleteDocument(dbId, colId, id) {
    try {
      await database.deleteDocument(dbId, colId, id);
      return { success: true };
    } catch (error) {
      console.error("Error deleting document:", error.message);
      return { error: error.message };
    }
  },
};

export default databaseService;