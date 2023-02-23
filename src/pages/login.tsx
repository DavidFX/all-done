import Layout from "./Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { FaGooglePlusSquare } from "react-icons/fa";

import { auth } from "../utils/firebase";

export default function Login() {
  // Init router
  const router = useRouter();

  // Login user
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  if (error)
    return (
      <Layout title="Login">
        <div className="flex h-screen w-screen  flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-error">{error.message}</p>
        </div>
      </Layout>
    );

  if (loading)
    return (
      <Layout title="Loading...">
        <div className="flex h-screen w-screen flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Loading...</h1>
        </div>
      </Layout>
    );

  if (user) {
    router.push("/");
  }

  return (
    <Layout title="Login">
      <div className="flex h-screen w-screen  flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <button className="mt-4 text-5xl" onClick={() => signInWithGoogle()}>
          <FaGooglePlusSquare />
        </button>
      </div>
    </Layout>
  );
}
