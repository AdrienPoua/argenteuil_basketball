import prisma from '@/database/prisma';

export interface FileUpload {
  title: string;
  fileName: string;
  fileContent: Buffer | Uint8Array;
  mimeType: string;
  fileSize: number;
}

export default class DocumentService {
  static async getDocuments() {
    try {
      const documents = await prisma.document.findMany({
        orderBy: {
          title: 'asc',
        },
        select: {
          id: true,
          title: true,
          fileName: true,
          mimeType: true,
          fileSize: true,
          createdAt: true,
          updatedAt: true,
          // Exclude fileContent to improve performance
        },
      });

      return documents;
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
  }

  static async getDocumentById(id: string, includeContent = false) {
    try {
      const document = await prisma.document.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          title: true,
          fileName: true,
          mimeType: true,
          fileSize: true,
          fileContent: includeContent, // Only include content if explicitly requested
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!document) {
        throw new Error(`Document with id ${id} not found`);
      }

      return document;
    } catch (error) {
      console.error(`Error fetching document ${id}:`, error);
      throw error;
    }
  }

  static async createDocument(documentData: FileUpload) {
    try {
      // Conversion explicite en Uint8Array pour satisfaire Prisma
      const fileContentBuffer =
        documentData.fileContent instanceof Buffer ? documentData.fileContent : Buffer.from(documentData.fileContent);

      const document = await prisma.document.create({
        data: {
          title: documentData.title,
          fileName: documentData.fileName,
          mimeType: documentData.mimeType,
          fileSize: documentData.fileSize,
          fileContent: fileContentBuffer as unknown as Uint8Array,
        },
      });

      return {
        id: document.id,
        title: document.title,
        fileName: document.fileName,
        mimeType: document.mimeType,
        fileSize: document.fileSize,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
      };
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  }

  static async updateDocument(id: string, documentData: Partial<FileUpload>) {
    try {
      const data: Record<string, any> = {};

      if (documentData.title !== undefined) data.title = documentData.title;
      if (documentData.fileName !== undefined) data.fileName = documentData.fileName;
      if (documentData.mimeType !== undefined) data.mimeType = documentData.mimeType;
      if (documentData.fileSize !== undefined) data.fileSize = documentData.fileSize;

      if (documentData.fileContent !== undefined) {
        // Conversion explicite en Uint8Array pour satisfaire Prisma
        const fileContentBuffer =
          documentData.fileContent instanceof Buffer ? documentData.fileContent : Buffer.from(documentData.fileContent);

        data.fileContent = fileContentBuffer as unknown as Uint8Array;
      }

      const document = await prisma.document.update({
        where: {
          id,
        },
        data,
        select: {
          id: true,
          title: true,
          fileName: true,
          mimeType: true,
          fileSize: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return document;
    } catch (error) {
      console.error(`Error updating document ${id}:`, error);
      throw error;
    }
  }

  static async deleteDocument(id: string) {
    try {
      await prisma.document.delete({
        where: {
          id,
        },
      });

      return true;
    } catch (error) {
      console.error(`Error deleting document ${id}:`, error);
      throw error;
    }
  }
}
