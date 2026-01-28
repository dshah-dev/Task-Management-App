import api from "../api";
import { useState } from "react";

export const useDeleteTask = (onSuccess) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    setIsDeleting(true);
    try {
      await api.delete(`/tasks/${taskId}`);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Failed to delete the task.");
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteTask, isDeleting };
};
