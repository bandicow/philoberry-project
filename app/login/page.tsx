import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";

import {
  GoogleSignInButton,
  KaKaoSignInButton,
} from "@/src/components/sign/authButtons";
import { CredentialsForm } from "@/src/components/sign/CredentialsForm";

export default async function SignInPage() {
  const session = await getServerSession(authConfig);

  console.log("Session: ", session);

  if (session) return redirect("/");

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-2 bg-gray-900">
      <div className="flex flex-col items-center p-10 bg-black rounded-md shadow-md">
        <h1 className="mt-3 mb-4 text-4xl font-bold text-white">Sign In</h1>

        <CredentialsForm />
        <span className="mt-8 text-base font-semibold text-center text-white">
          - Or -
          <GoogleSignInButton />
          <KaKaoSignInButton />
        </span>
      </div>
    </div>
  );
}
