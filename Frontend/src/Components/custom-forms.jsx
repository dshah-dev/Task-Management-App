import React from "react";
import { Controller } from "react-hook-form";
import Input from "./Input";

const DynamicFormController = ({ control, config, errors }) => {
  return (
    <>
      {config.map((item) => {
        const { name, label, type, rules, placeholder, className, options } =
          item;

        return (
          <Controller
            key={name}
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => {
              if (type === "select") {
                return (
                  <div className={`mb-4 text-left ${className || ""}`}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {label}
                    </label>
                    <select
                      {...field}
                      className={`w-full border rounded p-2 focus:ring-2 focus:ring-blue-400 outline-none`}
                    >
                      <option value="">Select {label}</option>
                      {options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }

              return (
                <div className={`mb-4 text-left relative ${className || ""}`}>
                  <Input
                    {...field}
                    label={label}
                    type={type}
                    placeholder={placeholder}
                    value={field.value || ""}
                    error={errors[name]?.message}
                  />
                </div>
              );
            }}
          />
        );
      })}
    </>
  );
};

export default DynamicFormController;
