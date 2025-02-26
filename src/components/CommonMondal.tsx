// import React from 'react'
import { CircleX } from "lucide-react";
import { Button } from "./Button";
import { ReactElement } from "react";
import clsx from "clsx";

interface CommonMondalProp {
  Copen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  startIcon?: ReactElement;
  Message?: string;
  Message2?: string;
  ButtonMessage?: React.ReactNode;
  WrongButtonMessage?: React.ReactNode;
  loading?: boolean;
  variant: "normal" | "fullscreen";
}


const variantstyles={
  normal : " h-fit w-[90vw] md:w-fit ",
  fullscreen : "h-[90vh] w-[90vw]"
}



export default function CommonMondal({
  Message,
  ButtonMessage,
  onClose,
  Copen,
  onConfirm,
  startIcon,
  Message2,
  WrongButtonMessage,
  loading,
  variant,
}: CommonMondalProp) {
  return (
    Copen && (
      <div
        className="w-screen h-screen bg-black/80   z-40 fixed top-0 left-0 flex justify-center items-center"
        onClick={onClose}
      >
        <div
          className="bg-zinc-100 z-50 rounded-xl flex flex-col m-2 "
          onClick={(e) => e.stopPropagation()}
        >
          <div className={clsx("bg-zinc-400/60 dark:bg-zinc-400 z-50 p-1 flex flex-col   justify-between rounded-xl h-full", variantstyles[variant])}>
            
            <div className="flex-col flex m-1 rounded-lg p-1 justify-between h-full ">
                
              <div className="bg-white w-full flex flex-col p-2 font-semibold text-zinc-800 mb-2 rounded-lg h-full">
                <div className="flex z-50 justify-end ">
                  <CircleX
                    onClick={onClose}
                    className="cursor-pointer hover:text-zinc-500"
                  />
                </div>
                <div className="flex mb-4 justify-center">
                  {startIcon}
                  {Message}
                </div>
                {Message2 && (
                  <div className="flex-1 flex justify-center bg-zinc-400/50 p-4 rounded-md overflow-y-auto">
                    <div className="w-full text-justify font-normal wrap break-words whitespace-pre-wrap">
                      {Message2}
                    </div>
                  </div>
                )}
              </div>
              <div className={`flex justify-end gap-3 px-3 ${loading ? "opacity-70" : ""}`}>
               {ButtonMessage && ( <Button
                  variant={"new"}
                  children={ButtonMessage}
                  size={"md"}
                  onClick={onConfirm}
                  loading={false}
                />)}
                {WrongButtonMessage && (
                  <Button
                    variant={"new"}
                    children={WrongButtonMessage}
                    size={"md"}
                    onClick={onClose}
                    loading={false}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}