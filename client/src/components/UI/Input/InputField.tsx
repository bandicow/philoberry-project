"use client";
import { ChangeEvent } from "react";

interface InputFieldProps {
  label: string;
  id: string;
  value: string | number;
  type: string;
  placeholder?: string;
  onChange(value: string | number): void;
  disabled?: boolean;
  required: boolean;
}

export function InputField({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled = false,
  required = true,
}: InputFieldProps) {
  // 0을 위해 일단 string으로 하고 api에서 number로 바꿔줌
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex justify-between mb-2 tabletLandscape:block">
      <label htmlFor={id} className="block mb-2 mr-3 font-bold min-w-[100px]">
        {label}
      </label>
      <input
        {...(type === "number" ? { min: "0" } : {})}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        required={required}
        id={id}
        value={value}
        onChange={handleChange}
        className="w-4/5 tabletLandscape:w-full border rounded px-1 py-0.5 border-gray-300 focus:border-gray-700"
      />
    </div>
  );
}
