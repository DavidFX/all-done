import Layout from "./Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";

import { auth } from "../utils/firebase";
import Link from "next/link";

export default function Login() {
  // Init router
  const router = useRouter();

  // Login user
  const [userState] = useAuthState(auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInUser, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInUser(email, password);
    console.log(userState);
  };

  if (loading)
    return (
      <Layout title="Login">
        <div className="flex h-screen w-screen  flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p>Loading...</p>
        </div>
      </Layout>
    );

  if (error)
    return (
      <Layout title="Login">
        <div className="flex h-screen w-screen  flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-error">{error.message}</p>
        </div>
      </Layout>
    );

  if (user || userState) {
    router.push("/");
  }

  return (
    <Layout title="Login">
      <div className="flex h-screen w-screen  flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex w-96 flex-col space-y-4"
        >
          <input
            type="email"
            className="input-outlined input"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="input-outlined input"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn-primary btn">Login</button>
        </form>
        <p className="mt-2">
          don't have an account{" "}
          <Link className="link" href="/register">
            sign up
          </Link>
        </p>
      </div>
    </Layout>
  );
}
