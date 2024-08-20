"use client";
import { motion } from "framer-motion";
// import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { headerAnimationProps } from "@/lib/motion";

const Navbar: React.FC = () => {
  return (
    <header className="container mx-auto mt-5 px-6 py-8 flex items-center justify-between relative z-10">
      <motion.div
        {...headerAnimationProps}
        className="text-charcoal-black flex items-center"
      >
        <Link href="/" className="text-2xl font-regular tracking-tight">
          Garry
        </Link>
      </motion.div>
      <motion.div 
        className="flex items-center space-x-4"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.5
            }
          }}
        >
          <Link href="#learn-more" className="font-medium text-charcoal-black hover:text-deep-orange transition-colors">
            Learn More
          </Link>
        </motion.div>
        {/* SignedOut and SignedIn components commented out
        <SignedOut>
          <Link href="/sign-in" passHref>
            <Button variant="secondary">Log in / Sign up</Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        */}
      </motion.div>
    </header>
  );
};

export default Navbar;