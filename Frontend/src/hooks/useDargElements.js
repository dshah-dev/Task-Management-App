import api from "../api";

export const useDragAndDrop = (onUpdate) => {

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("taskId", task.id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");

    try {
      await api.patch(`/tasks/${taskId}`, { status: newStatus });
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error("Drop failed:", err);
    }
  };

  return { handleDragStart, handleDragOver, handleDrop };
};

// can use useCallback hook because all return fun above is created again and again on calling. , it return a method and changes its defination when dependacies changes

