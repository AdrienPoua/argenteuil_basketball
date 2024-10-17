"use client";
import { useParams } from "next/navigation";
import { Utils } from "@/utils/models";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SanityDocument } from "next-sanity";
import { POST_QUERY } from "@/lib/sanity/queries";
import { sanityFetch } from "@/lib/sanity/fetch";
import { PortableText } from "@portabletext/react";
import { components } from "@/components/PortableText";
import { useQuery } from "react-query";

const PostContent = ({ data }: { data: SanityDocument }) => (
  <div className="max-w-screen-xl mx-auto">
    <div className="flex flex-col items-center w-full mb-10 ">
      <p className="font-secondary text-gray-500 text-right w-full">
        {`Publié le ${Utils.formatDate(new Date(data.publishedAt))}`}
      </p>
    </div>
    <div className="flex flex-col gap-5">
      <PortableText value={data.body} components={components} />
    </div>
  </div>
);

export default function Index() {
  const { slug } = useParams();
  const { data } = useQuery(['post', slug], () => sanityFetch<SanityDocument>({ query: POST_QUERY(slug as string) }));

  return (
    <>
      <Header />
      <div className="grow bg-foreground flex flex-col justify-center items-center pb-12">
        {data && <PostContent data={data} />}
      </div>
      <Footer />
    </>
  );
}
