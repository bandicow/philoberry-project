import Loading from "@/app/loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ComponentType, PropsWithChildren, useEffect } from "react";

export default function withAdminAuth<P extends object>(
  Component: ComponentType<P>
) {
  return function AdminAuthComponent(props: P) {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (!session) {
        router.push("/");
      }
    }, [session, router]);

    if (!session) {
      return <Loading />;
    }

    return <Component {...props} />;
  };
}
