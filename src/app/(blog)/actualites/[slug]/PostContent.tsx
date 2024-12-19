"use client"
import { SanityDocument } from "next-sanity"
import { PortableText } from "@portabletext/react"
import { components } from "./PortableText"
import { cn } from "@/utils/cn"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import Link from "next/link"
import { motion } from "motion/react"
import { estimateReadingTime } from "@/utils/estimateReadingTime"

interface PostContentProps {
    data: SanityDocument
}

export function PostContent({ data }: Readonly<PostContentProps>) {
    const readingTime = estimateReadingTime(data.body)

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn("flex flex-col items-center", "container mx-auto px-4 md:px-0")}
        >
            <section className="w-full mb-12 relative">
                <Button
                    asChild
                    className="absolute top-0 left-0 text-primary hover:text-primary-dark transition-colors duration-200"
                    variant="ghost"
                >
                    <Link href="/">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Retour 
                    </Link>
                </Button>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-4xl md:text-5xl font-bold text-background mt-16 mb-4 text-center"
                >
                    {data.title}
                </motion.h1>
                <div className="flex justify-center items-center space-x-4 text-muted-foreground">
                    <time
                        className="flex items-center"
                        dateTime={data.publishedAt}
                    >
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(data.publishedAt).toLocaleDateString()}
                    </time>
                    <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {readingTime} min de lecture
                    </span>
                </div>
            </section>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className={cn(
                    "prose prose-lg md:prose-xl dark:prose-invert",
                    "max-w-none w-full md:w-4/5 lg:w-3/4",
                    "bg-card text-card-foreground shadow-lg rounded-lg p-6 md:p-10"
                )}
            >
                <PortableText value={data.body} components={components} />
            </motion.div>
        </motion.article>
    )
}

