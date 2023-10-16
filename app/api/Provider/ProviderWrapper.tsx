"use client";

// 로그인 인증 관련 (next-auth with google, kakao, naver)

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import React from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function ProviderWrapper({ children }: ProvidersProps) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: { staleTime: 5000, refetchOnWindowFocus: false, retry: false },
      },
    })
  );

  return (
    <SessionProvider>
      <QueryClientProvider client={client}>
        {children} {/* Our entire app ->  has access to NextAuth*/}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
