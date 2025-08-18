import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  // 2. Vérifier le token
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return Response.json({ message: 'Invalid token' }, { status: 401 })
  }

  try {
    const body = await request.json()

    revalidatePath('/')

    const slug = body.slug?.current

    if (slug) {
      revalidatePath(`/actualites/${slug}`)
    }

    console.log('Routes revalidated, slug is', slug)

    return Response.json({ revalidated: true })
  } catch (err) {
    return Response.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
