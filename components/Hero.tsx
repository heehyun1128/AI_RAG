"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import Loader from "@/components/loader";

type Message = {
  role: string;
  content: string;
};


const Hero: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isChatting, setIsChatting]=useState<boolean>(false)

  const searchProfessor = async () => {
    try {
      setMessages((messages) => [
        ...messages,
        { role: "user", content: searchTerm }
      ]);
      setLoading(true);
      setSearchTerm("")
      setIsChatting(true)
      // Sending chat history to the server
      const res = await axios.post(
        "/api/chat",
        JSON.stringify([...messages, { role: "user", content: searchTerm }])
      );
      console.log(res);
      // Assuming the API response contains the assistant's response
      const { data } = res;

      // Update the messages state with the assistant's response
     
      setMessages((messages) => [
        ...messages,
       
        { role: "assistant", content: res.data }, // Adjust this line according to your API response structure
      ]);
      setLoading(false);
      
    } catch (error) {
      console.error("Error fetching data from the server:", error);
    }
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 text-center relative z-10 text-default">
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-[42px] sm:text-[64px] md:text-[74px] lg:text-[96px] font-extrabold leading-[1.1] mb-4 text-primary text-center tracking-tighter"
      >
        AI-Powered Insights for
        <br />
        your{" "}
        <span className="relative inline-block">
          <span className="absolute inset-0 bg-deep-orange opacity-50 transform h-[40%] translate-y-[150%]"></span>
          <span className="relative">professors</span>
        </span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-primary text-[13px] sm:text-lg md:text-xl mt-4 sm:mt-6 text-center tracking-tight px-4 sm:px-0"
      >
        Revolutionize your course selection with AI-powered professor ratings.
        Comprehensive,{" "}
        <span className="sm:hidden">
          <br />
        </span>
        data-driven, and presented in a sleek, intuitive interface.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-12 flex justify-center"
      >
        <div className="relative w-full max-w-2xl">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search for a professor..."
            className="w-full py-3 px-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Button
            onClick={searchProfessor}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full"
            size="icon"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </Button>
        </div>
      </motion.div>
      <div>
      <AnimatePresence>
          {messages.map((chat, index) => (
            <motion.div
              key={index}
              className={`my-2 flex ${
                chat?.role === "user" ? "justify-end" : "justify-start"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className={`p-3 rounded-2xl ${
                  chat?.role === "user"
                    ? "bg-purple-500 text-white"
                    : "bg-white shadow-purple-300"
                } shadow-md max-w-[90%] break-words`}
              >
                <strong>{chat?.role === "user" ? "You: " : "Garry: "}</strong>{" "}
                {chat?.role === "user" ? (
                  chat?.content
                ) : (
                  <ReactMarkdown className="prose prose-sm max-w-none overflow-hidden">
                    {chat?.content}
                  </ReactMarkdown>
                )}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader />
          </motion.div>
        )}
</div>

   {!isChatting &&  <div >
       {/* Hero Image */}
       <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-12 sm:mt-20 p-2 bg-white bg-opacity-60 rounded-3xl shadow-6xl relative overflow-hidden backdrop-filter backdrop-blur-3xl"
        style={{
          boxShadow: "0 0 50px 2px rgba(17, 38, 107, 0.6)",
        }}
      >
        <div className="absolute inset-0 bg-primary opacity-30 filter blur-3xl"></div>
        <video
          src="https://videos.pexels.com/video-files/25744128/11904108_2560_1440_24fps.mp4"
          width={1200}
          height={600}
          autoPlay
          loop
          muted
          playsInline
          className="rounded-2xl relative z-10 w-full h-auto object-cover"
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-charcoal-black text-base sm:text-lg mt-6"
      >
        Harnessing advanced AI to generate comprehensive professor evaluations
        from student feedback, optimizing your course selection process.
      </motion.p>
     </div>}
    </main>
  );
};

export default Hero;
