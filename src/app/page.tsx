"use client";
import Image from "next/image";
import { ReactElement, useRef } from "react";
import useIsMobile from "@/utils/hooks/useIsMobile";
import { useSanity } from "@/utils/hooks/sanity/useSanity";
import { SanityDocument } from "next-sanity";
import { MAX_POSTS_ON_HOME_PAGE } from "@/utils/magicNumber";
import LottieCursor from "@/components/LottieCursor";
import HeaderAndFooter from "@/components/layouts/HeaderAndFooter";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import { cn } from "@/lib/utils"; // A utility function to conditionally join class names.
import { Card, CardContent } from "@/components/ui/card";



export default function HomePage() {

  return (
    <HeaderAndFooter>
      <>
        <HeroSection />
        <div >
          <h2 className="text-white mb-8">
            Actualités{" "}
          </h2>
        </div>
        <PostsWrapper />
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
        <h1 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  text-center">
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
  const isMobile = useIsMobile()

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="flex flex-wrap -mx-4 mb-10">
        <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
          {leftPostOnHomePage && (
            <div className="sticky top-10">
              <CustomCard post={leftPostOnHomePage} isMobile={isMobile} />
            </div>
          )}
        </div>
        <div className="w-full md:w-1/2 px-4">
          <div className="mb-8">
            {rightPostOnHomePage && (
              <CustomCard post={rightPostOnHomePage} isMobile={isMobile} />
            )}
          </div>
          <div className="flex flex-wrap -mx-2">
            {postsOnHomePage?.slice(0, MAX_POSTS_ON_HOME_PAGE).map((post: SanityDocument) => (
              <div key={post._id} className="w-full sm:w-1/2 px-2 mb-4">
                <CustomCard post={post} isMobile={isMobile} small />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


export const CustomCard = ({ small, post, isMobile }: { post: SanityDocument, small?: boolean, isMobile: boolean }): ReactElement => {
  const { Image, title, publishedAt: date, slug } = post;
  const formatedDate = new Date(date).toLocaleDateString('fr-FR', {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  const className = cn(
    (small && isMobile) ? "hidden" : "",
    (!small && isMobile) ? "h-[500px]" : "",
    small ? "h-[400px]" : "h-[800px]"
  );

  return (
    <Card className="group rounded-3xl w-full">
      <Link href={`/actualites/${slug.current}`} className="relative block w-full h-full">
        <div className="relative grow overflow-hidden">
          <img
            src={urlFor(Image).url()}
            alt={title}
            className={`group-hover:scale-110 transition-transform duration-300 ${className}`}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <CardContent className="mb-5">
          <h2 className="text-black text-xl">{title}</h2>
          <p className="text-gray-600">{formatedDate}</p>
        </CardContent>
      </Link>
    </Card>
  );
};
