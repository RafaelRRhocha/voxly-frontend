interface LoadingProps {
  size?: number;
  label?: string;
}

const Loading = ({ size = 8, label }: LoadingProps) => {
  return (
    <div className="flex items-center justify-center size-full">
      <div
        className="animate-spin rounded-full border-b-2 border-gray-900"
        style={{
          width: `${size * 4}px`,
          height: `${size * 4}px`,
        }}
      ></div>
      {label && <span className="ml-2">{label}</span>}
    </div>
  );
};

export default Loading;
