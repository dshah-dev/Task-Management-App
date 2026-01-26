import React from "react";
import { useForm } from "react-hook-form";
import api from "../../api";
import Input from "../../components/Input";
import Button from "../../components/Button";

function TaskForm({ onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const newTask = { ...data, status: "todo" };
    await api.post("/tasks", newTask);
    onSuccess();
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
      <Button type="submit">Create Task</Button>
    </form>
  );
}

export default TaskForm;
