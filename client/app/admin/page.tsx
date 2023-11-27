"use client";
import { useSession } from "next-auth/react";
import React from "react";
import AdminInfo from "../../src/components/AdminSettings/AdminInfo";
import Loading from "@/app/loading";
import withAdminAuth from "@/src/components/Auth/WithAdminAuth";
import { redirect } from "next/navigation";

const Admin = () => {
  const { data: session, status } = useSession();

  console.log(session?.user);

  if (status === "loading") {
    return <Loading />;
  }

  if (!session) {
    return redirect("/login");
  }

  return (
    <div>
      <div className="p-2 mt-10 text-4xl">
        <AdminInfo ClientInfo={session} />
      </div>
    </div>
  );
};

export default withAdminAuth(Admin);
