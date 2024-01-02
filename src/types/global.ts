export type Item = {
  foodType: string;
  itemImage?: string;
  itemImageName?: string;
  itemName: string;
  price: number;
  description: string;
  spicyMeter: number;
  categories: string[];
  limit: number;
  _id: string;
  isAvailable?: boolean;
  isPopular?: boolean;
  isWishlist?: boolean;
  averageRating: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ItemModel = {
  allItems: Array<Item>;
};
