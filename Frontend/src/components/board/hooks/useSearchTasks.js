import { useMemo } from "react";

export const useSearchTasks = (tasks, searchTask) => {
  const searchedTasks = useMemo(() => {
    if (!searchTask) return tasks;
    
    const lowerSearch = searchTask.toLowerCase();

    return tasks.filter((task) => {
      return (
        task.title?.toLowerCase().includes(lowerSearch) ||
        task.Name?.toLowerCase().includes(lowerSearch)
      );
    });
  }, [tasks, searchTask]);

  return searchedTasks;
};
