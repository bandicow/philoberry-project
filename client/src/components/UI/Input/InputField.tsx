import { ChangeEvent } from "react";

interface StringInputFieldProps {
  label: string;
  id: string;
  value: string;
  type: string;
  placeholder?: string;
  setValue(value: string): void;
  disabled?: boolean;
}

export function StringInputField({
  label,
  id,
  type = "text",
  value,
  setValue,
  placeholder,
  disabled = false,
}: StringInputFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="mb-2">
      <label htmlFor={id} className="block mb-2 font-bold">
        {label}
      </label>
      <input
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        required
        id={id}
        value={value}
        onChange={handleChange}
        className="w-full border rounded px-1 py-0.5 border-gray-300 focus:border-gray-700"
      />
    </div>
  );
}

interface NumberInputFieldProps {
  label: string;
  id: string;
  value: number;
  type: string;
  placeholder?: string;
  setValue(value: number): void;
}

export function NumberInputField({
  label,
  id,
  type = "text",
  placeholder,
  value,
  setValue,
}: NumberInputFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Only call setValue when inputValue is not empty
    if (inputValue !== "") {
      setValue(Number(inputValue));
    }
  };

  return (
    <div className="mb-2">
      <label htmlFor={id} className="block mt-2 mb-2 font-bold">
        {label}
      </label>
      <input
        min="0"
        type={type}
        required
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        autoComplete="off"
        className="w-full border rounded px-1 py-0.5 border-gray-300 focus:border-gray-700"
      />
    </div>
  );
}