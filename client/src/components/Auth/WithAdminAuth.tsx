import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ComponentType, useEffect } from "react";
import Loading from "@/app/loading";

export default function withAdminAuth<P extends object>(
  Component: ComponentType<P>
) {
  return function AdminAuthComponent(props: P) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "authenticated" && !session) {
        router.push("/login");
      } else if (session?.user.role !== "admin") {
        router.push("/");
      }
    }, [status, session, router]);

    if (status === "loading") {
      return <Loading />;
    }

    return <Component {...props} />;
  };
}
