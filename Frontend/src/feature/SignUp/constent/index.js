export const SIGNUP_CONFIG = [
  {
    name: "username",
    label: "User Name",
    type: "text",
    placeholder: "Enter your name",
    rules: { required: "Name is required" },
    variant: "auth",
  },
  {
    name: "email",
    label: "E-Mail",
    type: "email",
    placeholder: "Enter your E-Mail",
    rules: { required: "Email is required" },
    variant: "auth",
  },
  {
    name: "phone_no.",
    label: "Phone No.",
    type: "tel",
    placeholder: "Enter phone number",
    variant: "auth",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    rules: { required: "Password is required" },
    variant: "auth",
  },
];
