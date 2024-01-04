import React, { ReactNode, createContext, useMemo, useState } from 'react';
import { Profile } from '../../types/global';

type SearchContext = {
  profile: Profile | null;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
};

export const SearchContext = createContext<SearchContext>({
  profile: null,
  setProfile: () => {
    throw new Error('Function not implemented.');
  },
});

export const AdvancedSearchProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  const context: SearchContext = useMemo(
    () => ({
      profile,
      setProfile,
    }),
    [profile]
  );

  return (
    <SearchContext.Provider value={context}>{children}</SearchContext.Provider>
  );
};
