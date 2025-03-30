import { Button } from '@/components/ui/button';
import documents from '@/data/documents.json';
import { CloudUpload } from 'lucide-react';
import MainSection from '@/components/layouts/MainSection';
import H2 from '@/components/ui/h2';

export default function DocumentsPage() {
  return (
    <MainSection>
      <H2>Documents</H2>
      <div className='m-auto flex w-fit flex-col items-center justify-center gap-5'>
        {documents.map((document) => (
          <Button key={document.title} className='size-full'>
            <a href={document.url} download className='flex gap-2'>
              {document.title}
              <CloudUpload className='h-5 w-5' />
            </a>
          </Button>
        ))}
      </div>
    </MainSection>
  );
}
