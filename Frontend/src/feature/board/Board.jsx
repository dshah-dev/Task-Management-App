import { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import { useAuth } from "../../context/AuthContext";
import PopUpWindow from "../../Components/PopUpWindow";
import TaskForm from "../tasks/TaskForm";
import Button from "../../components/Button";

function Board() {
  const { tasks, loading, error, refresh } = useTasks();
  const { logout } = useAuth();
  const [isPopUpWindowOpen, setIsPopUpWindowOpen] = useState(false);

  if (loading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;

  const statuses = ["todo", "in-progress", "done"];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-black">Task Management App</h1>
        <div className="flex gap-4">
          <Button onClick={() => setIsPopUpWindowOpen(true)}>Add Task</Button>
          <button
            onClick={logout}
            className="border rounded-lg px-2 border-white shadow-lg hover:bg-red-300"
          >
            Logout
          </button>
        </div>
      </header>

      <PopUpWindow
        isOpen={isPopUpWindowOpen}
        onClose={() => setIsPopUpWindowOpen(false)}
        title="Add New Task"
      >
        <TaskForm
          onSuccess={() => {
            setIsPopUpWindowOpen(false);
            refresh();
          }}
        />
      </PopUpWindow>
    </div>
  );
}

export default Board;
