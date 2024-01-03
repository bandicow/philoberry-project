"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { signOut } from "next-auth/react";

const ProfilePage = () => {
  const { data: session } = useSession();

  const SignoutHandler = async () => {
    await signOut();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-sky-700 text-slate-100 p-2 rounded shadow grid grid-cols-2 mt-9">
        <p>Name:</p>
        <p>{session?.user.name}</p>
        <p>Email:</p>
        <p>{session?.user.email}</p>
        <p>Role:</p>
        <p>{session?.user.role}</p>
      </div>
      <button
        className="w-20 h-10 bg-violet-500 shadow-xl shadow-purple-800"
        onClick={SignoutHandler}
      >
        로그아웃
      </button>
    </div>
  );
};

export default ProfilePage;
