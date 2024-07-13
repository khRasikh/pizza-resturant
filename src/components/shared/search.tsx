"use client";

import { useTranslations } from "next-intl";
import { ISearchBar } from "../interface/general";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { changeKasset } from "./kasset";

const SearchBar = ({ onSearch, placeholderValue = "", searchTerm }: ISearchBar) => {
  const t = useTranslations("PageLayout");
  const [searchTermNew, setSearchTermNew] = useState<string | undefined>(searchTerm);

  const handleSearchTerm = (e: any) => {
    const value = e.target.value;
    // onSearch(value); // for onchange search
    setSearchTermNew(value);
  };

  const handleSubmitSearch = (e: any) => {
    e.preventDefault();
    onSearch(searchTermNew as string);
    setSearchTermNew("");
  };

  const firstInputRef = useRef<HTMLInputElement>(null); // Initialize useRef with proper type

  if (firstInputRef.current !== null && firstInputRef.current !== undefined) {
    firstInputRef.current.focus(); // Focus the input element
  }

  const route = useRouter();
  const handlePressKey = (e: any) => {
    // a. close or reload window
    if (e.key === "Escape") {
      e.preventDefault();
      window.location.reload();
    
      // b. redirect to orders list
    } else if (e.key === "F3") {
      e.preventDefault();
      route.push("/orders");
      // c. reload or refresh page
    } else if (e.key === "F2" && !e.ctrlKey) {
      window.location.reload();
      // d. change kasset number 
    } else if (e.ctrlKey && e.key === "1") {
      e.preventDefault();
      changeKasset("1");
    } else if (e.ctrlKey && e.key === "2") {
      e.preventDefault();
      changeKasset("2");
    }
  };

  return (
    <div onKeyDown={(e) => handlePressKey(e)} className="max-w-2xl mx-auto p-2">
      <form className="flex items-center" onSubmit={handleSubmitSearch}>
        <div className="w-full">
          <div className="flex absolute pt-4 items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            autoFocus
            ref={firstInputRef}
            maxLength={50}
            value={searchTermNew}
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
