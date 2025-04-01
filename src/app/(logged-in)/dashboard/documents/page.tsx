'use client';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, PlusCircle, Edit, FileIcon, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface Document {
  id: string;
  title: string;
  fileName: string;
  mimeType: string;
  fileSize: number;
  createdAt: string;
  updatedAt: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
}

type EditDocumentModalProps = {
  document: Document | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, formData: FormData) => Promise<void>;
  isUpdating: boolean;
};
// Composant pour la modale d'édition
function EditDocumentModal({ document, isOpen, onClose, onUpdate, isUpdating }: Readonly<EditDocumentModalProps>) {
  const [editedTitle, setEditedTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialiser les valeurs quand la modale s'ouvre
  useEffect(() => {
    if (document) {
      setEditedTitle(document.title);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [document, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!document) return;

    if (!editedTitle) {
      return;
    }

    const formData = new FormData();
    formData.append('title', editedTitle);

    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    onUpdate(document.id, formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Modifier le document</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='edit-title'>Titre</Label>
            <Input
              id='edit-title'
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder='Titre du document'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='edit-file'>Fichier (optionnel)</Label>
            <Input id='edit-file' type='file' ref={fileInputRef} onChange={handleFileChange} />
            {document && (
              <p className='text-sm text-muted-foreground'>
                Fichier actuel: {document.fileName} ({formatFileSize(document.fileSize)})
              </p>
            )}
            {selectedFile && (
              <p className='text-sm text-muted-foreground'>
                Nouveau fichier: {selectedFile.name} ({formatFileSize(selectedFile.size)})
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type='button' variant='outline' onClick={onClose}>
              Annuler
            </Button>
            <Button type='submit' disabled={isUpdating}>
              {isUpdating ? 'Mise à jour...' : 'Mettre à jour'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

type AddDocumentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (formData: FormData) => Promise<void>;
  isAdding: boolean;
};

// Composant pour la modale d'ajout
function AddDocumentModal({ isOpen, onClose, onAdd, isAdding }: Readonly<AddDocumentModalProps>) {
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Réinitialiser le formulaire quand la modale s'ouvre/ferme
  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', selectedFile);

    onAdd(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Ajouter un document</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='add-title'>Titre</Label>
            <Input
              id='add-title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Titre du document'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='add-file'>Fichier</Label>
            <Input id='add-file' type='file' ref={fileInputRef} onChange={handleFileChange} />
            {selectedFile && (
              <p className='mt-1 text-sm text-muted-foreground'>
                {selectedFile.name} ({formatFileSize(selectedFile.size)})
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type='button' variant='outline' onClick={onClose}>
              Annuler
            </Button>
            <Button type='submit' disabled={isAdding}>
              {isAdding ? 'Ajout en cours...' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function DocumentsAdminPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchDocuments();
  }, []);

  async function fetchDocuments() {
    try {
      setLoading(true);
      const response = await fetch('/api/documents');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des documents');
      }
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleAddDocument(formData: FormData) {
    try {
      setIsAdding(true);

      const response = await fetch('/api/documents', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du document");
      }

      toast({
        title: 'Succès',
        description: 'Document ajouté avec succès',
        variant: 'default',
      });

      setIsAddModalOpen(false);
      fetchDocuments();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
        variant: 'destructive',
      });
    } finally {
      setIsAdding(false);
    }
  }

  async function handleUpdateDocument(id: string, formData: FormData) {
    try {
      setIsUpdating(true);

      const response = await fetch(`/api/documents/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du document');
      }

      toast({
        title: 'Succès',
        description: 'Document mis à jour avec succès',
        variant: 'default',
      });

      setIsEditModalOpen(false);
      fetchDocuments();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleDeleteDocument(id: string) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/documents/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du document');
      }

      toast({
        title: 'Succès',
        description: 'Document supprimé avec succès',
        variant: 'default',
      });

      fetchDocuments();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
        variant: 'destructive',
      });
    }
  }

  // Fonction pour ouvrir la modale d'édition
  const openEditModal = (document: Document) => {
    setSelectedDocument(document);
    setIsEditModalOpen(true);
  };

  return (
    <div className='p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Gestion des Documents</h1>
        <div className='flex gap-3'>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <PlusCircle className='mr-2 h-4 w-4' />
            Ajouter un document
          </Button>
        </div>
      </div>

      <Card className='w-full'>
        <CardHeader>
          <CardTitle>Liste des documents</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Chargement...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Fichier</TableHead>
                  <TableHead>Taille</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className='text-center'>
                      Aucun document disponible
                    </TableCell>
                  </TableRow>
                ) : (
                  documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>{doc.title}</TableCell>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          <FileIcon className='h-4 w-4' />
                          <span className='text-sm'>{doc.fileName}</span>
                        </div>
                      </TableCell>
                      <TableCell>{formatFileSize(doc.fileSize)}</TableCell>
                      <TableCell className='text-right'>
                        <div className='flex justify-end gap-2'>
                          <Button size='sm' asChild>
                            <a href={`/api/documents/download/${doc.id}`} download>
                              <Download className='h-4 w-4' />
                            </a>
                          </Button>
                          <Button size='sm' onClick={() => openEditModal(doc)}>
                            <Edit className='h-4 w-4' />
                          </Button>
                          <Button size='sm' variant='destructive' onClick={() => handleDeleteDocument(doc.id)}>
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Modales */}
      <AddDocumentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddDocument}
        isAdding={isAdding}
      />

      <EditDocumentModal
        document={selectedDocument}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateDocument}
        isUpdating={isUpdating}
      />
    </div>
  );
}
