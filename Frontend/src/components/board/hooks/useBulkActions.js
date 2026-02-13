import { useState } from "react";
import api from "../../../utils/api";

export const useBulkActions = (refresh) => {
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const toggleSelection = (taskId) => {
    setSelectedTaskIds((prev) =>
      prev.includes(taskId) 
        ? prev.filter((id) => id !== taskId) 
        : [...prev, taskId]
    );
  };

  const clearSelection = () => setSelectedTaskIds([]);

  const bulkDelete = async () => {
    if (selectedTaskIds.length === 0) return;

    setIsProcessing(true);
    try {
      await Promise.all(selectedTaskIds.map((id) => api.delete(`/tasks/${id}`)));
      clearSelection();
      if (refresh) refresh();
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to delete tasks.");
    } finally {
      setIsProcessing(false);
    }
  };

  const bulkPriorityUpdate = async (newPriority) => {
    if (selectedTaskIds.length === 0) return;

    setIsProcessing(true);
    try {
      await Promise.all(
        selectedTaskIds.map((id) => api.patch(`/tasks/${id}`, { priority: newPriority }))
      );
      clearSelection();
      if (refresh) refresh();
    } catch (err) {
      console.error("Bulk Priority Error:", err);
      alert("Failed to update priority.");
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    selectedTaskIds,
    toggleSelection,
    clearSelection,
    bulkDelete,
    bulkPriorityUpdate,
    isProcessing,
  };
};