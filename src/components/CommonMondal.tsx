// import React from 'react'
import { CircleX } from "lucide-react";
import { Button } from "./Button";

interface CommonMondalProp {
  Copen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  Message: string;
  ButtonMessage: string;
}

export default function CommonMondal({
  Message,
  ButtonMessage,
  onClose,Copen,onConfirm
}: CommonMondalProp) {
  return (
       Copen && (
    <div className="w-screen h-screen bg-black/80  fixed top-0 left-0 z-40 flex justify-center items-center"    onClick={onClose}>
      <div className="bg-zinc-100  rounded-xl  ">
        <div className="bg-zinc-400/60 p-1 md:w-96 h-fit flex-col justify-between rounded-xl">
          <div className="flex justify-end p-2">
            <CircleX
              onClick={onClose}
              className="cursor-pointer hover:text-zinc-500"
            />
          </div>
          <div className="flex-col flex h-[60%]  bg-zinc-200  m-1 mt-4 rounded-lg p-1 justify-between">
            <div className="bg-white w-full justify-center flex p-2 py-5 font-semibold text-zinc-800 h-fit  mb-2 rounded-lg ">
              {Message}
            </div>
            <div className="flex justify-end">
              <Button
                variant={"new"}
                children={ButtonMessage}
                size={"md"}
                onClick={onConfirm}
              />
            </div>
          </div>
        </div>
      </div>
    </div> )
  );
}
