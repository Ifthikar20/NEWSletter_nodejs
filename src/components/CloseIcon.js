import { motion } from "framer-motion";
import React from "react";

// Reusable Close Icon component with animation using framer-motion
const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }} // Animation when the icon appears
      animate={{ opacity: 1 }}  // Animation while the icon is present
      exit={{ opacity: 0 }}     // Animation when the icon disappears
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6L6 18" />  {/* Diagonal line from top-right to bottom-left */}
      <path d="M6 6l12 12" />  {/* Diagonal line from top-left to bottom-right */}
    </motion.svg>
  );
};

export default CloseIcon;
