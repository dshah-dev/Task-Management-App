import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../common/components/Button";
import { useSaveTask } from "../../common/hooks/useSaveTask";
import TASK_FORM_CONFIG from "./constant/index"
import DynamicFormController from "../../common/components/custom-forms";

function TaskForm({ onSuccess, initialData }) {
  const {
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
    saveTask(data, initialData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DynamicFormController 
        control={control}
        config={TASK_FORM_CONFIG}
        errors={errors}
        
      />
      <Button type="submit" disabled={isSaving}>
        {isSaving ? "Saving..." : initialData ? "Save Changes" : "Create Task"}
      </Button>
    </form>
  );
}

export default TaskForm;
