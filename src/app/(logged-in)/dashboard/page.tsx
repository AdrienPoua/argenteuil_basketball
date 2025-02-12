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
      <h1>Dashboard</h1>
    </div>
  );
}
