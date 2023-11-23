"use client";
import { useSession } from "next-auth/react";

import AdminInfo from "../../src/components/AdminSettings/AdminInfo";
import Loading from "../loading";
import withAdminAuth from "@/src/components/Auth/WithAdminAuth";

const Admin = () => {
  const { data: session } = useSession();

  console.log(session?.user);

  //임시
  if (!session) {
    return <Loading />;
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
