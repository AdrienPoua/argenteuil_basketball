import { PortableTextBlock } from '@portabletext/react';

export function estimateReadingTime(blocks: PortableTextBlock[]): number {
  const text = blocks
    .filter((block) => block._type === 'block')
    .map((block) => block.children.map((child) => child.text).join(''))
    .join(' ');

  const words = text.trim().split(/\s+/).length;
  const wordsPerMinute = 200;

  return Math.ceil(words / wordsPerMinute);
}
