
const TASK_FORM_CONFIG = [
  {
    name: "title",                //must match my JSON key
    label: "Task Title",
    type: "text",
    rules: { required: "Title is required" },
  },
  {
    name: "Name", 
    label: "Name",
    type: "text",
    rules: { required: "Name is required" },
  },
  {
    name: "priority",
    label: "Priority",
    type: "select",
    options: [
      { label: "Low", value: "low" },
      { label: "Medium", value: "medium" },
      { label: "High", value: "high" },
    ]
  },
  {
    name: "dueDate",
    label: "Due Date",
    type: "date",
    rules: {
      required: "Date is required",
      min: {
        value: new Date().toISOString().split("T")[0],
        message: "Date cannot be in the past",
      },
    },
  },
];

export default TASK_FORM_CONFIG ;