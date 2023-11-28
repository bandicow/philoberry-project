"use client";
import Link from "next/link";
import { useEffect } from "react";

interface ErrorPlaceholderProps {
  error: Error;
}

export default function ErrorPlaceholder({ error }: ErrorPlaceholderProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <h1 className="text-4xl mb-2">Error</h1>
      <p className="text-xl mb-6">다시 시도해주세요.</p>
      <Link href="/" className="text-blue-500 underline">
        메인 페이지로 이동
      </Link>
    </div>
  );
}
