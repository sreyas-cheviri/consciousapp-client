import { AddIcon } from "../icons/AddIcon";
import { Delete } from "../icons/Delete";
import { ShareIcon } from "../icons/ShareIcon";

export const Card = () =>{
    return (
  <div className="border max-w-64 bg-white rounded-lg shadow-lg p-2 m-10  ">
    <div className="flex justify-between bg-gray-200 p-2  gap-5 rounded-lg">
        <div className=" flex items-center gap-2">
            <button className=" bg-gray-300 rounded-lg p-1  border border-gray-400 hover:bg-gray-400  transition duration-300 ">

            <AddIcon/>
            </button>
             <h2 className="text-sm font-semibold">Sreyas website </h2>          
        </div>
        <div className=" flex items-center gap-2  ">
            <button className=" bg-gray-300 rounded-lg p-1 border border-gray-400 hover:bg-gray-400 transition duration-300  ">

            <ShareIcon/>          
            </button>
            <button className=" bg-gray-300 rounded-lg p-1  border border-gray-400 hover:bg-gray-400 duration-300">

            <Delete/>          
            </button>
        </div>
    </div>

   


    

  </div>
    
);
}