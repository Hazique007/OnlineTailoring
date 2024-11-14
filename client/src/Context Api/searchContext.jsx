import React, { useState, createContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";
const SearchContext = createContext();

const SearchContextProvider = ({ children }) => {
  const [isSearch, setIsSearch] = useState(false);
  // const [searchParams, setSearchParams] = useSearchParams();
  let [query, setQuery] = useState({
    gender: "",
    category: "",
  });

  return (
    <SearchContext.Provider
      value={{
        isSearch,
        setIsSearch,
        query,
        // searchParams,
        // setSearchParams,
        setQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchContextProvider };
export default SearchContextProvider;
