import { Loader } from "lucide-react";

interface ToastProps {
  loading: boolean;
}

export default function Toast({ loading }: ToastProps) {
  return (
    <div className={`fixed bottom-4 right-5 flex justify-center shadow-gray-800 shadow-2xl w-fit z-50 h-fit px-10 py-3 bg-white text-black dark:text-white  dark:bg-black rounded-lg border border-zinc-600 transition-all duration-500 ease-in-out transform ${
      loading ? 'translate-y-0 opacity-100' : 'translate-y-28 opacity-0'
    }`}>
      <div className="flex gap-5  items-center "> 
        <Loader className="h-6 w-6 duration-1000  animate-spin" />
        <div className="gap-0 flex-col ">

        <p className=" font-semibold ">Adding Your Content..</p>
        <p className="text-xs text-gray-800 dark:text-gray-400"> this may take few seconds </p>
        </div>
      </div>
    </div>
  );
}
