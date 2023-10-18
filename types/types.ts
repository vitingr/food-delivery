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

export interface RestaurantData {
  id: string;
  email: string;
  cellphone: string;
  ownerName: string;
  ownerLastname: string;
  cpf: string;
  rg: string;
  orgaoEmissor: string;
  cnpj: string;
  restaurantName: string;
  telephone: string;
  street: string;
  city: string;
  state: string;
  address: number;
  speciality: string;
  delivery: string;
  deliveryValue: string;
  deliveryTime: string;
  stars: number;
  logo: string;
}

export interface EditMenu {
  currentSection: string;
  restaurantId: string;
}

export interface Button {
  text: string;
  handleClick?: () => void; 
}