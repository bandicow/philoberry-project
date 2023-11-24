"use client";

import Image from "next/image";
import googleLogo from "@/public/images/google.png";
import kakaologo from "@/public/images/kakao.png";
import { signIn } from "next-auth/react";

const isProduction = process.env.NODE_ENV === "production";
const serverUrl = isProduction
  ? process.env.NEXTAUTH_URL
  : "http://localhost:3000";

export function GoogleSignInButton() {
  const handleClick = () => {
    signIn("google", { callbackUrl: `${serverUrl}` });
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center w-full px-6 mt-4 text-sm tabletLandscape:text-xl font-semibold text-black transition-colors duration-300 bg-white border-2 border-black rounded-lg h-14 focus:shadow-outline hover:bg-slate-200"
    >
      <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
      <span className="ml-4">Continue with Google</span>
    </button>
  );
}

export function KaKaoSignInButton() {
  const handleClick = () => {
    signIn("kakao");
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center w-full px-6 mt-4 text-sm tabletLandscape:text-xl font-semibold text-black transition-colors duration-300 bg-white border-2 border-black rounded-lg justify-left h-14 focus:shadow-outline hover:bg-slate-200"
    >
      <Image
        src={kakaologo}
        alt="Kakao Logo"
        width={20}
        height={20}
        className="rounded-md"
      />
      <span className="ml-4">Continue with kakao</span>
    </button>
  );
}

export function CredentialsSignInButton() {
  const handleClick = () => {
    signIn();
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center w-full px-6 mt-4 text-xl font-semibold text-black transition-colors duration-300 bg-white border-2 border-black rounded-lg h-14 focus:shadow-outline hover:bg-slate-200"
    >
      {/* <Image src={githubLogo} alt="Github Logo" width={20} height={20} /> */}
      <span className="ml-4">Continue with Email</span>
    </button>
  );
}
