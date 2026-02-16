import { useBoardLogic } from "../hooks/useBoardLogic";
import TaskCard from "../../tasksCard/TaskCard";
import PopUpWindow from "../../../common/components/PopUpWindow";
import TaskForm from "../../TaskForm/TaskForm";
import ProfilePage from "../../profilePage/components/profilePage";
import UpperBoard from "./upper-board";
import BoardSkeleton from "./skeleton";
import { FaChevronDown } from "react-icons/fa";
import { Toaster } from "react-hot-toast";
import TaskCarousel from "./Carousel";

function Board() {
  const {
    loading,
    error,
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
  } = useBoardLogic();

  if (loading) return <BoardSkeleton />;
  if (error) return <div className="p-10 text-red-500">{error}</div>;

  const statuses = ["todo", "in-progress", "done"];

  return (
    <div className="min-h-screen bg-theme p-5">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "purple",
            color: "white",
            border: "1px solid black",
          },
        }}
      />
      <div className="min-h-auto border-white rounded shadow-lg p-5 ">
        <div className=" border-t border-gold rounded-2xl md:mx-10 lg:mx-15">
          <UpperBoard
            searchTask={searchTask}
            setSearchTask={setSearchTask}
            onAddTaskClick={() => setIsPopUpWindowOpen(true)}
            priority={priority}
            setPriority={setPriority}
            selectedCount={selectedTaskIds.length}
            onBulkDelete={handleBulkDeleteWithUndo}
            onBulkPriority={bulkPriorityUpdate}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 md:mx-10 lg:mx-15 items-start">
          {statuses.map((status) => {
            const isCollapsed = collapsedColumns[status];
            const columnTasks = visibleTasks.filter((t) => t.status === status);
            return (
              <div
                key={status}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, status)}
                className="bg-purple p-4 rounded-lg flex flex-col transition-all duration-300"
              >
                <button
                  onClick={() => toggleColumn(status)}
                  className="w-full flex justify-between items-center font-bold text-lg sm:text-xl golden-border text-white mb-4 p-2 sm:p-4 hover:brightness-140 transition-all"
                >
                  <span className="uppercase">{status}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-theme px-2 py-1 rounded-full text-gold">
                      {columnTasks.length}
                    </span>
                    <span
                      className={`text-sm transition-transform duration-300 ${isCollapsed ? "-rotate-90" : "rotate-0"}`}
                    >
                      <FaChevronDown />
                    </span>
                  </div>
                </button>
                <div
                  className={`space-y-4 overflow-y-auto overflow-x-hidden transition-all duration-500 ease-in-out scrollbar-thin scrollbar-color scrollbar-track-transparent ${
                    isCollapsed
                      ? "max-h-0 opacity-0"
                      : "max-h-[50vh] opacity-100 pr-1"
                  }`}
                >
                  {columnTasks.length > 0
                    ? columnTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onUpdate={refresh}
                          onEdit={handleEditClick}
                          onDragStart={(e) => handleDragStart(e, task)}
                          onDelete={() => deleteTaskWithUndo(task)}
                          isSelected={selectedTaskIds.includes(task.id)}
                          onSelect={toggleSelection}
                        />
                      ))
                    : !isCollapsed && (
                        <div className="text-white text-center py-10 text-sm">
                          No tasks found
                        </div>
                      )}
                </div>
              </div>
            );
          })}
        </div>
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

      <PopUpWindow isOpen={isOpen} onClose={closeAuthModal} variant="auth">
        {mode === "profile" ? <ProfilePage /> : ""}
      </PopUpWindow>

      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6 ml-10">
          <span className="bg-gold h-4 w-1 rounded-full" />
          <h2 className="text-white font-bold text-xl uppercase tracking-tighter">
            Featured Tasks
          </h2>
        </div>

        <TaskCarousel tasks={visibleTasks} />
      </section>

    </div>
  );
}

export default Board;
