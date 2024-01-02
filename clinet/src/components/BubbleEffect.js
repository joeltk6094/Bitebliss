import React from "react";

const BubbleEffect = () => {
  return (
    <div className="grid px-5 py-14 place-content-center bg-white">
      <BubbleText />
    </div>
  );
};

const BubbleText = () => {
  return (
    <h2 className="text-center text-7xl font-thin text-indigo-300">
      {"About Us".split("").map((child, idx) => (
        <span
          className="transition duration-350 hover:font-bold hover:text-gray-300"
          key={idx}
        >
          {child}
        </span>
      ))}
    </h2>
  );
};

export default BubbleEffect;
