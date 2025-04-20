// import React from "react";
import clsx from "clsx";
import { ReactElement } from "react";

interface InputProps {
  // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  variant: "primary" | "secondary";
  reference? : React.RefObject<HTMLInputElement> | undefined;
  maxlength? : number;
  type? : string;
  required?: boolean;
  onChange?: () => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  endICon? : ReactElement;
}

const variantstyles = {
  primary:
    "w-full px-4 py-3 md:py-3 bg-zinc-200  border border-gray-400 rounded-lg shadow text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500",
  secondary:
    "w-full px-2 py-2 md:py-2 bg-zinc-100  border border-gray-300 rounded-lg shadow text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400",
};

export function Input({ placeholder, variant, reference, maxlength, required, type, onKeyDown, endICon }: InputProps) {
  return (
    <div className="relative w-full">
      <input
        placeholder={placeholder}
        ref={reference}
        type={type}
        maxLength={maxlength}
        onKeyDown={onKeyDown}
        required={required}
        className={clsx(
          variantstyles[variant],
          endICon && "pr-10" // Add padding-right when there's an end icon
        )}
      />
      {endICon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {endICon}
        </div>
      )}
    </div>
  );
}

