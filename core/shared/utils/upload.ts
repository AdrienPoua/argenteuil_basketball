"use client"

import { v4 as uuidv4 } from "uuid"
import { createClient } from "@/core/infrastructure/supabase/clients/client"

export async function uploadFile(file: File, bucket: string, folder?: string): Promise<string> {
  const supabase = createClient()

  // Générer un nom unique pour le fichier
  const fileExt = file.name.split(".").pop()
  const fileName = `${uuidv4()}.${fileExt}`
  const filePath = folder ? `${folder}/${fileName}` : fileName

  // Upload du fichier
  const { data, error } = await supabase.storage.from(bucket).upload(filePath, file)

  if (error) {
    throw new Error(`Erreur lors de l'upload: ${error.message}`)
  }

  // Récupérer l'URL publique
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(data.path)

  return publicUrl
}
