import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  //   | "icons";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  size: "sm" | "md" | "lg";
}

const variantstyles = {
  primary: "bg-black text-white   hover:bg-zinc-800",
  secondary: "bg-gray-100 text-black  hover:bg-gray-300 ",
  //   icons : "text-gray bg-white border dark:text-white dark:bg-black dark:border rounded-full"
};

const sizeStyles = {
  sm: "px-2 py-1.5 text-sm",
  md: "px-3 py-2 text-md",
  lg: "px-4 py-2 text-lg",
};

const defaultStyles =
  "rounded-lg font-sans font-semibold shadow  flex justify-center items-center";

export const Button = ({
  variant,
  text,
  startIcon,
  endIcon,
  size,
}: ButtonProps) => {
  return (
    <button
      className={
        sizeStyles[size] + " " + variantstyles[variant] + " " + defaultStyles
      }
    >
      <div className="flex justify-center items-center gap-2 ">
        <span>{startIcon}</span>
        <div>{text}</div>
        {endIcon}
      </div>
    </button>
  );
};
