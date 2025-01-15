import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  //   | "icons";
  text: string | React.ReactNode;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  size: "sm" | "md" | "lg";
}

const variantstyles = {
  primary: "bg-black text-white   hover:bg-zinc-900 font-normal trasition duration-200 flex justify-center items-center",
  secondary: "bg-gray-100 text-black font-normal  hover:bg-gray-300   trasition duration-200 flex justify-center items-center",
    // icons : "text-gray bg-white border dark:text-white dark:bg-black dark:border rounded-full"
};

const sizeStyles = {
  sm: "px-1.5 py-2 text-sm",
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
       {startIcon}
        <div>{text}</div>
        {endIcon}
      </div>
    </button>
  );
};
