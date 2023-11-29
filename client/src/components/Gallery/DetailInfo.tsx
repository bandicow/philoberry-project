import React from "react";

interface InfoProps {
  label: string;
  value: string | number | string[] | null;
}

const DetailInfo = ({ label, value }: InfoProps) => (
  <div className="flex mt-5 text-gray-600">
    <span className="w-1/4 text-xs tabletLandscape:text-base">{label}</span>
    <span className="flex-col ml-5 text-lg  text-left text-black ">
      {Array.isArray(value) ? (
        value.map((val, index) => <div key={index}>{val}</div>)
      ) : (
        <div>
          {typeof value === "string" ? (
            <div className="">{value}</div>
          ) : (
            <div>
              {label === "가격" && value !== null
                ? value.toLocaleString() + " 원"
                : ""}
            </div>
          )}
        </div>
      )}
    </span>
  </div>
);

export default DetailInfo;
