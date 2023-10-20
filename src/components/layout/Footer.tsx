import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <div>
      <footer>
        <div className="flex justify-center w-full text-center md:w-2/6">
          <div className="w-auto pl-3 pr-3 border-r border-r-gray-600">
            ©2023 PB All Rights Reserved
          </div>
          <div className="w-auto pl-3 pr-3 text-center">
            <a href="https://www.instagram.com/" target="_blank" rel="test" />
            Instaram
          </div>
        </div>

        <div className="w-full md:w-4/6">
          <p>Business Licence 123-45-67890 CEO Jeon | TEL. 062-123-4567</p>
          <p> office Gangsan-gu, Gwangju, Republic of Korea</p>
        </div>
      </footer>
    </div>
  );
}
