import React from 'react'

export default function Layout({pageTitle, children} : Readonly<{pageTitle: string, children: React.ReactNode}>) {
  return (
    <main className=' flex flex-col align-middle justify-center grow'>
        <h1 className='text-white text-center text-5xl mt-10 mb-20'> {pageTitle} </h1>
        <div className='flex grow justify-center'>
            {children}
        </div>
    </main>
  )
}
