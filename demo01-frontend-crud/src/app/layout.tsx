'use client';
import AppHeader from '@/components/app.header';
import './globals.css';
import { Inter } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppFooter from '@/components/app.footer';
import Container from 'react-bootstrap/Container';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Container fluid className="d-flex flex-column min-vh-100">
          <AppHeader />
          <Container as="main" className="flex-grow-1 my-3">
            {children}
          </Container>
          <AppFooter />
        </Container>
        <ToastContainer></ToastContainer>
      </body>
    </html>
  );
}
