import { type NextPage } from "next";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Layout from "./Layout";
import { FiMoon, FiSun } from "react-icons/fi";

import { auth } from "../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDarkMode } from "usehooks-ts";

const Home: NextPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const { isDarkMode, toggle } = useDarkMode();

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
      <div
        data-theme={isDarkMode ? "dark" : "light"}
        className="flex h-screen w-screen flex-col items-center justify-center"
      >
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex justify-between">
              <h2 className="card-title">allDone</h2>
              <button className="text-xl" onClick={toggle}>
                {isDarkMode ? <FiSun /> : <FiMoon />}
              </button>
            </div>
            <p>{user?.displayName}</p>
            <TodoForm />
            <TodoList />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
