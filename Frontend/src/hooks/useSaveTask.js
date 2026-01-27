import { useState } from "react";
import api from "../api";

export const useSaveTask = (onSuccess) => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const saveTask = async (data, initialData = null) => {
    setIsSaving(true);
    setError(null);

    try {
      if (initialData) {
        await api.patch(`/tasks/${initialData.id}`, data);
      }else {
        const newTask = { ...data, status: "todo" };
        await api.post("/tasks", newTask);
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Failed to save task. Please try again.");
      console.error("Save Task Error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return { saveTask, isSaving, error };
};