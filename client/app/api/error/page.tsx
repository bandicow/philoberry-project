// app/api/error/page.server.tsx
"use client";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <h1 className="text-4xl mb-2">로그인 에러</h1>
      <p className="text-xl mb-6">로그인에 실패했습니다. 다시 시도해주세요.</p>
      <Link href="/login" className="text-blue-500 underline">
        로그인 페이지로 이동
      </Link>
    </div>
  );
};

export default ErrorPage;
