import React from "react";

type IsSoldProps = {
  sold: boolean;
};

export default function IsSold({ sold }: IsSoldProps) {
  return (
    <div>
      {sold ? (
        <p className="text-3xl font-extrabold text-pink-800">판매완료</p>
      ) : (
        <p className="text-3xl font-extrabold text-sky-800">판매중</p>
      )}
    </div>
  );
}
