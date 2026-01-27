import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../../api";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useSaveTask } from "../../hooks/useSaveTask";

function TaskForm({ onSuccess, initialData }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  });

  const { saveTask, isSaving } = useSaveTask(onSuccess);

  useEffect(() => {
    reset(initialData || { title: "", Name: "", priority: "low", dueDate: "" });
  }, [initialData, reset]);

  const onSubmit = async (data) => {
    saveTask(data, initialData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Task Title"
        {...register("title", { required: "Title is required" })}
        error={errors.title?.message}
      />
      <Input
        label="Name"
        {...register("Name", { required: "Name is required" })}
        error={errors.Name?.message}
      />
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Priority</label>
        <select {...register("priority")} className="w-full border rounded p-2">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <Input
        label="Due Date"
        type="date"
        {...register("dueDate", { required: "Date is required" })}
        error={errors.dueDate?.message}
      />
      <Button type="submit" disabled={isSaving}>
        {isSaving ? "Saving..." : initialData ? "Save Changes" : "Create Task"}
      </Button>
    </form>
  );
}

export default TaskForm;
