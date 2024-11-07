"use client";
import Image from "next/image";
import { ReactElement, useRef } from "react";
import { useSanity } from "@/utils/hooks/sanity/useSanity";
import { SanityDocument } from "next-sanity";
import { MAX_POSTS_ON_HOME_PAGE } from "@/utils/magicNumber";
import LottieCursor from "@/components/LottieCursor";
import HeaderAndFooter from "@/components/layouts/HeaderAndFooter";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";



export default function HomePage() {
  return (
    <HeaderAndFooter>
      <>
        <HeroSection />
        <div className="max-w-[80%] mx-auto" >
          <h2 className="text-white mb-8 text-5xl">
            Actualités{" "}
          </h2>
          <PostsWrapper />
        </div>
      </>
    </HeaderAndFooter>
  );
}


const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <main className="flex flex-col grow -mt-16" >
      <LottieCursor containerRef={ref} />
      <div className="h-svh relative cursor-none " ref={ref} >
        <div className="absolute h-96 inset-x-0 bottom-0 w-full bg-gradient-to-t marker: from-black from-20%"></div>
        <h1 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  text-center text-6xl text-white">
          Argenteuil Basketball
        </h1>
        <Image
          src={"/images/background.jpg"}
          alt="background"
          className="size-full object-cover "
          width={1920}
          height={1080}
        />
      </div>
    </main>
  );
};


function PostsWrapper() {
  const { leftPostOnHomePage, rightPostOnHomePage, postsOnHomePage } = useSanity()
  return (
    <div className=" mb-20">
      <div className="flex flex-wrap gap-6 -mx-4 mb-10">
        <div className="w-full md:w-[calc(50%-24px)] ">
          {leftPostOnHomePage && (
            <div className="sticky top-16 h-[1000px] max-h-[80vh]">
              <CustomCard post={leftPostOnHomePage} />
            </div>
          )}
        </div>
        <div className="w-full md:w-[calc(50%-24px)] ">
          <div className="mb-8 h-[1000px] max-h-[80vh] ">
            {rightPostOnHomePage && (
              <CustomCard post={rightPostOnHomePage} />
            )}
          </div>
          <div className="flex flex-wrap gap-6 ">
            {postsOnHomePage?.slice(0, MAX_POSTS_ON_HOME_PAGE).map((post: SanityDocument) => (
              <div key={post._id} className="w-full md:w-[calc(50%-12px)] mb-4 md:h-[700px] max-h-[50vh]">
                <CustomCard post={post} small={true} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


const CustomCard = ({ post, small }: { post: SanityDocument, small?: boolean }): ReactElement => {
  const { Image: postImage, title, publishedAt: date, slug } = post;
  const formatedDate = new Date(date).toLocaleDateString('fr-FR', {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return (
    <Link href={`/actualites/${slug.current}`} className="flex size-full">
      <Card className="group rounded-3xl overflow-hidden flex flex-col grow border-none">
        <CardContent className={`relative overflow-hidden grow ${small ? "hidden md:block" : ""} `}>
          <Image
            src={urlFor(postImage).url()}
            alt={title}
            layout="fill"
            className="group-hover:scale-110 transition-transform duration-300 size-full display-hidden"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </CardContent>
        <CardFooter className="mt-3 flex flex-col items-start">
          <h2 className="text-black text-xl">{title}</h2>
          <p className="text-background">{formatedDate}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};
