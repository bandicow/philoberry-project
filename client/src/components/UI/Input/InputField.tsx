import { ChangeEvent } from "react";

interface InputFieldProps {
  label: string;
  id: string;
  value: string | number;
  type: string;
  placeholder?: string;
  setValue?(value: string): void;
  setNumberValue?(value: number): void;
  disabled?: boolean;
  required: boolean;
}

export function InputField({
  label,
  id,
  type = "text",
  value,
  setValue,
  setNumberValue,
  placeholder,
  disabled = false,
  required = true,
}: InputFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      // 입력 타입이 number인 경우에만 string을 number로 변환
      setNumberValue && setNumberValue(Number(e.target.value));
    } else {
      setValue && setValue(e.target.value);
    }
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
