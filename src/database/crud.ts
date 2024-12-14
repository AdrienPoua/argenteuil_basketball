import mongoose, { Model, Document } from "mongoose";
import connectDB from "@/database/connectdb";

export default class CRUD<T extends Document> {
  private readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(payload: Partial<T>): Promise<T> {
    await connectDB();
    try {
      const newDocument = new this.model(payload);
      await newDocument.save();
      console.log("Document created successfully:", newDocument);
      return JSON.parse(JSON.stringify(newDocument));
    } catch (error) {
      console.error("Error creating document:", error);
      throw error;
    }
  }

  async read(filter: mongoose.FilterQuery<T> = {}): Promise<T[]> {
    await connectDB();
    console.log("filter");
    try {
      const documents = await this.model.find(filter);
      return JSON.parse(JSON.stringify(documents));
    } catch (error) {
      console.error("Error retrieving documents:", error);
      throw error;
    }
  }

  async update(filter: mongoose.FilterQuery<T>, payload: Partial<T>): Promise<T | null> {
    await connectDB();
    try {
      const updatedDocument = await this.model.findOneAndUpdate(filter, payload, {
        new: true,
        runValidators: true,
      });

      if (updatedDocument) {
        return JSON.parse(JSON.stringify(updatedDocument));
      } else {
        console.log("No document found with this filter:", filter);
        return null;
      }
    } catch (error) {
      console.error("Error updating document:", error);
      throw error;
    }
  }

  async findOne(filter: mongoose.FilterQuery<T>): Promise<T | null> {
    await connectDB();
    try {
      const document = await this.model.findOne(filter);
      if (document) {
        return JSON.parse(JSON.stringify(document));
      } else {
        console.log("No document found with this filter:", filter);
        return null;
      }
    } catch (error) {
      console.error("Error finding document:", error);
      throw error;
    }
  }

  async upsert(
    filter: mongoose.FilterQuery<T>,
    payload: Partial<T>
  ): Promise<T> {
    await connectDB();
    try {
      const updatedOrCreatedDocument = await this.model.findOneAndUpdate(
        filter,
        payload,
        {
          new: true, // Retourne le document mis à jour ou créé
          upsert: true, // Crée un nouveau document si aucun ne correspond au filtre
          runValidators: true, // Applique les validateurs du schéma
        }
      );
  
      console.log(
        updatedOrCreatedDocument
          ? "Document updated or created successfully:"
          : "Unexpected null document returned",
        updatedOrCreatedDocument
      );
  
      return JSON.parse(JSON.stringify(updatedOrCreatedDocument));
    } catch (error) {
      console.error("Error during upsert operation:", error);
      throw error;
    }
  }
  

  async remove(filter: mongoose.FilterQuery<T>): Promise<T | null> {
    await connectDB();
    try {
      const deletedDocument = await this.model.findOneAndDelete(filter);
      if (deletedDocument) {
        console.log("Document deleted successfully:", deletedDocument);
        return JSON.parse(JSON.stringify(deletedDocument));
      } else {
        console.log("No document found to delete with this filter:", filter);
        return null;
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      throw error;
    }
  }

  static async drop(collection: string): Promise<void> {
    await connectDB();
    try {
      await mongoose.connection.db?.dropCollection(collection);
      console.log("Collection dropped successfully:", collection);
    } catch (error) {
      console.error("Error dropping collection:", error);
      throw error;
    }
  }
}

