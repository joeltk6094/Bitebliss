import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Aboutus = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0,1], ["0%" , "100%"])
  const textY = useTransform(scrollYProgress, [0,1], ["0%" , "300%"])


  return (
    <div
    ref={ref}
     className="w-full h-screen overflow-hidden relative grid place-items-center">
      <motion.h1 
      style={{y : textY}}
      className="font-bold text-white text-7xl md:text-9xl relative z-10 ">
        Delish!
      </motion.h1>

      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(/bg.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          y: backgroundY,
        }}
      ></motion.div>
      <div
        className="absolute inset-0 z-20"
        style={{
          backgroundImage: `url(/1.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      ></div>
      <div
        className="absolute inset-0 z-20"
        style={{
          backgroundImage: `url(/2.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      ></div>
      <div
        className="absolute inset-0 z-20"
        style={{
          backgroundImage: `url(/3.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      ></div>
      <div
        className="absolute inset-0 z-20"
        style={{
          backgroundImage: `url(/4.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      ></div>
      <div
        className="absolute inset-0 z-20"
        style={{
          backgroundImage: `url(/5.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
};

export default Aboutus;
