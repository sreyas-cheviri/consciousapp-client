
import CircleIcon from '@mui/icons-material/Circle';
interface ChipsProps {
    text : string;
}


export const Chips= ({text} : ChipsProps) => {
    return (
        <button className="bg-black w-fit p-1 px-2 rounded-full text-gray-400   flex gap-1  ease-in-out hover:text-orange-600 border border-gray-400 hover:border-orange-600 items-center group">
          <div className="flex gap-1 items-center  ">
            {/* Circle Icon with transition */}
            <div className="hidden group-hover:flex items-center  opacity-0 group-hover:opacity-100 ">
              <CircleIcon style={{ fontSize: 12 }} />
            </div>
            <div className="text-xs">
              {text}
            </div>
          </div>
        </button>
      );
      
      
}