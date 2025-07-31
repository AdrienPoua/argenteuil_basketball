import { DocumentEntity } from "@/core/domain/entities/document.entity"
import { DocumentFormCreate } from "./document-form-create"
import { DocumentFormUpdate } from "./document-form-update"

type PropsType = {
  currentDocument: DocumentEntity | null
  actions: { success: () => void; cancel: () => void }
}

export function DocumentForm({ currentDocument, actions }: Readonly<PropsType>) {
  if (currentDocument) {
    return <DocumentFormUpdate currentDocument={currentDocument} actions={actions} />
  }
  return <DocumentFormCreate actions={actions} />
}
