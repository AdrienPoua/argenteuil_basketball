import JSStickyDemo from '@/components/JSSticky';

export default function TestJSStickyPage() {
  return (
    <div className='container mx-auto px-4 py-12'>
      <h1 className='mb-8 text-center text-3xl font-bold'>Page de test pour effet sticky en JavaScript</h1>
      <p className='mb-12 text-center'>
        Cette page utilise une simulation JavaScript de l&apos;effet sticky qui devrait fonctionner même si l&apos;effet
        CSS position:sticky est bloqué.
      </p>
      <JSStickyDemo />
    </div>
  );
}
