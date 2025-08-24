import React from 'react';
import ClientLayout from './layout'; // Import the client layout
import Navbar from '../components/helperComponents/Navbar';

export const metadata = {
  title: "Udit Kumar Tiwari - Full Stack Developer",
  description: "Portfolio of Udit Kumar Tiwari, a passionate Full Stack Developer specializing in React, Next.js, and modern web technologies.",
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          <Navbar />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
} 