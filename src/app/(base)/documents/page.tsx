"use client";

import { Button } from "@/components/ui/button";
import { documents } from "@/utils/services/dataProcessing";
import { CloudUpload } from "lucide-react";
import H1 from "@/components/H1";
import MainSection from "@/components/layouts/MainSection";


export default function DocumentsPage() {
return (
    <>
      <H1>Les documents utiles</H1>
      <MainSection>
        <div className="flex flex-col items-center justify-center gap-5 w-fit m-auto">
          {documents.map((document, index) => (
            <Button
              key={document.id}
              className="size-full"
            >
              <a href={document.url} download className="flex gap-2">
                {document.title}
                <CloudUpload className="w-5 h-5" />
              </a>
            </Button>
          ))}
        </div>
      </MainSection>
    </>
  );
}
