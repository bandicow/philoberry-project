import React from "react";
import LinkWithHover from "./LinkWithHover";

export const Mainpage = () => {
  const Photographer = "전세계";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-2xl text-white uppercase bg-black">
      <h1 className={"mb-5 font-bold"}>PhiloBerry studio</h1>
      <h1 className={"mb-5 f o nt-bold"}> X</h1>
      <h1 className={"mb-20 font-bold"}>{Photographer}</h1>
      <ul className="flex justify-between w-1/5 mt-10vh">
        <LinkWithHover href="/sale">goods shop</LinkWithHover>
        <LinkWithHover href="/gallery">gllery</LinkWithHover>
      </ul>
    </div>
  );
};

export default Mainpage;
