import { cookies } from 'next/headers';

export const getSessionCookie = () => {
  const cookieStore = cookies();
  const productionCookie = cookieStore.get('__Secure-next-auth.session-token');
  const developmentCookie = cookieStore.get('next-auth.session-token');
  const nextAuthCookie = productionCookie || developmentCookie;

  if (!nextAuthCookie) throw new Error('No session token cookie found (neither production nor development)');

  return nextAuthCookie;
}; 