interface QuoteProps {
  preText?: string;
  text: string;
  author?: string;
  className?: string;
}

const Quote = ({ preText, text, author, className = "" }: QuoteProps) => (
  <div>
    {preText && <p className="text-gray-600 mt-5">{preText}</p>}
    <div
      className={`my-3 p-3 border-l-4 border-yellow-400 bg-yellow-50 italic ${className}`}
    >
      <p className="mb-1 text-gray-600">{text}</p>
      {author && (
        <div className="text-right font-semibold text-yellow-700">
          — {author}
        </div>
      )}
    </div>
  </div>
);

export default Quote;
