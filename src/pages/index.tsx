import { type NextPage } from "next";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Layout from "./Layout";

import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

const Home: NextPage = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  if (loading)
    return (
      <Layout title="Loading...">
        <div className="flex h-screen w-screen flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Loading...</h1>
        </div>
      </Layout>
    );

  if (error)
    return (
      <Layout title="Error">
        <div className="flex h-screen w-screen flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Error</h1>
        </div>
      </Layout>
    );

  if (!user) {
    router.push("/login");
  }

  return (
    <Layout title="All Done">
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">all done todo</h2>
            <p>{user?.email}</p>
            <TodoForm />
            <TodoList />
            <div className="mt-2 flex justify-between">
              <button className="btn-secondary btn-sm btn ">
                clear completed
              </button>
              <button
                onClick={() => signOut(auth)}
                className="btn-error btn-sm btn"
              >
                log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
