import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useSaveTask } from "../../hooks/useSaveTask";

//I can create my own custom controller ... below is ie.

// const Controller = ({ control, register, name, rules, render }) => {
//   const props = register(name,rules);
//   console.log(props);

//   return render(props , error);
// };

//  <Controller
//     {...{
//       control,
//       register,
//       name: "Enter a new task",
//       rules: {},
//       render: () => <Input />,
//     }}
//   />

function TaskForm({ onSuccess, initialData }) {
  const {
    register,
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
    console.log("new task created : ", data);
    saveTask(data, initialData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <Input
        label="Task Title"
        {...register("title", { required: "Title is required" })}
        error={errors.title?.message}
      /> */}
      <Controller
        name="title" //must match my JSON key
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
      />

      {/* <Input
        label="Name"
        {...register("Name", { required: "Name is required" })}
        error={errors.Name?.message}
      /> */}
      <Controller
        name="Name"
        control={control}
        rules={{ required: "Name is required" }}
        render={({ field }) => (
          <Input
            label="Name"
            {...field}
            value={field.value || ""}
            error={errors.title?.message}
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
      </div>

      {/* <Input
        label="Due Date"
        type="date"
        {...register("dueDate", { required: "Date is required" })}
        error={errors.dueDate?.message}
      /> */}
      <Controller
        name="dueDate"
        control={control}
        rules={{ required: "Date is required" }}
        render={({ field }) => (
          <Input
            label="Due Date"
            type="date"
            {...field}
            value={field.value || ""}
            error={errors.title?.message}
          />
        )}
      />

      <Button type="submit" disabled={isSaving}>
        {isSaving ? "Saving..." : initialData ? "Save Changes" : "Create Task"}
      </Button>
    </form>
  );
}

export default TaskForm;
