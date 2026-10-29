import { FaFilter } from "react-icons/fa";

const FilterButton = () => {
  return (
    <button
      type="button"
      className="shrink-0 whitespace-nowrap rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-700 dark:text-slate-50 dark:hover:bg-neutral-600"
    >Filter
    <FaFilter/> 
    </button>
  );
};

export default FilterButton;
