type ErrorMessageProps = {
  message: string;
};

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div
      className="
        mt-6
        w-full
        max-w-md
        bg-red-500/10
        border
        border-red-500/30
        text-red-400
        px-5
        py-4
        rounded-2xl
        flex
        items-start
        gap-3
      "
    >
      <span className="text-xl leading-none mt-0.5">⚠️</span>

      <div>
        <p className="font-semibold text-red-300">
          Something went wrong
        </p>
        <p className="text-sm mt-1 text-red-400">
          {message}
        </p>
      </div>
    </div>
  );
}

export default ErrorMessage;