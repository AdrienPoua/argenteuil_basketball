import { Button } from '@/components/ui/button';
import documents from '@/data/documents.json';
import { CloudUpload } from 'lucide-react';
import H1 from '@/components/H1';
import MainSection from '@/components/layouts/MainSection';

export default function DocumentsPage() {
  return (
    <>
      <H1>Les documents utiles</H1>
      <MainSection>
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
    </>
  );
}
