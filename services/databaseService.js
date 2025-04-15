import { database } from "./appwrite";

const databaseService = {
  // List all documents in a collection
  async listDocuments(dbId, colId) {
    try {
      const response = await database.listDocuments(dbId, colId);
      return response.documents || []; // Return an empty array if no documents found
    } catch (error) {
      console.error("Error listing documents:", error.message);
      return { error: error.message };
    }
  },

  // Create a new document in a collection
  async createDocument(dbId, colId, data, id = null) {
    try {
      return await database.createDocument(dbId, colId, id || undefined, data);
    } catch (error) {
      console.error("Error creating document:", error.message);
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