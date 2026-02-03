import React from "react";
import api from "../../utils/api";
import Button from "../../common/components/Button";

export default function TaskCard({ task, onUpdate, onEdit, onDragStart , onDelete}) {
  const moveTask = async (newStatus) => {
    await api.patch(`/tasks/${task.id}`, { status: newStatus });
    onUpdate();
  };

  return (
    <div
      className="bg-white p-4 rounded shadow border border-gray-200"
        draggable
        onDragStart={onDragStart}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-gray-800">{task.title}</h4>
        <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase font-bold">
          {task.priority}
        </span>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        name: {task.Name} | Due Date: {task.dueDate}
      </p>
      <div className="flex gap-2">
        {task.status !== "todo" && (
          <button
            onClick={() => moveTask("todo")}
            className="text-[10px] text-gray-500 underline"
          >
            To Do
          </button>
        )}
        {task.status !== "in-progress" && (
          <button
            onClick={() => moveTask("in-progress")}
            className="text-[10px] text-blue-500 underline"
          >
            In Progress
          </button>
        )}
        {task.status !== "done" && (
          <button
            onClick={() => moveTask("done")}
            className="text-[10px] text-green-500 underline"
          >
            Done
          </button>
        )}
        <div>
          <Button variant="update" onClick={() => onEdit(task)}>
            Update
          </Button>
        </div>
        <div>
          <Button variant="delete" onClick={() => onDelete(task.id)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
