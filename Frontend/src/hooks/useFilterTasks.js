import { useMemo } from "react";

export const useFilterTasks = (tasks, searchTask) => {
  const filteredTasks = useMemo(() => {
    if (!searchTask) return tasks;

    const lowerSearch = searchTask.toLowerCase();

    return tasks.filter((task) => {
      return (
        task.title?.toLowerCase().includes(lowerSearch) ||
        task.Name?.toLowerCase().includes(lowerSearch)
      );
    });
  }, [tasks, searchTask]);

  return filteredTasks;
};
