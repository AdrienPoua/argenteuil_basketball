import { NextResponse } from 'next/server';
import { sanityFetch } from '@/integrations/sanity/fetch';
import { SanityDocument } from 'next-sanity';
import { POST_HOME_LEFT_QUERY } from '@/integrations/sanity/queries';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await sanityFetch<SanityDocument>({ query: POST_HOME_LEFT_QUERY });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching left Sanity post:', error);
    return NextResponse.json({ error: 'Failed to fetch Sanity data' }, { status: 500 });
  }
}
