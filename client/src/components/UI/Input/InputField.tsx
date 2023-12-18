"use client";
import { ChangeEvent } from "react";

interface InputFieldProps {
  label: string;
  id: string;
  value: string | number;
  type: string;
  index: number; // 추가된 prop
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
  index,
  placeholder,
  disabled = false,
  required = true,
}: InputFieldProps) {
  const colorValue = type === "color" && value === "" ? "#000000" : value;
  const uniqueId = `${id}-${index}`; // 고유한 ID 생성

  // 0을 위해 일단 string으로 하고 api에서 number로 바꿔줌
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex justify-between mb-2" id={`${uniqueId}+${index}`}>
      <div className="block mb-2 mr-3 font-bold min-w-[100px]">{label}</div>
      <input
        {...(type === "number" ? { min: "0" } : {})}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        required={required}
        id={uniqueId}
        value={colorValue}
        onChange={handleChange}
        className="w-4/5 tabletLandscape:w-full border rounded px-1 py-0.5 border-gray-300 bg-gray-100 focus:bg-gray-300 focus:border-gray-500"
      />
    </div>
  );
}
