import { ReactElement } from "react";

interface PushButtonsProps {
  variant: "opaque" | "transparent" | "opaque2";
  icon: ReactElement;
  size: "sm" | "md" | "lg";
  onClick?: () => void;
}

const variantstyles = {
  opaque:"bg-zinc-300 dark:bg-zinc-300 dark:text-zinc-900 dark:hover:bg-gray-200 text-black rounded-full hover:bg-zinc-800 hover:text-zinc-200 trasition duration-200 cursor-pointer  flex justify-center items-center",
  opaque2:"bg-white/10 shadow dark:hover:bg-zinc-400/20 dark:text-zinc-900 dark:bg-gray-200 border-gray-300/40 text-gray-300  rounded-full hover:bg-zinc-700 hover:text-gray-300   trasition duration-200  cursor-pointer  flex justify-center items-center",
  transparent:
    "bg-zinc-400 dark:bg-zinc-300  opacity-40 hover:opacity-100 rounded-full text-black font-normal  hover:bg-gray-300 cursor-pointer  trasition duration-200 flex justify-center items-center",
};

const sizeStyles = {
  sm: "px-1 py-1  md:text-xs",
  md: "px-2 py-2  text-md",
  lg: "px-4 py-4 text-lg",
};

export const PushButtons = ({ variant, icon, size, onClick }: PushButtonsProps) => {
  return (
    <div className={sizeStyles[size] + " " + variantstyles[variant]} onClick={onClick}>
      {icon}
    </div>
  );
};
