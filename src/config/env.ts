import { z } from "zod";

const parsedEnv = z.object({
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string(),
    NEXT_PUBLIC_SANITY_DATASET: z.string(),
    SANITY_API_READ_TOKEN: z.string(),
    GITHUB_SECRET: z.string(),
    ADMIN_GITHUB_EMAIL: z.string(),
    NEXTAUTH_SECRET: z.string(),
    NEXTAUTH_URL: z.string(),
    CLUB_EMAIL: z.string(),
    GITHUB_ID: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    MAILGUN_API_KEY: z.string(),
    EMAIL_HOST: z.string(),
    EMAIL_PORT: z.string(),
    EMAIL_USER: z.string(),
    NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: z.string(),
    IMAGEKIT_PRIVATE_KEY: z.string(),
    NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: z.string(),
    FFBB_SERVER_USERNAME: z.string(),
    FFBB_SERVER_PASSWORD: z.string(),       
    FFBB_SERVER_API: z.string()
});

export const { 
    NEXT_PUBLIC_SANITY_PROJECT_ID,    
    NEXT_PUBLIC_SANITY_DATASET,
    SANITY_API_READ_TOKEN,
    GITHUB_SECRET,
    ADMIN_GITHUB_EMAIL,
    NEXTAUTH_SECRET,
    NEXTAUTH_URL,
    CLUB_EMAIL,
    GITHUB_ID,
    DB_USER,
    DB_PASSWORD,
    MAILGUN_API_KEY,
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_PRIVATE_KEY,
    NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
    FFBB_SERVER_USERNAME,
    FFBB_SERVER_PASSWORD,
    FFBB_SERVER_API
} = parsedEnv.parse(process.env);
