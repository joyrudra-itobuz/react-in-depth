import React, {
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type SearchContext = {
  showSearchWindow: boolean;
  setShowSearchWindow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchContext = createContext<SearchContext>({
  showSearchWindow: false,
  setShowSearchWindow: () => {
    throw new Error('Function not implemented.');
  },
});

export const AdvancedSearchProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [showSearchWindow, setShowSearchWindow] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showSearchWindow ? 'hidden' : 'auto';
  }, [showSearchWindow]);

  const context: SearchContext = useMemo(
    () => ({
      showSearchWindow,
      setShowSearchWindow,
    }),
    [showSearchWindow]
  );

  return (
    <SearchContext.Provider value={context}>{children}</SearchContext.Provider>
  );
};
