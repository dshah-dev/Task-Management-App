import { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import { useAuth } from "../../context/AuthContext";
import TaskCard from "../tasks/TaskCard";
import PopUpWindow from "../../Components/PopUpWindow";
import TaskForm from "../tasks/TaskForm";
import Button from "../../components/Button";
import { useDragAndDrop } from "../../hooks/useDargElements";
import { useDeleteTask } from "../../hooks/useDeleteElements";

function Board() {
  const { tasks, loading, error, refresh } = useTasks();
  const { logout } = useAuth();
  const { handleDragStart, handleDragOver, handleDrop } =useDragAndDrop(refresh);
  const {deleteTask} = useDeleteTask(refresh);

  const [isPopUpWindowOpen, setIsPopUpWindowOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleEditClick = (task) => {
    setTaskToEdit(task);
    setIsPopUpWindowOpen(true);
  };

  const closePopUpWindow = () => {
    setIsPopUpWindowOpen(false);
    setTaskToEdit(null);
  };

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statuses.map((status) => (
          <div
            key={status}
            className="bg-gray-200 p-4 rounded-lg"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            <h3 className="font-bold  mb-4 uppercase ">{status}</h3>
            <div className="space-y-4">
              {tasks
                .filter((t) => t.status === status)
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onUpdate={refresh}
                    onEdit={handleEditClick}
                    onDragStart={(e)=> handleDragStart(e,task)}
                    onDelete={deleteTask}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>

      <PopUpWindow
        isOpen={isPopUpWindowOpen}
        onClose={closePopUpWindow}

        title={taskToEdit ? "Edit Task" : "Add New Task"}
      >
        <TaskForm
          initialData={taskToEdit}
          onSuccess={() => {
            closePopUpWindow();
            refresh();
          }}
        />
      </PopUpWindow>
    </div>
  );
}

export default Board;
