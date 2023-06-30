import { getSession, signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const Signin = () => {
  const { data: session, status } = useSession();
  // const sessions = getSession();

  // status가 loading이면 true (구조분해 할당)
  const loading = status === "loading";

  const SigninHandler = () => {
    signIn();
  };
  const SignoutHandler = () => {
    signOut();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <button onClick={SigninHandler}>로그인</button>;
  }

  return (
    <div className="text-4xl">
      <p>Welcome , {session.user?.name}</p>
      <button onClick={SignoutHandler}>로그아웃</button>
    </div>
  );
};

export default Signin;
