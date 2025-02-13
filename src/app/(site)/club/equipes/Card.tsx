'use client';
import Team from '@/models/Team';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

type PropsType = {
  data: ReturnType<Team['toPlainObject']>;
  expandedIndex: number | null;
  setExpandedIndex: (index: number | null) => void;
  index: number;
};

export default function TeamCard({ data, expandedIndex, setExpandedIndex, index }: Readonly<PropsType>): JSX.Element {
  return (
    <div className='flex flex-col items-center rounded-lg hover:border-2 hover:border-primary hover:brightness-150'>
      <motion.div
        className={cn('relative cursor-pointer overflow-hidden rounded-t-lg', 'h-96')}
        initial={{ width: '10rem' }}
        animate={{ width: expandedIndex === index ? '20rem' : '12rem' }}
        transition={{ duration: 0.3 }}
        onHoverStart={() => {
          if (window.innerWidth > 768) {
            setExpandedIndex(expandedIndex === index ? null : index);
          }
        }}
      >
        <Image
          src={data.image || '/images/placeholder.png'}
          alt={data.name}
          layout='fill'
          objectFit='cover'
          objectPosition='center'
          className='absolute inset-0 transition-transform duration-300'
        />
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300' />
      </motion.div>
      <h3 className='mb-2 text-xl font-semibold'>{data.name}</h3>
    </div>
  );
}
