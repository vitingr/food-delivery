export interface GoogleAuth {
  clientId: string;
  clientSecret: string;
}

export interface FeaturedRestaurant {
  image: string;
  name: string;
  branch?: string;
  verified?: Boolean;
}

export interface SmallRestaurantOption {
  color: string;
  name: string;
  image: string;
}

export interface RestaurantOption {
  image: string;
  name: string;
  stars: number;
  branch: string;
  distance: number;
  deliveryTime: string;
  deliveryValue: number | string;
}

export interface CreateRestaurantForm {
  step: number;
}

export interface UserContextProps {
  data: Object;
  setData: React.Dispatch<React.SetStateAction<Object>>;
  getInfo: () => Promise<void>;
}