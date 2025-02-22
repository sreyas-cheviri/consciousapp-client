// import React from 'react'
import { CircleX } from "lucide-react";
import { Button } from "./Button";
import { ReactElement } from "react";

interface CommonMondalProp {
  Copen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  startIcon?: ReactElement;
  Message: string;

  Message2?: string;
  ButtonMessage: React.ReactNode;
  WrongButtonMessage?: React.ReactNode;
  loading?: boolean;
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
}: CommonMondalProp) {
  return (
    Copen && (
      <div
        className="w-screen h-screen bg-black/80 z-0 fixed top-0 left-0 flex justify-center items-center"
        onClick={onClose}
      >
        <div
          className="bg-zinc-100 z-50 rounded-xl  "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-zinc-400/60 dark:bg-zinc-400 z-50 p-1 md:w-96 h-fit flex-col justify-between rounded-xl">
            
            <div className="flex-col flex h-[60%]  bg-zinc-200  m-1 rounded-lg p-1 justify-between">
                
              <div className="bg-white w-full justify-center flex-col p-2  font-semibold text-zinc-800 h-fit  mb-2 rounded-lg ">
              <div className="flex z-50 justify-end mb-3">
              <CircleX
                onClick={onClose}
                className="cursor-pointer hover:text-zinc-500 "
              />
            </div>
                <div className="flex mb-6 justify-center">
                  {startIcon}
                  {Message}
                </div>
                {Message2 && (
                  <div className="flex justify-center bg-gray-200 p-1 rounded-md">
                    {Message2}
                  </div>
                )}
              </div>
              <div className={`flex justify-end gap-3 px-3 ${loading ? "opacity-70" : ""}`}>
                <Button
                  variant={"new"}
                  children={ButtonMessage}
                  size={"md"}
                  onClick={onConfirm}
                  loading={false}
                />
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
