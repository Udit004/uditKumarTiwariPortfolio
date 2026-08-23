"use client"
import ContactClient from './ContactClient';

// Server-friendly wrapper: owns the section shell, ambient background,
// and the static data that ContactClient renders.
const Contact = () => {
  const contactIcons = [
    {
      icon: "Mail",
      href: "mailto:rajankumart266@gmail.com",
      label: "Email",
      subtitle: "Let's write",
      gradient: "from-red-500 to-pink-500",
    },
    {
      icon: "Linkedin",
      href: "https://www.linkedin.com/in/udit-kumar-tiwari-2b2a15216",
      label: "LinkedIn",
      subtitle: "Let's connect",
      gradient: "from-blue-500 to-blue-700",
    },
    {
      icon: "Github",
      href: "https://github.com/Udit004",
      label: "GitHub",
      subtitle: "See my work",
      gradient: "from-gray-600 to-gray-800",
    },
    {
      icon: "Instagram",
      href: "https://www.instagram.com/uditkumar_004/profilecard/?igsh=eXhmMGg5MjYweTR6",
      label: "Instagram",
      subtitle: "Follow my journey",
      gradient: "from-pink-500 via-purple-500 to-orange-400",
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-16 sm:py-24 min-h-screen"
    >
      {/* Ambient glow — matches the floating orbs already defined in globals.css */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl animate-[float-slow_9s_ease-in-out_infinite]" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl animate-[float-slower_12s_ease-in-out_infinite]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <ContactClient contactIcons={contactIcons} />
        </div>
      </div>
    </section>
  );
};

export default Contact;