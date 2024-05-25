"use client";
import React from 'react'
import LandingPage from '@/components/LandingPage';
import News from '@/components/News';
import data from '@/data/news.json';
import { NewsModel } from '@/models';


export default function Home() {
  const newsData = data.map((news) => new NewsModel(news));
  return (
    <>
        <LandingPage />
        <News data={newsData} />
    </>
  )
}
