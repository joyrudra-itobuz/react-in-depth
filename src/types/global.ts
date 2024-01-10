export type Item = {
  foodType: string;
  itemImage?: string;
  itemImageName?: string;
  thumbnail?: string;
  thumbnailName?: string;
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

export type LogInType = {
  email: string;
  password: string;
};

export type Profile = {
  userType: string;
  name?: string;
  email: string;
  phoneNumber?: number;
  password: string;
  hasOnboarded: boolean;
  isActive?: boolean;
  profileImage?: string;
  imageName?: string;
  lastLogin?: string;
  deleteStatus?: boolean;
  outlets?: Array<string>;
};

export type LoginResponse = {
  userDetails: Profile;
  accessToken: string;
  refreshToken: string;
};
