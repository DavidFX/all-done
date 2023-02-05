import { useState } from "react";
import { db, auth } from "../../utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function TodoForm() {
  const [user] = useAuthState(auth);
  const [text, setText] = useState("");

  // Add todo to the store
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      await setDoc(doc(db, "todos", Date.now().toString()), {
        completed: false,
        id: Date.now(),
        text: text,
        owner: user?.uid,
      });

      setText("");
    } else {
      setText("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-2 flex items-center justify-between gap-2"
    >
      <input
        type="text"
        className="input-primary input"
        placeholder="Add a todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="btn-primary btn">
        Add
      </button>
    </form>
  );
}
