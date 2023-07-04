import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Signin = () => {
  const { data: session, status } = useSession();
  // const sessions = getSession();
  const router = useRouter();

  // status가 loading이면 true (구조분해 할당)
  const loading = status === "loading";

  const SigninHandler = () => {
    signIn();
  };

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <button onClick={SigninHandler}>로그인</button>;
  }
};

export default Signin;
