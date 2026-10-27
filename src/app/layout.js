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
  display: "swap",
  fallback: ["cursive"],
});

export const metadata = {
  metadataBase: new URL("https://udittiwari.in"),

  title: {
    default: "Udit Kumar Tiwari | Full Stack Developer & AI Specialist",
    template: "%s | Udit Kumar Tiwari",
  },

  description:
    "Official portfolio of Udit Kumar Tiwari, Full Stack Developer specializing in React, Next.js & AI applications. Explore projects, tech stack & experience.",

  keywords: [
    "Udit Kumar Tiwari",
    "Udit Tiwari",
    "Udit",
    "udittiwari.in",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "AI Specialist",
    "AI Applications Developer",
    "Software Engineer Portfolio",
    "Frontend Developer",
    "Backend Developer",
    "MERN Stack Developer",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Tailwind CSS",
    "Web Developer India"
  ],

  authors: [
    {
      name: "Udit Kumar Tiwari",
      url: "https://udittiwari.in",
    },
  ],

  creator: "Udit Kumar Tiwari",
  publisher: "Udit Kumar Tiwari",

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },

  manifest: "/manifest.json",

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
    title: "Udit Kumar Tiwari | Full Stack Developer & AI Specialist",
    description:
      "Official portfolio of Udit Kumar Tiwari, Full Stack Developer specializing in React, Next.js & AI applications. Explore projects, tech stack & experience.",
    url: "https://udittiwari.in",
    siteName: "Udit Kumar Tiwari",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://udittiwari.in/og-image.jpg",
        secureUrl: "https://udittiwari.in/og-image.jpg",
        width: 1200,
        height: 1200,
        type: "image/jpeg",
        alt: "Udit Kumar Tiwari - Full Stack Developer & AI Specialist",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Udit Kumar Tiwari | Full Stack Developer & AI Specialist",
    description:
      "Official portfolio of Udit Kumar Tiwari, Full Stack Developer specializing in React, Next.js & AI applications.",
    images: ["https://udittiwari.in/og-image.jpg"],
    creator: "@uditkrtiwari",
  },

  alternates: {
    canonical: "https://udittiwari.in",
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
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://udittiwari.in/#website",
        "url": "https://udittiwari.in/",
        "name": "Udit Kumar Tiwari",
        "alternateName": [
          "Udit Tiwari",
          "Udit Kumar Tiwari Portfolio"
        ],
        "description": "Official portfolio of Udit Kumar Tiwari, Full Stack Developer & AI Specialist.",
        "publisher": {
          "@id": "https://udittiwari.in/#person"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "Person",
        "@id": "https://udittiwari.in/#person",
        "name": "Udit Kumar Tiwari",
        "alternateName": ["Udit", "Udit Tiwari", "uditkrtiwari"],
        "url": "https://udittiwari.in",
        "image": {
          "@type": "ImageObject",
          "@id": "https://udittiwari.in/#personImage",
          "url": "https://udittiwari.in/assets/udit-kumar-tiwari.jpg",
          "contentUrl": "https://udittiwari.in/assets/udit-kumar-tiwari.jpg",
          "caption": "Udit Kumar Tiwari - Full Stack Developer & AI Specialist",
          "width": 1200,
          "height": 1200
        },
        "jobTitle": "Full Stack Developer & AI Specialist",
        "description": "Full Stack Developer specializing in React, Next.js, and AI-powered web applications.",
        "sameAs": [
          "https://github.com/Udit004",
          "https://www.linkedin.com/in/udit-kumar-tiwari/"
        ],
        "knowsAbout": [
          "React.js",
          "Next.js",
          "Node.js",
          "Full Stack Development",
          "Artificial Intelligence Applications",
          "Web Architecture",
          "JavaScript",
          "TypeScript",
          "Tailwind CSS"
        ]
      },
      {
        "@type": "ProfilePage",
        "@id": "https://udittiwari.in/#profilepage",
        "url": "https://udittiwari.in/",
        "name": "Udit Kumar Tiwari — Full Stack Developer & AI Specialist Portfolio",
        "isPartOf": {
          "@id": "https://udittiwari.in/#website"
        },
        "mainEntity": {
          "@id": "https://udittiwari.in/#person"
        },
        "primaryImageOfPage": {
          "@id": "https://udittiwari.in/#personImage"
        }
      }
    ]
  };

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

        {/* WhatsApp & Social Open Graph direct tags */}
        <meta property="og:site_name" content="Udit Kumar Tiwari" />
        <meta property="og:image" content="https://udittiwari.in/og-image.jpg" />
        <meta property="og:image:secure_url" content="https://udittiwari.in/og-image.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="1200" />
        <meta property="og:image:alt" content="Udit Kumar Tiwari - Full Stack Developer & AI Specialist" />
        <link rel="image_src" href="https://udittiwari.in/og-image.jpg" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${caveat.variable} antialiased font-sans`}>
        <ClientLayout>
          {children}
        </ClientLayout>

        <script
          id="structured-data-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </body>
    </html>
  );
}