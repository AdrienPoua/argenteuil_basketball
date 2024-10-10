"use client";

import React, { useState, useRef, ReactElement } from "react";
import { Button } from "@/components/ui/button"; // ShadCN UI Button
import { Input } from "@/components/ui/input"; // ShadCN UI Input
import { Loader2 } from "lucide-react"; // ShadCN UI equivalent to CircularProgress
import { useToast } from "@/hooks/use-toast"; // ShadCN UI Toast for notifications
import { parseExcelToJson } from "@/lib/xlsx";
import { TDatabase } from "@/utils/types";

type PropsType = {
  serverAction: (arg: any) => Promise<void>;
};

export default function Index({ serverAction }: Readonly<PropsType>): ReactElement {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast(); // ShadCN UI Toast for notifications

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleClick = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (file) {
      try {
        setLoading(true);
        const jsonData: TDatabase.Match[] | TDatabase.Member[] = await parseExcelToJson(file);
        await Promise.all(
          jsonData.map(async (match) => {
            try {
              const plainObject = JSON.parse(JSON.stringify(match)); // Convert to plain object
              await serverAction(plainObject);
            } catch (error) {
              console.error(`Erreur lors de l'exécution de la server action: ${error}`);
              throw new Error(`Erreur lors de la création du match: ${error}`);
            }
          })
        );
        toast({
          title: "Succès",
          description: "Fichier importé avec succès.",
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description:
            "Erreur lors de l'importation du fichier. Le fichier doit provenir de l'extraction FBI.",
        });
        console.error("Erreur lors de l'importation du fichier:", error);
      } finally {
        setFile(null);
        if (inputFileRef.current) {
          inputFileRef.current.value = "";
        }
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 w-[800px]">
      {/* Input field for file */}
      <Input
        type="file"
        onChange={handleFileChange}
        ref={inputFileRef}
        className="cursor-pointer"
      />

      {/* Button for submitting */}
      <Button onClick={handleClick} disabled={loading}>
        {loading ? "Envoi en cours" : "Envoyer"}
      </Button>

      {/* Loader while loading */}
      {loading && <Loader2 className="animate-spin" size={24} />}
    </div>
  );
}
