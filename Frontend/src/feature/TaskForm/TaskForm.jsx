import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
// import Input from "../../components/Input";
import Button from "../../components/Button";
import { useSaveTask } from "../../hooks/useSaveTask";
import TASK_FORM_CONFIG from "./constant/index"
import DynamicFormController from "../../Components/custom-forms";

function TaskForm({ onSuccess, initialData }) {
  const {
    // register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  });

  const { saveTask, isSaving } = useSaveTask(onSuccess);

  useEffect(() => {
    reset(initialData || { title: "", Name: "", priority: "low", dueDate: "" });
  }, [initialData, reset]);

  const onSubmit = async (data) => {
    // console.log("new task created : ", data);
    saveTask(data, initialData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DynamicFormController 
        control={control}
        config={TASK_FORM_CONFIG}
        errors={errors}
      />
      {/* <Input
        label="Task Title"
        {...register("title", { required: "Title is required" })}
        error={errors.title?.message}
      /> */}
      {/* <Controller
        name="title" 
        control={control}
        rules={{ required: "Title is required" }}
        render={({ field }) => (
          <Input
            label="Task Title"
            {...field}
            value={field.value || ""} // solved : changing an uncontrolled input to be controlled
            error={errors.title?.message}
          />
        )}
      /> */}

      {/* <Input
        label="Name"
        {...register("Name", { required: "Name is required" })}
        error={errors.Name?.message}
      /> */}
      {/* <Controller
        name="Name"
        control={control}
        rules={{ required: "Name is required" }}
        render={({ field }) => (
          <Input
            label="Name"
            {...field}
            value={field.value || ""}
            error={errors.Name?.message}
          />
        )}
      />

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Priority</label>
        <select {...register("priority")} className="w-full border rounded p-2">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div> */}

      {/* <Input
        label="Due Date"
        type="date"
        {...register("dueDate", { required: "Date is required" })}
        error={errors.dueDate?.message}
      /> */}
      {/* <Controller
        name="dueDate"
        control={control}
        rules={{
          required: "Date is required",
          min: {
            value: new Date().toISOString().split("T")[0],
            message: "Date cannot be in the past",
          },
        }}
        render={({ field }) => (
          <Input
            label="Due Date"
            type="date"
            {...field}
            value={field.value || ""}
            error={errors.dueDate?.message}
          />
        )}
      /> */}

      <Button type="submit" disabled={isSaving}>
        {isSaving ? "Saving..." : initialData ? "Save Changes" : "Create Task"}
      </Button>
    </form>
  );
}

export default TaskForm;
