import { useState, useRef } from "react";
import toast from "react-hot-toast";
import api from "../../../utils/api";

export const useUndoDelete = (refresh) => {
  const [pendingDeletes, setPendingDeletes] = useState([]);
  const timeouts = useRef({});

  const deleteTaskWithUndo = async (task) => {
    const taskId = task.id;
    setPendingDeletes((prev) => [...prev, taskId]);
    if (refresh) refresh();
    const toastId = toast(
      (t) => (
        <div className="flex items-center gap-3">
          <span className="text-sm">Task "{task.title}" deleted</span>
          <button
            onClick={() => {
              clearTimeout(timeouts.current[taskId]);
              delete timeouts.current[taskId];
              setPendingDeletes((prev) => prev.filter((id) => id !== taskId));
              toast.dismiss(t.id);
              if (refresh) refresh();
            }}
            className="bg-gold text-black px-2 py-1 rounded"
          >
            Undo
          </button>
        </div>
      ),
      { duration: 5000 },
    );

    timeouts.current[taskId] = setTimeout(async () => {
      try {
         console.log("Delete triggered2");
        await api.delete(`/tasks/${taskId}`);
        delete timeouts.current[taskId];

        setPendingDeletes((prev) => prev.filter((id) => id !== taskId));
        if (refresh) refresh();
      } catch (err) {
        setPendingDeletes((prev) => prev.filter((id) => id !== taskId));
        toast.error("Failed to delete from server");
      }
    }, 5000);
  };


  const bulkDeleteWithUndo = (tasksToDelete) => {
    const ids = tasksToDelete.map((t) => t.id);

    setPendingDeletes((prev) => [...prev, ...ids]);

    const timeoutId = setTimeout(async () => {
      try {
        await Promise.all(ids.map((id) => api.delete(`/tasks/${id}`)));

        setPendingDeletes((prev) => prev.filter((id) => !ids.includes(id)));

        if (refresh) refresh();
      } catch (err) {
        toast.error("Bulk delete failed");
      }
    }, 5000);

    toast(
      (t) => (
        <div className="flex items-center gap-3">
          <span className="text-sm">{ids.length} tasks deleted</span>
          <button
            onClick={() => {
              clearTimeout(timeoutId);

              setPendingDeletes((prev) =>
                prev.filter((id) => !ids.includes(id)),
              );

              toast.dismiss(t.id);
            }}
            className="bg-gold text-black px-2 py-1 rounded "
          >
            Undo
          </button>
        </div>
      ),
      { duration: 5000 },
    );
  };
  return { deleteTaskWithUndo, pendingDeletes, bulkDeleteWithUndo };
};
