"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import AdminInfo from "../../src/components/AdminSettings/AdminInfo";

const Admin = () => {
  const { data: session } = useSession();

  console.log(session?.user);

  const logoutRouter = useRouter();

  useEffect(() => {
    if (!session) {
      logoutRouter.push("/");
    }
  }, [session, logoutRouter]);

  if (!session) {
    return (
      <div className="relative">
        <p className="fixed w-1/2 text-3xl font-bold top-1/2 left-1/2 h-1/2">
          로그인이 필요합니다.
          <p>
            <a href="/">메인페이지로</a>
          </p>
        </p>
      </div>
    );
  }

  //임시
  if (!session.user) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div className="p-2 text-4xl">
        <AdminInfo ClientInfo={session} />
      </div>
    </div>
  );
};

export default Admin;
