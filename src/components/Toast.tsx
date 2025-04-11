import { Loader2 } from "lucide-react";

interface ToastProps {
  loading: boolean;
}

export default function Toast({ loading }: ToastProps) {
  return (
    <div className={`fixed bottom-4 right-5 flex justify-center shadow-gray-800 shadow-2xl w-72 z-50 h-14 p-2 bg-red-800 rounded-lg border border-red-600 transition-all duration-500 ease-in-out transform ${
      loading ? 'translate-y-0 opacity-100' : 'translate-y-28 opacity-0'
    }`}>
      <div className="flex gap-5  items-center "> 
        <Loader2 className="h-6 w-6  text-white animate-spin" />
        <div className="gap-0 flex-col text-white">

        <p className=" ">Adding Your Content....</p>
        <p className="text-xs"> this may take few seconds </p>
        </div>
      </div>
    </div>
  );
}
