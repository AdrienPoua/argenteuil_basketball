import { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanity/image";
import Image from "next/image";
import Link from "next/link";

export const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <div className="relative w-full max-w-lg h-auto overflow-hidden rounded-lg shadow-lg mb-6">
        <Image
          src={urlFor(value).url()}
          alt={value.alt || ""}
          objectFit="cover"
          className="rounded-md hover:scale-105 transition-transform duration-300 ease-in-out"
          layout="responsive"
          width={800} 
          height={1000} 
        />
      </div>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <Link
        href={value.href}
        target="_blank"
        className="mb-3"
        rel="noopener noreferrer">
        <span className="text-primary underline hover:text-primary-dark">{children}</span>
      </Link>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-black text-center text-4xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-black text-center">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-black text-3xl text-center mb-5">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-black text-2xl mb-1">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-black font-secondary">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc mb-4">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="ml-4 mb-5">
        <span className="text-primary underline underline-offset-4">{children}</span>
      </li>
    ),
  },

};
