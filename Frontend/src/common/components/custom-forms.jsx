import React from "react";
import { Controller } from "react-hook-form";
import Input from "./Input";
import Select from "./select";
import DateInput from "./DateInput";

const DynamicFormController = ({ control, config, errors }) => {
  return (
    <>
      {config.map((item) => {
        const {
          name,
          label,
          type,
          rules,
          placeholder,
          className,
          options,
          variant,
        } = item;

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
                    <Select
                      {...field}
                      label={label}
                      options={options}
                      variant={variant || "primary"}
                      error={errors[name]?.message}
                    />
                  </div>
                );
              }
              if (type === "date") {
                return (
                  <div className={`mb-4 text-left ${className || ""}`}>
                    <DateInput
                      {...field}
                      label={label}
                      value={field.value || ""}
                      error={errors[name]?.message}
                      variant={variant || "primary"}
                    />
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
                    variant={variant || "primary"}
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
