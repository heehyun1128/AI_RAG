"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.footer
      className="bg-gradient-to-b from-[#11266b] to-[#00013F] text-white font-sans"
      id="footer"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 lg:gap-24">
          <motion.div className="text-center md:text-left" variants={itemVariants}>
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-4 tracking-tight"
              variants={itemVariants}
            >
              Discover Your
              <br />
              Perfect Professor
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg mt-4 tracking-tight"
              variants={itemVariants}
            >
              Garry helps you make informed decisions about your education.
            </motion.p>
            <Link href="/sign-up" passHref>
              <Button className="mt-6" variant="secondary">Get Started</Button>
            </Link>
          </motion.div>
          <motion.div className="text-center md:text-left" variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <motion.li whileHover={{ scale: 1.05 }}><Link href="/about">About Us</Link></motion.li>
              <motion.li whileHover={{ scale: 1.05 }}><Link href="/faq">FAQ</Link></motion.li>
              <motion.li whileHover={{ scale: 1.05 }}><Link href="/contact">Contact</Link></motion.li>
              <motion.li whileHover={{ scale: 1.05 }}><Link href="/privacy">Privacy Policy</Link></motion.li>
            </ul>
          </motion.div>
          <motion.div className="text-center md:text-left" variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4">Stay Connected</h3>
            <p className="mb-4">Follow us for the latest updates and professor insights!</p>
            <ul className="flex justify-center md:justify-start space-x-4">
              <motion.li whileHover={{ scale: 1.1 }}>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="text-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                    <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                    <path d="M15 20V8"></path>
                    <path d="M9 20v-8"></path>
                  </svg>
                </a>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
              </motion.li>
            </ul>
          </motion.div>
        </div>
        <motion.div 
          className="mt-16 pt-8 border-t border-white/20 text-center"
          variants={itemVariants}
        >
          <p>&copy; {new Date().getFullYear()} Garry. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;