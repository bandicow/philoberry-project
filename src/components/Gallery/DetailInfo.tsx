import React from "react";

interface InfoProps {
  label: string;
  value: string | number | string[] | null;
}

const DetailInfo = ({ label, value }: InfoProps) => (
  <div className="flex mt-5 text-gray-600">
    <span className="w-1/4 ">{label}</span>
    <span className="flex-col ml-5 text-lg font-bold text-left text-black ">
      {Array.isArray(value) ? (
        value.map((val, index) => <p key={index}>{val}</p>)
      ) : (
        <p>{value}</p>
      )}
    </span>
  </div>
);

export default DetailInfo;
