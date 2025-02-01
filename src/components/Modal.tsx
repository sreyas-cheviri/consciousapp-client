import { CircleX } from "lucide-react";
import { Button } from "./Button";
import { Chips } from "./Chips";
import { Input } from "./Input";
import { useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export function Modal({ open, onClose }: ModalProps) {

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function to restore scrolling when unmounted
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  
  return (
    <div>
      <div
        className={`w-screen h-screen bg-black/80 fixed top-0 left-0 transition-opacity z-40 duration-300 flex justify-center items-center ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose} // Clicking outside should close the modal
      >
        <div
          className={`bg-zinc-100 text-black rounded-2xl  max-w-[90%] max-h-[65%] z-50 transition-opacity duration-500 md:w-[44rem] md:h-[40rem] w-full h-full`}
          onClick={(e) => e.stopPropagation()} // Prevents clicks inside from closing the modal
        >
          <div className="bg-zinc-400/60 p-5 w-full h-full rounded-2xl">
            <div className="flex items-center justify-between w-full text-gray-700">
              <div className="flex-grow flex justify-center">
                <p className="font-bold text-lg">Add your content</p>
              </div>
              <CircleX
                onClick={onClose}
                className="cursor-pointer hover:text-zinc-500"
              />
            </div>

            <div className="flex justify-center text-xs text-gray-600  items-center font-semibold">
              <p className="flex justify-center items-center w-96 text-center">
                Choose an option to get started: Notes, Doc, Image, or URL.
                Select the type of content you want to add!
              </p>
            </div>
            <div className="flex flex-col h-full gap-2">
              <div className="flex gap-1 mt-10 m-2">
                <div className="flex gap-2 mt-2 bg-black/15 p-1 rounded-full">
                  {["Url", "Note", "Doc", "Image"].map((chip, index) => (
                    <Chips key={index} text={chip} />
                  ))}
                </div>
              </div>
              <div>
                <Input placeholder="Title" onChange={() => {}} />
                <Input placeholder="Url/link" onChange={() => {}} />
              </div>
              <div className="mb-6 flex items-end justify-end">
                <Button variant={"round"} children={"Add to Memory"} size={"md"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// function Input({
//   onChange,
//   placeholder,
// }: {
//   onChange: () => void;
//   placeholder: string;
// }) {
//   return (
//     <div className="w-full">
//       <input
//         placeholder={placeholder}
//         type="text"
//         className="px-4 py-3 md:py-4 bg-zinc-200 w-full border-gray-400 border m-1 rounded-lg shadow focus:outline-none "
//         onChange={onChange}
//       />
//     </div>
//   );
// }
