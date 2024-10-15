"use server";

import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; // Pour générer des noms de fichiers uniques

export const uploadImage = async (formData : FormData) => {
  const file = formData.get('file') as File;
  if(!file){
    throw new Error('No file provided')
  }
  // Définir le répertoire de stockage des images
  const uploadDir = path.join(process.cwd(), '/public/images/uploads');
  
  // Créer le répertoire s'il n'existe pas déjà
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Générer un nom de fichier unique
  const fileExtension = path.extname(file.name);
  const fileName = `${uuidv4()}${fileExtension}`;
  const filePath = path.join(uploadDir, fileName);

  // Lire le contenu du fichier
  const fileData = Buffer.from(await file.arrayBuffer());

  // Sauvegarder le fichier sur le système de fichiers
  fs.writeFileSync(filePath, fileData);

  // Retourner l'URL relative de l'image sauvegardée
  return `/images/uploads/${fileName}`;
};


