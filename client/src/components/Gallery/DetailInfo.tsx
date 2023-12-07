import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

interface InfoProps {
  label: string;
  value: string | number | string[] | null;
}

const DetailInfo = ({ label, value }: InfoProps) => (
  <div className="flex items-center mt-5 text-gray-600 font-semibold">
    <span className="flex-shrink-0 w-[100px] min-w-[100px] whitespace-nowrap text-xs tabletLandscape:text-base">
      {label}
    </span>
    <span className="flex-grow flex-col whitespace-normal text-base tabletLandscape:text-lg overflow-hidden text-ellipsis text-left text-black ">
      {Array.isArray(value) ? (
        value.map((val, index) => <div key={index}>{val}</div>)
      ) : (
        <div>
          {typeof value === "string" ? (
            value.charAt(0) === "#" && value.length === 7 ? (
              <div
                style={{
                  width: "15px",
                  height: "15px",
                  backgroundColor: value,
                }}
              />
            ) : (
              <div className="whitespace-normal">
                {value}
                {label === "웹사이트" && value && (
                  <a href={value} target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faLink} />
                  </a>
                )}
              </div>
            )
          ) : (
            <div className="whitespace-normal">
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
