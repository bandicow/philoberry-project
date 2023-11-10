"use client";

// import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      className="
      h-[100vh]
      flex 
      flex-col 
      justify-center 
      items-center 
      "
    >
      <div className="flex items-center justify-center">
        <div className="w-20 h-20 mb-5 border-t-2 border-b-2 border-purple-500 rounded-full animate-spin"></div>
      </div>
      <div className="text-4xl reflect">
        <div>Loading...</div>
      </div>
    </div>
  );
};

export default Loader;
