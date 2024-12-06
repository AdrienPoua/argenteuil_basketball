"use server";

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
      return newDocument;
    } catch (error) {
      console.error("Error creating document:", error);
      throw error;
    }
  }

  async read(filter: mongoose.FilterQuery<T> = {}): Promise<T[]> {
    await connectDB();
    try {
      const documents = await this.model.find(filter);
      console.log("Documents retrieved successfully:", documents);
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
        console.log("Document updated successfully:", updatedDocument);
        return updatedDocument;
      } else {
        console.log("No document found with this filter:", filter);
        return null;
      }
    } catch (error) {
      console.error("Error updating document:", error);
      throw error;
    }
  }

  async remove(filter: mongoose.FilterQuery<T>): Promise<T | null> {
    await connectDB();
    try {
      const deletedDocument = await this.model.findOneAndDelete(filter);
      if (deletedDocument) {
        console.log("Document deleted successfully:", deletedDocument);
        return deletedDocument;
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

