const TooltipItem = ({
  children,
  tooltipsText,
  position
}: {
  children: React.ReactNode;
  tooltipsText: string;
  position: 'right' | 'left' | 'top' | 'bottom';
}) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/4">
      <div className="mb-14">
        <div className="group relative inline-block">
          <button className="bg-primary inline-flex rounded py-2 text-base font-semibold text-white">
            {children}
          </button>
          <div
            className={` ${
              (position === 'right' &&
                `absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded bg-black px-4 py-[6px] text-sm font-semibold text-white opacity-0 group-hover:opacity-100`) ||
              (position === 'top' &&
                `absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded bg-black px-4 py-[6px] text-sm font-semibold text-white opacity-0 group-hover:opacity-100`) ||
              (position === 'left' &&
                `absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded bg-black px-4 py-[6px] text-sm font-semibold text-white opacity-0 group-hover:opacity-100`) ||
              (position === 'bottom' &&
                `absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded bg-black px-4 py-[6px] text-sm font-semibold text-white opacity-0 group-hover:opacity-100`)
            }`}
          >
            <span
              className={` ${
                (position === 'right' &&
                  `absolute left-[-3px] top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rotate-45 rounded-sm bg-black`) ||
                (position === 'top' &&
                  `absolute bottom-[-3px] left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-black`) ||
                (position === 'left' &&
                  `absolute right-[-3px] top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rotate-45 rounded-sm bg-black`) ||
                (position === 'bottom' &&
                  `absolute left-1/2 top-[-3px] -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-black`)
              } `}
            ></span>
            {tooltipsText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TooltipItem;
