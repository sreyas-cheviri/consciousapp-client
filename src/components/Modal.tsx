import { CircleX } from "lucide-react";
import { Button } from "./Button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export function Modal({ open, onClose }: ModalProps) {
  return (
    <div>
      <div
        className={`w-screen h-screen bg-black/80 fixed top-0 left-0 transition-opacity z-40 duration-300 flex justify-center items-center ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`bg-zinc-100 text-black rounded-2xl p-1 max-w-[90%] max-h-[60%] z-50 transition-opacity duration-500 md:w-[38rem] md:h-[38rem] w-full h-full`}
        >
          <div className="bg-zinc-400/60 p-5 w-full h-full rounded-2xl">
            <div className="flex justify-between text-gray-700 ">
              <img
                src="../src/assets/logo.png"
                alt=""
                srcSet=""
                className="w-7 h-7 rounded-full"
              />
              <p> Add your content</p>
              <CircleX
                onClick={onClose}
                className="cursor-pointer hover:text-zinc-500"
              />
            </div>
            <div className="flex flex-col h-full gap-4 justify-between">
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
              <div className="mb-6 flex justify-end">
                <Button variant={"round"} text={"Add to Memory"} size={"md"} />
              </div>
            </div>
          </div>
        </div>
      </div>
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
        className="px-4 py-3 md:py-4 bg-zinc-200 w-full border-gray-400 border m-1 rounded-lg shadow focus:outline-none "
        onChange={onChange}
      />
    </div>
  );
}
