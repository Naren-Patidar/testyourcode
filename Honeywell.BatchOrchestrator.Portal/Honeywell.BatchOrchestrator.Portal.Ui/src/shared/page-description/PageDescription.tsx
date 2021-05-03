export const PageDescription: React.FC<{
  content: string;
  className?: string;
}> = ({ content, className }) => {
  return (
    <div className={`font-size-14 text-dark-400 mt-2 ${className ?? ''}`}>
      {content}
    </div>
  );
};
