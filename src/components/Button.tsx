import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary" | "round";
  text: string | React.ReactNode;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  size: "sm" | "md" | "lg";
  onClick?: () => void;
}

const variantstyles = {
  primary: "bg-zinc-900 text-white rounded-lg   hover:bg-black/60 font-normal trasition duration-200 flex justify-center items-center",
  round: "bg-zinc-900 text-white  rounded-full  hover:bg-black/60 font-normal trasition duration-200 flex justify-center items-center",
  secondary: "bg-gray-200 text-black rounded-lg  font-normal  hover:bg-gray-300   trasition duration-200 flex justify-center items-center",
};

const sizeStyles = {
  sm: "px-1.5 py-2 text-[.9rem]",
  md: "px-3 py-2 text-md",
  lg: "px-4 py-2 text-lg",
};

const defaultStyles =
  "font-sans font-semibold shadow  flex justify-center items-center cursor-pointer";

export const Button = ({
  variant,
  text,
  startIcon,
  endIcon,
  size, onClick
}: ButtonProps) => {
  return (
    <button
    onClick={onClick}
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
