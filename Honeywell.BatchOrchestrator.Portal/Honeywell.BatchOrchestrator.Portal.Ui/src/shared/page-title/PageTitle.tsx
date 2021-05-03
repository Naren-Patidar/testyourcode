export const PageTitle: React.FC<{
  content: string;
  className?: string;
}> = ({ content, className }) => {
  return (
    <div
      className={`font-size-20 text-dark-400 text-semibold ${className ?? ''}`}
    >
      {content}
    </div>
  );
};
