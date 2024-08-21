
import { motion } from "framer-motion";

export default function Loader() {
  const dotVariants = {
    animate: (index: number) => ({
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0.1,
        delay: index * 0.2 // Stagger the animation for each dot
      }
    })
  };

  return (
    <div className="flex items-center justify-center space-x-2" style={{width:"400px", height:"80px"}}>
      <strong className="text-lg mr-2">Finding the professors for you</strong>
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          className="rounded-full"
          variants={dotVariants}
          animate="animate"
          style={{
            backgroundColor: "#718096",
            width: "8px",
            height: "8px"
          }}
          custom={index}
        />
      ))}
    </div>
  );
}
