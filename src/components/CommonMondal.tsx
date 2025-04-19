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
  Message?: string | JSX.Element;
  Message2?: string;
  ButtonMessage?: React.ReactNode;
  WrongButtonMessage?: React.ReactNode;
  loading?: boolean;
  variant: "normal" | "fullscreen";
  isDanger?: boolean;
  onWrongButtonClick?: () => void;
  WrongButtonDisabled?: boolean;
  ButtonDisabled?: boolean;
}


const variantstyles={
  normal : " h-fit w-[90vw] md:w-fit ",
  fullscreen : "h-[80vh] w-[85vw]"
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
  ButtonDisabled = false,
  loading,
  variant,
  isDanger = false,
  onWrongButtonClick,
  WrongButtonDisabled = false,
}: CommonMondalProp) {
  return (
    Copen && (
      <div
        className="w-screen h-screen bg-black/80 font-poppins  z-50 fixed top-0 left-0 flex justify-center items-center"
        onClick={onClose}
      >
        <div
          className="bg-zinc-100 z-50 rounded-xl flex flex-col  "
          onClick={(e) => e.stopPropagation()}
        >
          <div className={clsx("bg-zinc-400/60 dark:bg-zinc-400 z-50  flex flex-col   justify-between rounded-xl ", variantstyles[variant])}>
            
            <div className="flex-col flex  rounded-lg p-2 justify-between h-full ">
                
              <div className="bg-white w-full flex flex-col p-1 font-semibold text-zinc-800 mb-2 rounded-lg h-full">
                <div className="flex z-50 justify-end mb-2  ">
                  <CircleX
                    onClick={onClose}
                    className="cursor-pointer  text-zinc-500 hover:text-zinc-800"
                    size={20}
                    
                  />
                </div>
                <div className="flex mb-4 ml-3 font-medium text-lg">
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
              <div className={`flex justify-center gap-2   w-full `}>
                <div className={`${loading ? "opacity-70" : ""} w-full`}>
               {ButtonMessage && ( <Button
                  variant={isDanger ? "danger" : "new"}
                  children={ButtonMessage}
                  size={"md"}
                  onClick={onConfirm}
                  disabled={ButtonDisabled}
                  loading={false}
                  />)}
                  </div>
                  <div className="w-full">

                {WrongButtonMessage && (
                  <Button
                  variant={"new"}
                  children={WrongButtonMessage}
                  size={"md"}
                  onClick={onWrongButtonClick || onClose}
                  loading={false}
                  disabled={WrongButtonDisabled}
                  />
                )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}