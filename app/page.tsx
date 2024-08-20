"use client";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export default function Home() {

  return (
    <div className="bg-transparent text-default font-sans min-h-screen overflow-hidden relative py-8">
      <Hero />
      {/* <Features />   */}
    </div>
  );
}