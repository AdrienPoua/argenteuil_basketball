import { useIsClient } from '@/hooks/useIsClient';

export function ClientOnly({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) {
  const isClient = useIsClient();
  if (!isClient) return fallback;
  return children;
}
