import { useEffect, useState } from "react";
import { useTasks } from "../../common/hooks/useTasks";
import TaskCard from "../tasksCard/TaskCard";
import PopUpWindow from "../../common/components/PopUpWindow";
import TaskForm from "../TaskForm/TaskForm";
import { useDragAndDrop } from "../../common/hooks/useDargElements";
import { useDeleteTask } from "../../common/hooks/useDeleteElements";
import { useFilterTasks } from "../../common/hooks/useFilterTasks";
import { useDebounce } from "../../common/hooks/useDebounce";
import { useSelector ,useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../common/components/Navbar";
import ProfilePage from "../profilePage/profilePage";
import { closeAuthState } from "../../redux/authStateManageSlice";

function Board() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);
  
  const dispatch=useDispatch()
  const { isOpen ,mode} = useSelector((state) => state.authState);
  const { tasks, loading, error, refresh } = useTasks();
  const { handleDragStart, handleDragOver, handleDrop } =
    useDragAndDrop(refresh);
  const { deleteTask } = useDeleteTask(refresh);

  const [isPopUpWindowOpen, setIsPopUpWindowOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [searchTask, setSearchTask] = useState("");

  const debouncedTasks = useDebounce(searchTask, 1000);
  const filteredTasks = useFilterTasks(tasks, debouncedTasks);

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
    <div className="min-h-screen bg-gray-50 p-5">
      <Navbar
        searchTask={searchTask}
        setSearchTask={setSearchTask}
        onAddTaskClick={() => setIsPopUpWindowOpen(true)}
      />
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
              {filteredTasks
                .filter((t) => t.status === status)
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onUpdate={refresh}
                    onEdit={handleEditClick}
                    onDragStart={(e) => handleDragStart(e, task)}
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
        variant="primary"
      >
        <TaskForm
          initialData={taskToEdit}
          onSuccess={() => {
            closePopUpWindow();
            refresh();
          }}
        />
      </PopUpWindow>

      <PopUpWindow
        isOpen={isOpen}
        onClose={() => dispatch(closeAuthState())}
        variant="auth"
      >
        {mode === "profile" ?<ProfilePage />:""}
      </PopUpWindow>
    </div>
  );
}

export default Board;
