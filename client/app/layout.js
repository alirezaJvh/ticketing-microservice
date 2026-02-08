import 'bootstrap/dist/css/bootstrap.css';
import './globals.css';
import Header from '../components/header';
import { getCurrentUser } from '../api/get-current-user';

export default async function RootLayout({ children }) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body>
        <Header currentUser={currentUser} />
        <main className="container py-3">{children}</main>
      </body>
    </html>
  );
}
