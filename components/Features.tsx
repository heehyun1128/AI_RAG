"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Features: React.FC = () => {
  return (
    <div className="bg-background text-text font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">AI-Powered Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            imageSrc="/images/temp.svg"
            title="Smart Insights"
            description="Get intelligent analysis of professor ratings and performance trends, helping you make informed decisions about your courses."
          />
          <FeatureCard
            imageSrc="/images/temp.svg"
            title="AI-Powered Reviews"
            description="Generate comprehensive professor reviews using AI, providing you with detailed insights into teaching styles and course content."
       
          />
          <FeatureCard
            imageSrc="/images/temp.svg"
            title="Personalized Recommendations"
            description="Receive tailored course and professor suggestions based on your academic goals, learning style, and past preferences."
          />
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ imageSrc, title, description }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      <div className="p-6">
        <div className="w-full h-48 relative mb-4">
          <Image
            src={imageSrc}
            alt={title}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
        <p className="text-center text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

export default Features;