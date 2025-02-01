import React from "react";

interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export function Input({ onChange, placeholder }: InputProps) {
  return (
    <div className="w-full ">
      <input
        placeholder={placeholder}
        type="text"
        className="px-4 py-3 md:py-3 bg-zinc-200 w-full border-gray-400 border m-1 rounded-lg shadow focus:outline-none"
        onChange={onChange}
      />
    </div>
  );
}
