import React from 'react'
import LandingPage from '@/components/LandingPage';
import News from '@/components/News';
import data from '@/data/news.json';


export default function Home() {
  return (
    <>
        <LandingPage />
        <News data={data} />
    </>
  )
}
