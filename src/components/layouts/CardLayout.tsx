import React from 'react'

export default function CardLayout({pageTitle, children} : Readonly<{pageTitle: string, children: React.ReactNode}>) {
  return (
    <div className=' flex flex-col align-middle justify-center'>
        <h1 className='text-white text-center py-3 text-3xl mt-14'> {pageTitle} </h1>
        <div className='flex flex-wrap gap-6 p-14'>
            {children}
        </div>
    </div>
  )
}
