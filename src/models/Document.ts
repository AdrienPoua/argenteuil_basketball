export default class Document {
  id: string;
  title: string;
  fileName?: string = '';
  fileContent?: Buffer;
  mimeType?: string = 'application/octet-stream';
  fileSize?: number = 0;
  createdAt: Date;
  updatedAt: Date;

  constructor(document: Partial<Document>) {
    this.id = document.id ?? '';
    this.title = document.title ?? '';
    this.fileName = document.fileName ?? '';
    this.fileContent = document.fileContent;
    this.mimeType = document.mimeType ?? 'application/octet-stream';
    this.fileSize = document.fileSize ?? 0;
    this.createdAt = document.createdAt ?? new Date();
    this.updatedAt = document.updatedAt ?? new Date();
  }

  toPlainObject(): Omit<Document, 'fileContent' | 'toPlainObject'> {
    const { fileContent, ...rest } = this;
    return rest;
  }
} 