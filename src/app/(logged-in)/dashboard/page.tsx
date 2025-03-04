'use client';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    const fetchToken = async () => {
      await fetch('/api/ffbb/token');
    };
    fetchToken();
  }, []);

  return (
    <div>
      {/* Le titre est maintenant géré par le PageHeader */}
    </div>
  );
}
