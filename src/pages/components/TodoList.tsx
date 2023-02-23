import { CgClose } from "react-icons/cg";
import { db, auth } from "../../utils/firebase";
import {
  collection,
  getDocs,
  doc,
  query,
  updateDoc,
  where,
  deleteDoc,
  DocumentData,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
// Import useState hook and useEffect hook
import { useState, useEffect } from "react";

export default function TodoList(signOut: any) {
  const [user] = useAuthState(auth);
  const [todos, setTodos] = useState<DocumentData>([]);

  const getTodos = async () => {
    const q = query(collection(db, "todos"), where("owner", "==", user?.uid));
    const querySnapshot = await getDocs(q);
    const todos = querySnapshot.docs.map((doc) => doc.data());
    setTodos(todos);
  };

  useEffect(() => {
    getTodos();
  }, [todos]);

  // Define a function to handle delete todo
  const handleDeleteTodo = async (id: string) => {
    const todoRef = doc(db, "todos", id);
    await deleteDoc(todoRef);
    getTodos();
  };

  // Define a function to handle check todo
  const handleCheckTodo = async (id: string, completed: boolean) => {
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, {
      completed: !completed,
    });
    getTodos();
  };

  // Define a function to clear completed todos
  const handleClearCompleted = async () => {
    const q = query(collection(db, "todos"), where("completed", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    getTodos();
  };

  return (
    <div className="">
      <ul className="mt-2 flex flex-col gap-4">
        {
          // Map over todos
          todos.map((todo: Todo) => (
            <li key={todo.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  onChange={() =>
                    handleCheckTodo(todo.id.toString(), todo.completed)
                  }
                  checked={todo.completed}
                  type="checkbox"
                  className="checkbox"
                />
                <label
                  className={todo.completed ? "line-through opacity-50" : ""}
                >
                  {todo.text}
                </label>
              </div>
              <button
                onClick={() => handleDeleteTodo(todo.id.toString())}
                className="text-danger text-2xl"
              >
                <CgClose color="red" />
              </button>
            </li>
          ))
        }
      </ul>
      <div className="mt-4 flex justify-between">
        <button
          onClick={handleClearCompleted}
          className="btn-secondary btn-sm btn"
        >
          clear completed
        </button>
        <button onClick={() => signOut(auth)} className="btn-error btn-sm btn">
          log out
        </button>
      </div>
    </div>
  );
}
