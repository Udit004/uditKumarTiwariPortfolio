export const metadata = {
  title: "Blog & Technical Articles",
  description:
    "In-depth articles, tutorials, and insights on Full Stack Web Development, Next.js, React, Node.js, and Artificial Intelligence by Udit Kumar Tiwari.",
  alternates: {
    canonical: "https://udittiwari.in/blog",
  },
  openGraph: {
    title: "Blog & Technical Articles | Udit Kumar Tiwari",
    description:
      "In-depth articles, tutorials, and insights on Full Stack Web Development, Next.js, React, Node.js, and Artificial Intelligence by Udit Kumar Tiwari.",
    url: "https://udittiwari.in/blog",
    type: "website",
  },
};

export default function BlogLayout({ children }) {
  return <>{children}</>;
}
