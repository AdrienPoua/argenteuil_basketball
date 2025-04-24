import { NextResponse } from 'next/server';
import { sanityFetch } from '@/integrations/sanity/fetch';
import { SanityDocument } from 'next-sanity';
import { POSTS_CLASSIC_QUERY } from '@/integrations/sanity/queries';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await sanityFetch<SanityDocument[]>({ query: POSTS_CLASSIC_QUERY });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching home Sanity posts:', error);
    return NextResponse.json({ error: 'Failed to fetch Sanity data' }, { status: 500 });
  }
}
