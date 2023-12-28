import { ReactNode, createContext, useMemo, useState } from 'react';

type SearchContext = {
  showSearchWindow: boolean;
  setShowSearchWindow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchContext = createContext<SearchContext>({
  showSearchWindow: false,
  setShowSearchWindow: function (): void {
    throw new Error('Function not implemented.');
  },
});

export const AdvancedSearchProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [showSearchWindow, setShowSearchWindow] = useState(false);

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
