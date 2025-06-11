

interface LoadingCardProps {
  className?: string;
}

const LoadingCard: React.FC<LoadingCardProps> = ({ className }) => {
  // Generate random height between 200px and 400px
  const randomHeight = Math.floor(Math.random() * 200) + 200;

  return (
    <div className={`break-inside-avoid mb-4 px-2  ${className}`}>
      <div 
        className="bg-zinc-700/30 dark:bg-zinc-400/30 rounded-xl p-1.5 animate-pulse min-w-64 md:min-w-60 w-full"
        style={{ minHeight: `${randomHeight}px` }}
      >
        {/* Content area */}
        <div className="bg-zinc-600/50 dark:bg-zinc-500/50 rounded-xl w-full mb-4"
          style={{ minHeight: `${randomHeight-200}px` }}>
        </div>
        
        {/* Header with logo and title */}
        <div className='flex items-center gap-2 justify-between p-2'>
          <div className="flex gap-2 items-center">
            <div className="rounded-xl p-1 text-gray-700 bg-zinc-400/50">
              <div className="h-4 w-4 bg-zinc-600/50 dark:bg-zinc-500/50 rounded-full"></div>
            </div>
            <div className="h-5 bg-zinc-600/50 dark:bg-zinc-500/50 rounded w-32"></div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-1 p-2">
          <div className="h-6 w-6 bg-zinc-600/50 dark:bg-zinc-500/50 rounded-lg"></div>
          <div className="h-6 w-6 bg-zinc-600/50 dark:bg-zinc-500/50 rounded-lg"></div>
        </div>

        {/* Date */}
        <div className="px-2 pb-2">
          <div className="h-3 bg-zinc-600/50 dark:bg-zinc-500/50 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard; 