import { Inter, JetBrains_Mono, Space_Grotesk, Caveat } from "next/font/google";
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

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

// Handwritten-style font used for the "signature" line in the About section
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  fallback: ["cursive"],
});

export const metadata = {
  metadataBase: new URL("https://udit004.github.io"),

  title: {
    default:
      "Udit Kumar Tiwari | Full Stack Developer | React | Next.js | AI Applications",
    template: "%s | Udit Kumar Tiwari",
  },

  description:
    "Portfolio of Udit Kumar Tiwari, Full Stack Developer specializing in React, Next.js, and AI Applications. Explore my projects, skills, and experience in web development.",

  keywords: [
    "Udit",
    "Udit Kumar Tiwari",
    "Udit Tiwari",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "AI Applications",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "Software Engineer",
    "JavaScript",
    "TypeScript",
  ],

  authors: [
    {
      name: "Udit Kumar Tiwari",
    },
  ],

  creator: "Udit Kumar Tiwari",

  publisher: "Udit Kumar Tiwari",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title:
      "Udit Kumar Tiwari | Full Stack Developer | React | Next.js",

    description:
      "Portfolio of Udit Kumar Tiwari, Full Stack Developer specializing in React, Next.js, and AI Applications.",

    url: "https://uditkrtiwari.vercel.app",

    siteName: "Udit Kumar Tiwari Portfolio",

    locale: "en_US",

    type: "profile",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Udit Kumar Tiwari Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Udit Kumar Tiwari | Full Stack Developer",
    description:
      "Portfolio of Udit Kumar Tiwari, Full Stack Developer specializing in React, Next.js, and AI Applications.",
    images: ["/og-image.png"],
  },

  alternates: {
    canonical: "https://uditkrtiwari.vercel.app",
  },
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
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${caveat.variable} antialiased font-sans`}>
        <ClientLayout>
          {children}
        </ClientLayout>

        <script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",

              name: "Udit Kumar Tiwari",

              alternateName: ["Udit", "Udit Tiwari"],

              url: "https://uditkrtiwari.vercel.app",

              jobTitle: "Full Stack Developer",

              description:
                "Portfolio of Udit Kumar Tiwari, Full Stack Developer specializing in React, Next.js, and AI Applications.",

              image:
                "https://uditkrtiwari.vercel.app/profile.jpg",

              knowsAbout: [
                "React",
                "Next.js",
                "AI Applications",
                "Web Development",
                "Full Stack Development",
                "JavaScript",
                "TypeScript",
              ],

              sameAs: [
                "https://github.com/Udit004",
                "https://www.linkedin.com/in/udit-kumar-tiwari/",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}