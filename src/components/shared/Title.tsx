const Title = ({
  leftTitle,
  rightTitle,
  hideCenter,
  className = "",
}: {
  leftTitle?: string;
  rightTitle?: string;
  hideCenter?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={`text-2xl md:text-3xl lg:text-4xl font-semibold md:py-5 py-3 mb-6 text-[#1F4F69] tracking-wide text-center flex justify-center items-center md:gap-3 gap-2 ${className}`}
    >
      {leftTitle && (
        <span className=" font-semibold text-2xl md:text-3xl lg:text-4xl">
          {leftTitle}
        </span>
      )}
      {!hideCenter && (
        <p className=" ">
          <span className="font-semibold  text-[#1F4F69] text-2xl md:text-3xl lg:text-4xl">
            সহজ
          </span>
          <span className="text-[#e74c6f] text-2xl font-semibold md:text-3xl lg:text-4xl">
            নিকাহ
          </span>
        </p>
      )}

      {rightTitle && (
        <span className=" font-semibold text-2xl md:text-3xl lg:text-4xl    ">
          {rightTitle}
        </span>
      )}
    </div>
  );
};

export default Title;
