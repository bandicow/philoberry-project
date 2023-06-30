import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <div className="min-width-100%">
      <footer className="footer flex flex-1 py-1 border-t border-gray-300 justify-center items-center">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center flex-grow-1"
        >
          여기는 사업자정보같은 걸 넣을 예정
          <span className="logo h-4 mx-2">
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
