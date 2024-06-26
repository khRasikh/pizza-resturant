"use client";

import { useTranslations } from "next-intl";
import { ISearchBar } from "../interface/general";

const SearchBar = ({ onSearch, placeholderValue = "" }: ISearchBar) => {
  const t = useTranslations("PageLayout");

  const handleSearchTerm = (e: any) => {
    const value = e.target.value;
    onSearch(value);
  };

  return (
    <div className="max-w-2xl mx-auto p-2">
      <form className="flex items-center">
        <div className="w-full">
          <div className="flex absolute pt-4 items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
            </svg>
          </div>
          <input
            autoFocus
            maxLength={50}
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md font-bold rounded-lg focus:ring-blue-500 focus:border-green block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={placeholderValue || t("search.name") + " ..."}
            onChange={handleSearchTerm}
          />
        </div>
      </form>

    </div>

  );
};

export default SearchBar;
