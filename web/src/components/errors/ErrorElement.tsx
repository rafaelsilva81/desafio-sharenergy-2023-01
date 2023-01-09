const ErrorElement = ({ message }: { message: string }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="text-2xl text-gray-400">{message}</div>
      </div>
    </div>
  );
};

export default ErrorElement;
