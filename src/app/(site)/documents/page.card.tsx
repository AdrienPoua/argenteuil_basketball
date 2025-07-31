"use client"

import { AlertCircle, Calendar, Download, FileText, HardDrive } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DocumentEntity } from "@/core/domain/entities/document.entity"
import { downloadFile } from "@/core/shared/utils/downloadFile"
import { formatDate } from "@/core/shared/utils/formatDate"
import { formatSize } from "@/core/shared/utils/formatSize"

type PropsType = {
  document: ReturnType<DocumentEntity["toObject"]>
}

export default function DocumentCardClassic({ document: doc }: Readonly<PropsType>) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = () => {
    if (isDownloading) return
    try {
      setIsDownloading(true)
      downloadFile(doc)
      toast.success("Téléchargement effectué avec succès")
    } catch (error) {
      console.error(error)
      toast.error("Erreur lors du téléchargement du document")
    } finally {
      setIsDownloading(false)
    }
  }

  const getFileExtension = () => doc.url.split(".").pop()?.toUpperCase() ?? "FILE"
  const isAvailable = !!doc.url

  return (
    <div className="group relative">
      {/* Glow Effect */}
      <div className="from-primary/20 to-secondary/20 absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100" />

      <Card className="bg-background/80 border-border/50 hover:border-primary/30 relative overflow-hidden border backdrop-blur-sm transition-all duration-300">
        {/* Header Section */}
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            {/* Document Icon & Info */}
            <div className="flex min-w-0 flex-1 items-start space-x-4">
              {/* Document Icon */}
              <div className="relative flex-shrink-0">
                <div className="from-primary/10 to-secondary/10 border-border/30 flex h-12 w-12 items-center justify-center rounded-xl border bg-gradient-to-r transition-transform duration-300 group-hover:scale-110">
                  <FileText className="text-primary h-6 w-6" />
                </div>
                {/* File Type Badge */}
                <div className="from-primary to-primary/80 absolute -top-2 -right-2 rounded-full bg-gradient-to-r px-2 py-1 text-xs font-bold text-white shadow-lg">
                  {getFileExtension()}
                </div>
              </div>

              {/* Document Details */}
              <div className="min-w-0 flex-1">
                <h3 className="text-foreground group-hover:text-primary mb-2 line-clamp-2 text-lg font-semibold transition-colors duration-300">
                  {doc.title}
                </h3>
                <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">{doc.description}</p>
              </div>
            </div>

            {/* Download Button */}
            <div className="flex-shrink-0">
              <Button
                size="sm"
                onClick={handleDownload}
                disabled={isDownloading || !isAvailable}
                className="group/btn from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 disabled:from-muted disabled:to-muted relative overflow-hidden bg-gradient-to-r shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                {isDownloading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span className="hidden sm:inline">Téléchargement...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
                    <span className="hidden sm:inline">{isAvailable ? "Télécharger" : "Indisponible"}</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Footer Section */}
        <CardContent className="pt-0">
          {/* Divider */}
          <div className="via-border mb-4 h-px w-full bg-gradient-to-r from-transparent to-transparent" />

          <div className="flex items-center justify-between">
            {/* Document Metadata */}
            <div className="text-muted-foreground flex items-center space-x-6 text-sm">
              <div className="group/meta flex items-center space-x-2">
                <Calendar className="text-primary h-4 w-4 transition-transform duration-300 group-hover/meta:scale-110" />
                <span className="group-hover/meta:text-foreground transition-colors duration-300">
                  {formatDate(doc.created_at)}
                </span>
              </div>

              <div className="group/meta flex items-center space-x-2">
                <HardDrive className="text-primary h-4 w-4 transition-transform duration-300 group-hover/meta:scale-110" />
                <span className="group-hover/meta:text-foreground transition-colors duration-300">
                  {formatSize(doc.size)}
                </span>
              </div>
            </div>

            {/* Availability Status */}
            <div className="flex items-center">
              {isAvailable ? (
                <div className="flex items-center gap-2 text-green-600">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  <span className="text-xs font-medium">Disponible</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-3 w-3" />
                  <span className="text-xs font-medium">Non disponible</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>

        <BorderBottom />
      </Card>
    </div>
  )
}

function BorderBottom() {
  return (
    <div className="from-primary/50 via-primary to-primary/50 absolute right-0 bottom-0 left-0 h-1 origin-center scale-x-0 transform bg-gradient-to-r transition-transform duration-300 group-hover:scale-x-100" />
  )
}
