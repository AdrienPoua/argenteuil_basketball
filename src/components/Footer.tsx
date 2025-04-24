import Link from 'next/link';
import Underline from '@/components/UnderlineDecorator';

export default function Footer() {
  return (
    <footer className='mb-16 flex justify-center border-t-2 border-primary bg-black pb-7 pt-4 lg:mb-0'>
      <div className='flex justify-center'>
        <Link
          href='https://www.linkedin.com/in/adrien-poua'
          target='_blank'
          className='relative flex items-center justify-center text-gray-500 no-underline'
        >
          <Underline />
          <p className='text-white'>
            Made with <span className='mx-1 text-primary'>❤</span> by{' '}
            <span className='ml-1 hover:text-primary'>Adrien POUA</span>
          </p>
        </Link>
      </div>
    </footer>
  );
}
