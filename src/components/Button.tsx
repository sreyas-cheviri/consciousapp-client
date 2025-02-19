import clsx from "clsx";
import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary" | "round" | "roundchips" | "new";
  // text : string | React.ReactNode; text is restrictive, children makes the component more flexible:
  children: React.ReactNode;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  size: "sm" | "md" | "lg" | "vsm";
  onClick?: () => void;
  loading?: boolean;
}

const variantstyles = {
  primary:
    "bg-zinc-900  text-white rounded-lg   hover:bg-black/60 font-normal trasition duration-200 flex justify-center items-center",
  round:
    "bg-zinc-900 dark:border-zinc-700 dark:border dark:text-zinc-900 dark:hover:bg-gray-200 dark:bg-zinc-300 text-white  rounded-full  hover:bg-black/60 font-normal trasition duration-200 flex justify-center items-center",
  roundchips:
    "bg-zinc-700 text-white font-medium rounded-lg  hover:bg-black/60 font-normal  flex justify-center items-center",
  secondary:
    "bg-white/10 dark:bg-zinc-300 dark:text-zinc-900 dark:hover:bg-gray-200 border-gray-300/40 text-gray-300 rounded-full  font-normal  hover:bg-zinc-700 hover:text-gray-300   transition duration-200 flex justify-center items-center",
  new: "bg-zinc-700    text-gray-300 border-gray-600 border rounded-xl  font-normal hover:shadow-lg w-full   flex justify-center items-center",
};

const sizeStyles = {
  vsm: "px-2 py-.5 text-[.7rem]",
  sm: "px-4 py-1 text-[.9rem]",
  md: "px-3 py-2 text-md",
  lg: "px-4 py-2 text-lg",
};

const defaultStyles =
  "font-sans font-semibold shadow  flex justify-center items-center cursor-pointer";

export const Button = ({
  variant = "primary",
  children,
  startIcon,
  endIcon,
  size = "md",
  loading,
  onClick,
  
}: ButtonProps) => {
  return (
    <button
      //  type="button" //it’s a good practice to add type="button" to avoid accidental form submissions.
      onClick={onClick}
      // className={sizeStyles[size] + " " + variantstyles[variant] + " " + defaultStyles// }
      className={clsx(
        sizeStyles[size], 
        variantstyles[variant], 
        defaultStyles, 
        { "opacity-50 cursor-not-allowed": loading } // Conditionally apply styles if `loading` is true
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
