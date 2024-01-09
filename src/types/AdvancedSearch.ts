export type LocalStorageHistoryData = {
  _id: string;
  itemName: string;
  price: number;
  itemImage: string;
};

export type SearchHistory = LocalStorageHistoryData & {
  link: string;
};
