'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface IconProps {
  className?: string;
}

export default function PostHeartIcon({ className }: IconProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [isAnimate, setIsAnimate] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    setIsAnimate(true);
  };

  return (
    <motion.svg
      className={`${className}`}
      width="22"
      height="18"
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleClick}
      animate={{
        scaleX: [1, 0.8, 1.2, 0.85, 1],
        scaleY: [1, 1.2, 0.8, 1.2, 1],
      }}
      transition={{
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1],
      }}
      style={{ cursor: 'pointer' }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.6875 0C13.7516 0 12.0566 0.8325 11 2.23969C9.94344 0.8325 8.24844 0 6.3125 0C3.10384 0.00361657 0.503617 2.60384 0.5 5.8125C0.5 12.375 10.2303 17.6869 10.6447 17.9062C10.8665 18.0256 11.1335 18.0256 11.3553 17.9062C11.7697 17.6869 21.5 12.375 21.5 5.8125C21.4964 2.60384 18.8962 0.00361657 15.6875 0ZM11 16.3875C9.28813 15.39 2 10.8459 2 5.8125C2.0031 3.43206 3.93206 1.5031 6.3125 1.5C8.13594 1.5 9.66687 2.47125 10.3062 4.03125C10.4218 4.31259 10.6959 4.49627 11 4.49627C11.3041 4.49627 11.5782 4.31259 11.6938 4.03125C12.3331 2.46844 13.8641 1.5 15.6875 1.5C18.0679 1.5031 19.9969 3.43206 20 5.8125C20 10.8384 12.71 15.3891 11 16.3875Z"
      />
    </motion.svg>
  );
}
