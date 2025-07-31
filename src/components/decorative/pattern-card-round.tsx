import { cn } from '@/core/shared/utils/cn';

type PropsType = {
  className?: string;
  topLeft?: boolean;
  bottomRight?: boolean;
  topRight?: boolean;
  bottomLeft?: boolean;
};

export default function PatternCardRound({
  className,
  topLeft,
  bottomRight,
  topRight,
  bottomLeft,
}: Readonly<PropsType>) {
  const position = cn({
    'top-0 left-0 -translate-x-8 -translate-y-1/3': topLeft,
    'top-0 right-0 translate-x-8 -translate-y-1/3': topRight,
    'bottom-0 left-0 -translate-x-8 translate-y-1/3': bottomLeft,
    'bottom-0 right-0 translate-x-8 translate-y-1/3': bottomRight,
  });

  return (
    <div
      className={cn(
        'absolute h-20 w-20 transform rounded-full bg-orange-100 transition-transform duration-500 group-hover:scale-150',
        position,
        className,
      )}
    />
  );
}
