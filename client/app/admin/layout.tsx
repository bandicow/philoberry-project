"use client";
import withAdminAuth from "@/src/components/Auth/WithAdminAuth";
import Sidebar from "../../src/components/layout/Sidebar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[100vh] w-full">
      <Sidebar />
      <div className="w-full min-h-full p-1 tabletLandscape:pl-72">
        {children}
      </div>
    </div>
  );
}

export default withAdminAuth(Layout);
