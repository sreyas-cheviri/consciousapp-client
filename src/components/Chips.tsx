
import CircleIcon from '@mui/icons-material/Circle';
interface ChipsProps {
    text : string;
}


export const Chips= ({text} : ChipsProps) => {
    return (
        <button className="bg-zinc-900  w-fit p-1 px-2 rounded-full text-zinc-400 transition-all duration-100   flex gap-1  ease-in-out hover:text-orange-600 border border-zinc-600 hover:border-orange-600 items-center group">
          <div className="flex gap-1 items-center  ">
            {/* Circle Icon with transition */}
            <div className="hidden group-hover:flex items-center  transition-all duration-100  opacity-0 group-hover:opacity-100 ">
              <CircleIcon style={{ fontSize: 12 }} />
            </div>
            <div className="text-xs  transition-all duration-100">
              {text}
            </div>
          </div>
        </button>
      );
      
      
}