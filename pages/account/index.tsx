"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ClientAccount from "../../src/components/ClientAccout/ClientAccount";

const Account = () => {
  const { data: session } = useSession();

  const logoutRouter = useRouter();

  useEffect(() => {
    if (!session) {
      logoutRouter.push("/");
    }
  }, [session, logoutRouter]);

  if (!session) {
    return (
      <div>
        로그인이 필요합니다. <a href="/">메인페이지로</a>
      </div>
    );
  }

  //임시
  if (!session.user) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div className="text-4xl">
        <ClientAccount ClientInfo={session} />
      </div>
    </div>
  );
};

export default Account;
