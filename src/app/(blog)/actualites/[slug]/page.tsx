"use client";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SanityDocument } from "next-sanity";
import { POST_QUERY } from "@/utils/sanity/queries";
import { sanityFetch } from "@/utils/sanity/fetch";
import { PortableText } from "@portabletext/react";
import { components } from "@/components/PortableText";
import { useQuery } from "react-query";
import { cn } from "@/utils/cn"
;
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PostContent = ({ data }: { data: SanityDocument }) => (
  <div className={cn("flex flex-col justify-center items-center", "container mx-auto")}>
    <h1 className={cn("text-4xl font-bold text-background underline underline-offset-8", "relative w-full text-center mb-16")}>
      {data.title}
      <span className={cn("text-muted-foreground text-xl font-light", "absolute bottom-0 right-0")}> Publié le {new Date(data.publishedAt).toLocaleDateString()}</span>
      <Button
        onClick={() => window.history.back()}
        className={cn("absolute top-0 left-0", "text-background underline underline-offset-8 text-xl ")}
        variant="link"
      >
        <ArrowLeft className="w-6 h-6 mr-2" />
        Retour
      </Button>
    </h1>
    <div className={cn("flex flex-col", "gap-5", "border-2 border-primary rounded-lg p-5")}>
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
      <div className={cn("grow bg-foreground flex flex-col items-center", "pb-12 pt-10")}>
        {data && <PostContent data={data} />}
      </div>
      <Footer />
    </>
  );
}
