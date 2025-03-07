import { authOptions } from '@/integrations/nextAuth/auth';
import { getServerSession } from 'next-auth';

export async function validateUser() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Unauthorized', { cause: { status: 401 } });
}
