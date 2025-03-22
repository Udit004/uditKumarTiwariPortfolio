import React from "react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const Contact = () => {
    return (
      <section
        id="contact"
        className="py-20 px-6 bg-gradient-to-br from-purple-600 to-blue-600 dark:from-gray-800 dark:to-gray-900 font-['Poppins']"
      >
        <div className="container mx-auto text-center">
          {/* Contact Heading */}
          <motion.h3
            className="text-4xl font-extrabold text-white mb-10 tracking-wide"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Contact Me
          </motion.h3>
  
          {/* Contact Form */}
          <motion.form
            action="https://formsubmit.co/rajankumart266@gmail.com"
            method="POST"
            className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Hidden Inputs for FormSubmit */}
            <input type="hidden" name="_captcha" value="false" />
            {/* console.log("Form submitted"); */}
  
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                required
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className="w-full py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-700 dark:hover:bg-blue-400 transition transform hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
            >
              Send Message
            </motion.button>
          </motion.form>
  
          {/* Icon Links */}
          <motion.div
            className="flex justify-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Gmail
            <a
              href="mailto:your-email@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform transform hover:scale-110"
            >
              <img
                src="https://img.icons8.com/?size=100&id=eFPBXQop6V2m&format=png&color=000000"
                alt="Gmail"
                className="w-14 h-14"
              />
            </a> */}
  
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/udit-kumar-tiwari-2b2a15216"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform transform hover:scale-110"
            >
              <img
                src="https://img1.cgtrader.com/items/3529042/8450841eee/linkedin-icon-3d-model-low-poly-obj.jpg"
                alt="LinkedIn"
                className="w-14 h-14"
              />
            </a>
  
            {/* GitHub */}
            <a
              href="https://github.com/Udit004"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform transform hover:scale-110"
            >
              <img
                src="https://img.icons8.com/?size=100&id=efFfwotdkiU5&format=png&color=000000"
                alt="GitHub"
                className="w-14 h-14"
              />
            </a>
  
            {/* Instagram */}
            <a
              href="https://www.instagram.com/uditkumar_004/?igsh=eXhmMGg5MjYweTR6#"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform transform hover:scale-110"
            >
              <img
                src="https://img.icons8.com/?size=100&id=nj0Uj45LGUYh&format=png&color=000000"
                alt="Instagram"
                className="w-14 h-14"
              />
            </a>
          </motion.div>
        </div>
      </section>
    );
  };
  
  export default Contact;