"use client";
import React from "react";

interface InfoProps {
  label: string;
  value: string | number | string[] | null;
}

const DetailInfo = ({ label, value }: InfoProps) => (
  <div className="flex mt-5 text-gray-600">
    <span className="w-1/4 text-xs tablet:text-sm desktop:text-base">
      {label}
    </span>
    <span className="flex-col ml-5 text-lg font-bold text-left text-black ">
      {Array.isArray(value) ? (
        value.map((val, index) => <div key={index}>{val}</div>)
      ) : (
        <div>{value}</div>
      )}
    </span>
  </div>
);

export default DetailInfo;
