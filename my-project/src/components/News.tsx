import React from "react";
import { NewsProps } from "../utils/types";
import BigCard from "./BigCard";
import { SmallCard } from "./SmallCard";
import { News } from "../utils/models";

type ContainerProps = {
  data: NewsProps[];
};
export default function Container({ data }: Readonly<ContainerProps>) {
  // Ensuring there is a fallback if the main or secondary news isn't explicitly marked
  const mainNews = data.find((item) => item.type === "main") ?? data[0];
  const secondaryNews = data.find((item) => item.type === "secondary") ?? data[1];
  const othersNews = data.filter(
    (item) => item !== mainNews && item !== secondaryNews
  );

  // Sorting by date and taking the top 4
  const newsToDisplay = News.sortByDate(othersNews).slice(0, 4);

  return (
    <div className='flex flex-col w-full'>
      <div className='flex justify-between mb-5 uppercase items-center py-5'>
        <div className='font-black text-5xl'>Latest News</div>
        <a href='/' className='underline font-black text-right basis-3/12'>
          All news
        </a>
      </div>
      <div className='flex gap-5'>
        <div className='flex flex-col w-1/2'>
          <BigCard data={mainNews} />
        </div>
        <div className='flex flex-col w-1/2'>
          <BigCard data={secondaryNews} />
          <div className='flex flex-wrap mt-5 justify-between'>
            {newsToDisplay.map((news) => (
              <SmallCard key={news.id} data={news} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
