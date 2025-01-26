import { CircleX } from "lucide-react";
import { Button } from "./Button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export function Modal({ open, onClose }: ModalProps) {
  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-black/80 fixed top-0 left-0 flex justify-center items-center">
          <div className="bg-zinc-100 text-black rounded-2xl p-1 max-w-[80%] max-h-[50%] md:w-[28rem] md:h-[28rem] w-full h-full">
            <div className="bg-zinc-300 p-5 w-full h-full rounded-2xl">
              <div
                className="flex justify-end text-gray-700 cursor-pointer hover:text-zinc-500"
                onClick={onClose}
              >
                <CircleX />
              </div>
              <div className="mt-6">
                <Input
                  placeholder="Title"
                  onChange={() => {
                    throw new Error("Function not implemented.");
                  }}
                />
                <Input
                  placeholder="Url/link"
                  onChange={() => {
                    throw new Error("Function not implemented.");
                  }}
                />
              </div>
              <div className="m-2">
              <Button variant={"primary"} text={"Submit"} size={"lg"} />

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({
  onChange,
  placeholder,
}: {
  onChange: () => void;
  placeholder: string;
}) {
  return (
    <div className="w-full">
      <input
        placeholder={placeholder}
        type="text"
        className="px-4 py-3 md:py-4 bg-white w-full border-gray-400 border m-1 rounded-md focus:outline-none "
        onChange={onChange}
      />
    </div>
  );
}
