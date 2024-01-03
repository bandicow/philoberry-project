"use client";
import { signUp } from "@/lib/action";
import SlideUpMessage from "@/src/components/UI/Alert/Slideup";
import { useNotification } from "@/src/hooks/useNotification";
import { redirect } from "next/navigation";
import { useState, FormEvent } from "react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { shake, showFailureMessage, startFailureNotification } =
    useNotification();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await signUp(name, email, password);

      if (response) {
        redirect("/signin");
      }
    } catch (error) {
      startFailureNotification();
      return console.log("로그인 실패");
    }
  };

  return (
    <div
      className={`${
        shake ? "animate-shake" : ""
      } flex items-center justify-center min-h-[calc(100vh-40px)] bg-gray-200`}
    >
      <div className="p-8 bg-white rounded shadow">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              이름:
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              이메일:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            회원가입
          </button>
        </form>
      </div>
      <SlideUpMessage
        message="다시 작성해주세요."
        show={showFailureMessage}
        fail={true}
        className="bottom-8"
      />
    </div>
  );
}