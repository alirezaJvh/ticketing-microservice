import { getCurrentUser } from '../api/get-current-user';

export default async function LandingPage() {
  const currentUser = await getCurrentUser();

  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
}
