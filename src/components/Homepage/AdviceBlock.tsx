import { ReactNode } from "react";

type AdviceBlockProps = {
  title: ReactNode;
  headerText?: ReactNode;
  footerText?: ReactNode;
  quote?: ReactNode;
  className?: string;
};

const AdviceBlock = ({
  title,
  headerText,
  footerText,
  quote,
  className = "",
}: AdviceBlockProps) => (
  <div className={`mb-8 ${className}`}>
    <h3 className="text-lg font-bold text-blue-900 mb-2">{title}</h3>
    <div className="text-gray-800 text-base leading-relaxed">{headerText}</div>
    {quote}
    <div className="text-gray-800 text-base leading-relaxed mt-5">
      {footerText}
    </div>
  </div>
);

export default AdviceBlock;
