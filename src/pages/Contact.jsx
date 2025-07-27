import React, { useState, useRef } from "react";
import { Mail, Linkedin, Github, Instagram } from "lucide-react";
import emailjs from '@emailjs/browser';


const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: ""
  });
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: false });

    try {
      // Your original EmailJS integration code should go here:
      await emailjs.init("sgwTkyAAnVAbtOCgN");
      const result = await emailjs.sendForm(
        'service_3xe74tm',
        'template_1bjdsil',
        form.current,
        'sgwTkyAAnVAbtOCgN'
      );
      if (result.status === 200) {
        setStatus({ loading: false, success: true, error: false });
        setFormData({ user_name: "", user_email: "", message: "" });
      }
      
      // Simulated for demo - replace with above EmailJS code
    } catch (error) {
      setStatus({ loading: false, success: false, error: true });
      console.error('Error sending email:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const contactIcons = [
    {
      icon: Mail,
      href: "rajankumart266@gmial.com",
      label: "Gmail",
      color: "from-red-500 to-red-600",
      hoverColor: "hover:shadow-red-500/25"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/udit-kumar-tiwari-2b2a15216",
      label: "LinkedIn",
      color: "from-blue-600 to-blue-700",
      hoverColor: "hover:shadow-blue-500/25"
    },
    {
      icon: Github,
      href: "https://github.com/Udit004",
      label: "GitHub",
      color: "from-gray-700 to-gray-800",
      hoverColor: "hover:shadow-gray-500/25"
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/uditkumar_004/profilecard/?igsh=eXhmMGg5MjYweTR6",
      label: "Instagram",
      color: "from-pink-500 to-purple-600",
      hoverColor: "hover:shadow-pink-500/25"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Have a question or want to work together? Feel free to reach out!
            </p>
            
            {/* 3D Contact Icons */}
            <div className="flex justify-center gap-6 mb-8">
              {contactIcons.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    relative group p-4 rounded-2xl bg-gradient-to-br ${item.color}
                    shadow-lg shadow-black/10 hover:shadow-xl ${item.hoverColor}
                    transform-gpu transition-all duration-300 ease-out
                    hover:-translate-y-2 hover:scale-105 active:scale-95
                    before:absolute before:inset-0 before:rounded-2xl 
                    before:bg-gradient-to-br before:from-white/20 before:to-transparent
                    before:opacity-0 hover:before:opacity-100 before:transition-opacity
                    after:absolute after:inset-0 after:rounded-2xl
                    after:bg-gradient-to-t after:from-black/10 after:to-transparent
                  `}
                >
                  <div className="relative z-10 transform transition-transform duration-300 group-hover:scale-110">
                    <item.icon 
                      size={24} 
                      className="text-white drop-shadow-sm" 
                    />
                  </div>
                  
                  {/* 3D Base Effect */}
                  <div 
                    className={`
                      absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color}
                      transform translate-y-1 -z-10 opacity-40
                      transition-transform duration-300 group-hover:translate-y-2
                    `}
                  />
                  
                  {/* Tooltip */}
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-gray-800 dark:bg-gray-700 text-white text-sm px-3 py-1 rounded-lg shadow-lg whitespace-nowrap">
                      {item.label}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 dark:bg-gray-700 rotate-45"></div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
            <form ref={form} className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Name
                </label>
                <input
                  id="user_name"
                  name="user_name"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="John Doe"
                  value={formData.user_name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="user_email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  id="user_email"
                  name="user_email"
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="john@example.com"
                  value={formData.user_email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Your message here..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              {status.success && (
                <div className="p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 rounded-md">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {status.error && (
                <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-md">
                  Failed to send message. Please try again later.
                </div>
              )}

              <button
                type="submit"
                disabled={status.loading}
                className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                  status.loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {status.loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;