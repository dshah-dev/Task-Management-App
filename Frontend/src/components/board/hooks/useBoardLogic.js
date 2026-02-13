import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../../common/hooks/useTasks";
import { useDragAndDrop } from "../../../common/hooks/useDargElements";
import { useBulkActions } from "../hooks/useBulkActions";
import { useUndoDelete } from "../hooks/useUndoDelete";
import { useDebounce } from "../../../common/hooks/useDebounce";
import { useSearchTasks } from "../hooks/useSearchTasks";
import { usePriorityFilter } from "../hooks/usePriorityFilter";
import { closeAuthState } from "../../../redux/authStateManageSlice";

export const useBoardLogic = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const { isOpen, mode } = useSelector((state) => state.authState);

  const { tasks, loading, error, refresh } = useTasks();
  const { handleDragStart, handleDragOver, handleDrop } = useDragAndDrop(refresh);
  const { selectedTaskIds, toggleSelection, bulkPriorityUpdate } = useBulkActions(refresh);
  const { deleteTaskWithUndo, bulkDeleteWithUndo, pendingDeletes } = useUndoDelete(refresh);

  const [isPopUpWindowOpen, setIsPopUpWindowOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [searchTask, setSearchTask] = useState("");
  const [priority, setPriority] = useState("all");
  const [collapsedColumns, setCollapsedColumns] = useState({
    todo: false,
    "in-progress": false,
    done: false,
  });

  const debouncedTasks = useDebounce(searchTask, 1000);
  const searchedTasks = useSearchTasks(tasks, debouncedTasks);
  const FilteredTasks = usePriorityFilter(searchedTasks, priority);
  const visibleTasks = FilteredTasks.filter(
    (task) => !pendingDeletes?.includes(task.id)
  );

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleEditClick = (task) => {
    setTaskToEdit(task);
    setIsPopUpWindowOpen(true);
  };

  const closePopUpWindow = () => {
    setIsPopUpWindowOpen(false);
    setTaskToEdit(null);
  };

  const toggleColumn = (status) => {
    setCollapsedColumns((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  const handleBulkDeleteWithUndo = () => {
    const selectedTasks = tasks.filter((task) =>
      selectedTaskIds.includes(task.id)
    );
    bulkDeleteWithUndo(selectedTasks);
  };

  const closeAuthModal = () => dispatch(closeAuthState());

  return {
    loading,
    error,
    tasks,
    visibleTasks,
    searchTask,
    setSearchTask,
    priority,
    setPriority,
    selectedTaskIds,
    collapsedColumns,
    isPopUpWindowOpen,
    taskToEdit,
    isOpen,
    mode,

    refresh,
    handleDragStart,
    handleDragOver,
    handleDrop,
    toggleSelection,
    bulkPriorityUpdate,
    deleteTaskWithUndo,
    handleBulkDeleteWithUndo,
    handleEditClick,
    closePopUpWindow,
    setIsPopUpWindowOpen,
    toggleColumn,
    closeAuthModal,
  };
};






  // const currentUser = useSelector((state) => state.auth.currentUser);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { isOpen, mode } = useSelector((state) => state.authState);
  // const { tasks, loading, error, refresh } = useTasks();
  // const { handleDragStart, handleDragOver, handleDrop } =
  //   useDragAndDrop(refresh);
  // const { selectedTaskIds, toggleSelection, bulkPriorityUpdate } =
  //   useBulkActions(refresh);
  // const { deleteTaskWithUndo, bulkDeleteWithUndo, pendingDeletes } =
  //   useUndoDelete(refresh);

  // const [isPopUpWindowOpen, setIsPopUpWindowOpen] = useState(false);
  // const [taskToEdit, setTaskToEdit] = useState(null);
  // const [searchTask, setSearchTask] = useState("");
  // const [priority, setPriority] = useState("all");
  // const [collapsedColumns, setCollapsedColumns] = useState({
  //   todo: false,
  //   "in-progress": false,
  //   done: false,
  // });

  // const debouncedTasks = useDebounce(searchTask, 1000);
  // const searchedTasks = useSearchTasks(tasks, debouncedTasks);
  // const FilteredTasks = usePriorityFilter(searchedTasks, priority);
  // const visibleTasks = FilteredTasks.filter(
  //   (task) => !pendingDeletes?.includes(task.id),
  // );
  // useEffect(() => {
  //   if (!currentUser) {
  //     navigate("/");
  //   }
  // }, [currentUser, navigate]);

  // const handleEditClick = (task) => {
  //   setTaskToEdit(task);
  //   setIsPopUpWindowOpen(true);
  // };

  // const closePopUpWindow = () => {
  //   setIsPopUpWindowOpen(false);
  //   setTaskToEdit(null);
  // };

  // const toggleColumn = (status) => {
  //   setCollapsedColumns((prev) => ({
  //     ...prev,
  //     [status]: !prev[status],
  //   }));
  // };

  // const handleBulkDeleteWithUndo = () => {
  //   const selectedTasks = tasks.filter((task) =>
  //     selectedTaskIds.includes(task.id),
  //   );
  //   bulkDeleteWithUndo(selectedTasks);
  // };
