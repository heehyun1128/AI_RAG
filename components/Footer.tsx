"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

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
            <Link href="/" passHref>
              <Button className="mt-6" variant="secondary">Get Started</Button>
            </Link>
          </motion.div>
          <motion.div className="text-center md:text-left" variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <motion.li whileHover={{ scale: 1.05 }}><Link href="/">About Us</Link></motion.li>
              <motion.li whileHover={{ scale: 1.05 }}><Link href="/">FAQ</Link></motion.li>
              <motion.li whileHover={{ scale: 1.05 }}><Link href="/">Contact</Link></motion.li>
              <motion.li whileHover={{ scale: 1.05 }}><Link href="/">Privacy Policy</Link></motion.li>
            </ul>
          </motion.div>
          <motion.div className="text-center md:text-left" variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4">Stay Connected</h3>
            <p className="mb-4">Follow us for the latest updates and professor insights!</p>
            <ul className="flex justify-center md:justify-start space-x-4">
              <motion.li whileHover={{ scale: 1.1 }}>
                <a href="/" target="_blank" rel="noopener noreferrer" className="text-2xl">
                  <FaInstagram />
                </a>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <a href="/" target="_blank" rel="noopener noreferrer" className="text-2xl">
                  <FaTiktok />
                </a>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <a href="/" target="_blank" rel="noopener noreferrer" className="text-2xl">
                  <FaXTwitter />
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