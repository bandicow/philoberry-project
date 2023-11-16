"use client";
import { ChangeEvent } from "react";
import { useEffect } from "react";

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
  useEffect(() => {
    console.log(`Value of ${id} changed to ${value}`); // 로그 추가
  }, [id, value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 입력 타입이 number인 경우에만 string을 number로 변환
    type === "number"
      ? onChange(Number(e.target.value))
      : onChange(e.target.value);
  };

  return (
    <div className="flex justify-between mb-2 tabletLandscape:block">
      <label htmlFor={id} className="block mb-2 mr-3 font-bold min-w-[100px]">
        {label}
      </label>
      <input
        min="0"
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        required={required}
        id={id}
        value={value}
        onChange={handleChange}
        className="w-4/5 border rounded px-1 py-0.5 border-gray-300 focus:border-gray-700"
      />
    </div>
  );
}
