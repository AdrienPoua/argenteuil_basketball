import { Button } from '@/components/ui/button';
import documents from '@/data/documents.json';
import { CloudUpload } from 'lucide-react';
import MainSection from '@/components/layouts/MainSection';
import VideoTitle from '@/components/ui/video-title';

export default function DocumentsPage() {
  return (
    <MainSection>
      <VideoTitle type='h1' video='/videos/documents.mp4'>
        Les documents utiles
      </VideoTitle>
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
