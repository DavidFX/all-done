import Layout from "./Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

export default function Register() {
  // Init router
  const router = useRouter();

  // Register user
  const [userState] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUser, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser(email, password);
  };

  if (loading)
    return (
      <Layout title="Register">
        <div className="flex h-screen w-screen  flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Register</h1>
          <p>Loading...</p>
        </div>
      </Layout>
    );

  if (error)
    return (
      <Layout title="Register">
        <div className="flex h-screen w-screen  flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Register</h1>
          <p className="text-error">{error.message}</p>
        </div>
      </Layout>
    );

  if (user || userState) {
    router.push("/");
  }

  return (
    <Layout title="Register">
      <div className="flex h-screen w-screen  flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
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
          <button className="btn-primary btn">Register</button>
        </form>
        <p className="mt-2">
          already have an account{" "}
          <Link className="link" href="/login">
            sign in
          </Link>
        </p>
      </div>
    </Layout>
  );
}
