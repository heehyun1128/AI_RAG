"use client";
import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import Loader from "@/components/loader";
import { AnimatePresence, motion } from "framer-motion";

type Message = {
  role: string;
  content: string;
};

const ProfessorPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isChatting, setIsChatting] = useState<boolean>(false);

  const searchProfessor = async () => {
    try {
      setMessages((messages) => [
        ...messages,
        { role: "user", content: searchTerm }
      ]);
      setLoading(true);
      setSearchTerm("");
      setIsChatting(true);

      let endpoint = "/api/chat";
      let payload;

      // Check if the searchTerm is a URL
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      const isUrl = urlPattern.test(searchTerm);

      if (isUrl) {
        endpoint = "/api/scrape";
        payload = JSON.stringify({ url: searchTerm });
      } else {
        payload = JSON.stringify([...messages, { role: "user", content: searchTerm }]);
      }

      const res = await axios.post(endpoint, payload);
      setMessages((messages) => [
        ...messages,
        { role: "assistant", content: res.data },
      ]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data from the server:", error);
      setLoading(false);
    }
  };

  return (
    <main className="professor-page" style={{ opacity: 1, willChange: 'auto' }}>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 my-40a" style={{ willChange: 'auto', transform: 'none' }}>
        <header className="" style={{ opacity: 1, willChange: 'auto', transform: 'none' }}>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 tracking-tight leading-relaxed" style={{ opacity: 1, willChange: 'auto', transform: 'none' }}>
            <span className="text-primary ">Welcome!</span><br className="hidden sm:block" />
            <span className="text-secondary">Discover insights on your professors by entering their name below.</span>
          </h1>
          <p className="text-base sm:text-lg text-secondary tracking-tight leading-relaxed" style={{ opacity: 1, willChange: 'auto', transform: 'none' }}>
            Use one of our example prompts to get a feel for the product.
          </p>
        </header>
        <form onSubmit={(e) => { e.preventDefault(); searchProfessor(); }} className="search-form mt-16 bg-primary rounded-lg px-4 py-3 relative animate-fadeIn" style={{ opacity: 1, willChange: 'auto', transform: 'none' }}>
          <label htmlFor="professor-search" className="sr-only">Search for a professor</label>
          <input
            id="professor-search"
            className="w-[95%] bg-primary text-gray-400 placeholder-gray-400 rounded-lg px-2 py-2 pr-10 focus:ring-0 focus:outline-none focus:text-white"
            placeholder="Enter professor's name or paste a RateMyProfessors URL"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="absolute inset-y-0 right-0 flex items-center justify-center py-1 px-4 bg-white rounded-lg shadow-md ml-6 mr-2 my-2 transition-all duration-300 ease-in-out hover:bg-secondary hover:text-white">
            <svg className="h-5 w-5 text-primary transition-all duration-300 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>
        {isChatting && (
          <div className="mt-8">
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
        )}
      </section>
    </main>
  );
};

export default ProfessorPage;