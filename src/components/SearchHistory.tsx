type SearchHistoryProps = {
  history: string[];
  onSelect: (city: string) => void;
};

function SearchHistory({ history, onSelect }: SearchHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-md mt-4">
      <p className="text-slate-400 text-xs mb-2 uppercase tracking-widest">
        Recent searches
      </p>

      <div className="flex gap-2 flex-wrap">
        {history.map((city) => (
          <button
            key={city}
            onClick={() => onSelect(city)}
            className="
              bg-slate-700
              text-white
              text-sm
              px-4
              py-1.5
              rounded-lg
              hover:bg-slate-600
              transition
              border
              border-slate-600
              hover:border-slate-500
            "
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory;