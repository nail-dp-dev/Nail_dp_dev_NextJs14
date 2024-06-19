"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import HeartIcon from "../../public/assets/svg/heart.svg";

export default function HeartButton() {
  const [isClick, setIsClick] = useState(false);
  const [isAnimate, setIsAnimate] = useState(false);
  const [isfillRule, setIsfillRule] = useState("evenodd")

  const handleClick = () => {
    setIsClick(!isClick);
    setIsAnimate(true); 
    setTimeout(() =>{
      setIsfillRule(isClick ? "evenodd":"nonzero")
    },300)
  };

  return (
    <div className="w-[21px] h-[18px]">
      <motion.div
        transition={{ duration: 0.5 }}
        animate={isAnimate ? {
                scaleX: isClick ? [1, 0.8, 1, 1, 1]:[1, 0.9, 1, 1, 1],
                scaleY: isClick ? [1, 1, 1.2, 0.9, 1]:[1, 1, 1.2, 0.8, 1]
              }:{}
        }
        onClick={() => handleClick()}
        style={{
          cursor: "pointer",
        }}
      >
        <HeartIcon fillRule={isfillRule} />
      </motion.div>
    </div>
  );
}