import React from "react";
import { NewsProps } from "../types";
import BigCard from "./BigCard";
import { SmallCard } from "./SmallCard";
import { News } from "../utils/models";

type ContainerProps = {
  data: NewsProps[];
};
export default function Container({ data }: Readonly<ContainerProps>) {
  // Ensuring there is a fallback if the main or secondary news isn't explicitly marked
  const mainNews = data.find((item) => item.type === "main") ?? data[0];
  const secondaryNews =
    data.find((item) => item.type === "secondary") ?? data[1];
  const othersNews = data.filter(
    (item) => item !== mainNews && item !== secondaryNews
  );

  // Sorting by date and taking the top 4
  const newsToDisplay = News.sortByDate(othersNews).slice(0, 4);

  return (
    <div className='flex flex-col w-full bg-black py-5 px-32 '>
      <div className='flex justify-between uppercase items-center mb-16'>
        <div className='text-white text-5xl'>Latest News</div>
        <a  href="/" className="relative">
          <div className='underline text-2xl me-5 text-white'>
            All news
          </div>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "100%",
              transform: 'translate(-50%, -50%) rotate(-90deg)', // Ajout de la rotation
              content: '""',
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "10px solid #fff",
            }}
          ></div>
        </a>
      </div>
      <div className='flex gap-5'>
        <div className='flex flex-col w-1/2'>
          <BigCard data={mainNews} />
        </div>
        <div className='flex flex-col w-1/2'>
          <BigCard data={secondaryNews} />
          <div className='flex flex-wrap mt-5 justify-between'>
            {newsToDisplay.map((news : NewsProps ) => (
              <SmallCard key={news.id} data={news} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
