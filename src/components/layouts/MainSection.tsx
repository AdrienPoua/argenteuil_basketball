'use client';

import React from 'react';

export default function Index({ children }: Readonly<{ children: React.ReactNode }>) {
  return <main className='container mx-auto p-4'>{children}</main>;
}
