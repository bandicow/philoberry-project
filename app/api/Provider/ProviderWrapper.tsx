"use client";

// 로그인 인증 관련 (next-auth with google, kakao, naver)

import { QueryClient, QueryClientProvider } from "react-query";

import { SessionProvider } from "next-auth/react";

export default function ProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children} {/* Our entire app ->  has access to NextAuth*/}
      </QueryClientProvider>
    </SessionProvider>
  );
}
