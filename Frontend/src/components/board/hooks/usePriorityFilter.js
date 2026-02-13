import { useMemo } from "react";

export const usePriorityFilter = (tasks, selectedPriority) => {
  const filteredTasks = useMemo(() => {
    if (!selectedPriority || selectedPriority === "all") return tasks;

    return tasks.filter((task) => 
      task.priority?.toUpperCase() === selectedPriority.toUpperCase()
    );
  }, [tasks, selectedPriority]);

  return filteredTasks;
};
