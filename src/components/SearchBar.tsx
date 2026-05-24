type SearchBarProps = {
  city: string;
  setCity: (value: string) => void;
  loading?: boolean;
};

function SearchBar({
  city,
  setCity,
  loading = false,
}: SearchBarProps) {

  return (
    <div className="w-full max-w-md">

      <input
        type="text"
        placeholder="Search city..."
        value={city}
        disabled={loading}
        onChange={(e) => setCity(e.target.value)}
        className="
          w-full
          p-4
          rounded-2xl
          bg-slate-800
          text-white
          outline-none
          border
          border-slate-700
          placeholder:text-slate-400
          focus:border-sky-500
          transition
          disabled:opacity-50
        "
      />

    </div>
  );
}

export default SearchBar;