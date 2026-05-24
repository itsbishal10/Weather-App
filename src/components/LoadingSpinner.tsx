function LoadingSpinner() {

  return (
    <div className="mt-6">

      <div
        className="
          w-12
          h-12
          border-4
          border-sky-500
          border-t-transparent
          rounded-full
          animate-spin
        "
      />

    </div>
  );
}

export default LoadingSpinner;