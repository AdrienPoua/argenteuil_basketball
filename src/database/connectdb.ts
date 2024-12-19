import mongoose from "mongoose";

const { DB_USER, DB_PASSWORD } = process.env;

if(!DB_USER || !DB_PASSWORD) {
  throw new Error("Veuillez configurer les variables d'environnement DB_USER et DB_PASSWORD");
}

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@abb.oole96w.mongodb.net/?retryWrites=true&w=majority&appName=ABB`);
    console.log("Connexion à MongoDB réussie !");
  } catch (error) {
    console.log("Connexion à MongoDB échouée !");
  }
};

export default connectDB;
