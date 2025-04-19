import clsx from "clsx";
import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary" | "round" | "roundchips" | "new" | "load" | "drop" |"danger";
  children: React.ReactNode;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  size: "sm" | "md" | "lg" | "vsm";
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const variantstyles = {
  primary:
    "bg-zinc-900 flex justify-center items-center text-white rounded-lg  w-full   hover:shadow-lg hover:bg-black/60 font-normal trasition duration-200 flex justify-center items-center",
  load:
    "bg-white  flex justify-center items-center text-black rounded-xl  hover:bg-gray-200   font-normal flex justify-center items-center",
  round:
    "bg-zinc-900 flex justify-center items-center dark:border-zinc-700 dark:border dark:text-zinc-900 dark:hover:bg-gray-200 dark:bg-zinc-300 text-white  rounded-full  hover:bg-black/60 font-normal trasition duration-200 flex justify-center items-center",
  roundchips:
    "bg-zinc-700 flex justify-center items-center text-white font-medium rounded-lg  hover:bg-black/60 font-normal  flex justify-center items-center",
  drop: " flex bg-zinc-700 hover:bg-zinc-800  text-zinc-300 dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-800 rounded-lg w-full  ",
  secondary:
    " hover:bg-white/10 flex justify-center  items-center dark:hover:bg-zinc-400/20 dark:text-zinc-900 dark:bg-white border-gray-300/40 text-gray-300 rounded-xl  font-normal bg-zinc-700 hover:text-gray-300   transition duration-200 flex justify-center items-center",
  new: "bg-zinc-700 flex justify-center items-center hover:bg-zinc-700/90  text-gray-100 border-gray-600 border rounded-xl  font-normal hover:shadow-lg w-full   flex justify-center items-center",
  danger: "bg-red-700 r border-red-600 flex justify-center items-center hover:bg-red-700/50  text-gray-100 rounded-xl  font-normal hover:shadow-lg w-full   flex justify-center items-center",
};

const sizeStyles = {
  vsm: "px-2 py-.5 text-[.7rem]",
  sm: "px-4 py-1 text-[.9rem]",
  md: "px-3 py-2 text-sm md:text-md",
  lg: "px-4 py-2 text-lg",
};

const defaultStyles =
  "font-sans font-semibold    cursor-pointer";

export const Button = ({
  variant = "primary",
  children,
  startIcon,
  endIcon,
  size = "md",
  loading = false,
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={clsx(
        sizeStyles[size], 
        variantstyles[variant], 
        defaultStyles, 
        { 
          "opacity-70 cursor-not-allowed": loading || disabled,
          "pointer-events-none": loading 
        }
      )}
    >
      <div className="flex justify-center items-center gap-2 ">
        {startIcon}
        <div>{children}</div>

        {endIcon}
      </div>
    </button>
  );
};
