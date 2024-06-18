import React from "react";

export default function App({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='fr'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Argenteuil Basketball</title>
        <meta name='description' content="Site officiel du club de basket d'Argenteuil" />
        <meta name='author' content='Argenteuil basketball' />
        <link rel='icon' href='/images/logo.png' />
      </head>
      <body className='flex flex-col font-main min-h-svh'>
        {children}
      </body>
    </html>
  );
}
