"use server";
import connectDB from "@/lib/mongo/mongodb";
import mongoose from "mongoose";

export const create = async ({ payload, model }: { payload: any; model: mongoose.Model<any> }) => {
  await connectDB();
  try {
    // Créer une instance du modèle
    const newDocument = new model(payload);
    console.log("🚀 ~ create ~ payload:", payload)
    console.log("🚀 ~ create ~ model:", model)
    console.log("🚀 ~ create ~ newDocument:", newDocument)

    // Sauvegarder dans la base de données
    await newDocument.save();

    console.log("Document créé avec succès:", newDocument);
    return true
  } catch (error) {
    console.error("Erreur lors de la création du document:", error);
    return false
  }
};

export const read = async ({ model, filter = {} }: { model: mongoose.Model<any>; filter?: any }) => {
  await connectDB();
  try {
    const documents = await model.find(filter);
    console.log("Documents récupérés avec succès:", documents);
    return JSON.parse(JSON.stringify(documents));
  } catch (error) {
    console.error("Erreur lors de la récupération des documents:", error);
    return null;
  }
};

export const update = async ({ filter, payload, model }: { filter: any; payload: any; model: mongoose.Model<any> }) => {
  await connectDB();
  try {
    // Mise à jour du document
    const updatedDocument = await model.findOneAndUpdate(filter, payload, {
      new: true, // Renvoie le document mis à jour
      runValidators: true, // Exécute les validateurs de schéma Mongoose
    });

    if (updatedDocument) {
      console.log("Document mis à jour avec succès:", updatedDocument);
      return updatedDocument;
    } else {
      console.log("Aucun document trouvé avec ce filtre:", filter);
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du document:", error);
    return null;
  }
};

export const remove = async ({ filter, model }: { filter: any; model: mongoose.Model<any> }) => {
  await connectDB();
  try {
    const deletedDocument = await model.findOneAndDelete(filter);
    if (deletedDocument) {
      console.log("Document supprimé avec succès:", deletedDocument);
      return deletedDocument;
    } else {
      console.log("Aucun document trouvé à supprimer avec ce filtre:", filter);
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du document:", error);
    return null;
  }
};

export async function drop(collection: string): Promise<void> {
  await connectDB();
  try {
    await mongoose.connection.db?.dropCollection(collection);
    console.log("Collection supprimée avec succès:", collection);
  } catch (error) {
    console.error("Erreur lors de la suppression du club:", error);
  }
}
