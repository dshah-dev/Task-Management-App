import React from "react";
import api from "../../utils/api";
import Button from "../../common/components/Button";
import deleteBtn from "../../assets/deleteBtn.png";
import updateBtn from "../../assets/updateBtn.png";
export default function TaskCard({
  task,
  onUpdate,
  onEdit,
  onDragStart,
  onDelete,
  isSelected,
  onSelect,
}) {
  const moveTask = async (newStatus) => {
    await api.patch(`/tasks/${task.id}`, { status: newStatus });
    onUpdate();
  };

  return (
    <div
      className="task-card-sigma p-4 rounded-lg shadow-lg cursor-grab active:cursor-grabbing transition-transform hover:scale-[1.02] "
      draggable
      onDragStart={onDragStart}
    >
      <div className="flex justify-end mb-2 relative">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(task.id)}
          className="w-4 h-4 accent-gold cursor-pointer z-5 "
        />
      </div>

      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-white tracking-tight">
          {task.title}
        </h4>
        <span className="text-[10px] bg-gray-300 text-gray-900 px-2 py-0.5 rounded uppercase font-black ">
          {task.priority}
        </span>
      </div>

      <p className="text-[11px] font-medium text-white/70 mb-4">
        Name: <span className="text-white">{task.Name}</span> <br />
        Due Date: <span className="text-white font-bold">{task.dueDate}</span>
      </p>
      <div className="flex gap-3 flex-wrap items-center mt-auto pt-2 border-t border-white/10">
        <div className="flex gap-2">
          {task.status !== "todo" && (
            <button
              onClick={() => moveTask("todo")}
              className="text-[10px] text-purple-300 hover:text-white underline"
            >
              To Do
            </button>
          )}
          {task.status !== "in-progress" && (
            <button
              onClick={() => moveTask("in-progress")}
              className="text-[10px] text-blue-300 hover:text-white underline"
            >
              In Progress
            </button>
          )}
          {task.status !== "done" && (
            <button
              onClick={() => moveTask("done")}
              className="text-[10px] text-green-300 hover:text-white underline"
            >
              Done
            </button>
          )}
        </div>
        <div className="flex gap-2 ml-auto">
          <button onClick={() => onEdit(task)}>
            <img src={updateBtn} alt="edit btn" />
          </button>
          {/* <button onClick={() => onDelete(task.id)}> */}
          <button onClick={onDelete}>
            <img src={deleteBtn} alt="delete byn" />
          </button>
        </div>
      </div>
    </div>
  );
}
