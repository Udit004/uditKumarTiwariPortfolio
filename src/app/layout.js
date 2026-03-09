import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from './layout-client';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap", // Prevent font blocking
  fallback: ["system-ui", "sans-serif"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap", // Prevent font blocking
  fallback: ["monospace"],
});

export const metadata = {
  title: 'Udit Kumar Tiwari - Full Stack Developer',
  description: 'Portfolio of Udit Kumar Tiwari, Full Stack Developer specializing in React, Next.js, and AI Applications',
};

const themeScript = `
(function() {
  try {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Critical inline script to prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
          suppressHydrationWarning
        />
        {/* Preconnect to font services for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preconnect to CDN for icon loading */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}