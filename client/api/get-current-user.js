import { headers } from 'next/headers';
import buildClient from './build-client';

export async function getCurrentUser() {
  try {
    const requestHeaders = Object.fromEntries((await headers()).entries());
    const client = buildClient({ headers: requestHeaders });
    const { data } = await client.get('/api/users/currentuser');
    return data.currentUser || null;
  } catch {
    return null;
  }
}
