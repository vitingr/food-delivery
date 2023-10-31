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
  speciality: string;
}

export interface RestaurantOption {
  restaurantId: string;
  image: string;
  name: string;
  stars: number;
  branch: string;
  distance: number;
  deliveryTime: string;
  deliveryValue: number | string;
  isOpen: boolean;
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
  restaurantData: any;
  getRestaurantData: any
}

export interface Button {
  text: string;
  handleClick?: () => void;
}

export interface UploadProps {
  setState: (value: string) => void;
  currentFoto: string;
  styles?: string
}

export interface UserProps {
  id: string;
  name: string;
  firstname: string;
  lastname: string;
  email: string;
  partner: boolean;
  money: number;
  photo: string;
  address: string;
  favorites: string;
}

export interface ProductProps {
  id: string,
  restaurant: string,
  category: string,
  productName: string,
  productDescription: string,
  productValue: number,
  productFoto: string,
}

export interface PurchaseProps {
  id: string;
  user: string;
  restaurant: string;
  products: string;
  quantity: number;
  totalValue: number;
  commentaries: string;
  paymentMethod: string;
  takeOption: string;
  deliveryAddress: string;
  deliveryPlace: string;
  restaurantName: string;
  restaurantLogo: string
  deliveryTime: string;
  deliveryValue: number;
  delivered: boolean;
}

export interface AddressProps {
  id: string;
  user: string;
  state: string;
  city: string;
  street: string;
  address: number;
}

export interface CategoryProps {
  id: string;
  restaurant: string;
  categoryName: string;
  categoryDescription: string;
  quantityItems: number;
}

export interface MainConfig {
  restaurantId: string;
  restaurantData: any;
  getRestaurantData: any
}

export interface RestaurantProps {
  id: string;
  ownerId: string;
  cellphone: string;
  ownerName: string;
  ownerLastname: string;
  restaurantName: string;
  telephone: string;
  street: string;
  city: string;
  state: string;
  address: number;
  speciality: string;
  delivery: string;
  logo: string;
  background: string;
  deliveryTime: string;
  deliveryValue: number;
  minValue: number;
  stars: number;
}

export interface FieldProps {
  option: string;
  name: string;
  type: string;
  options: any
}

export interface FormFieldProps {
  field: FieldProps;
  type?: string;
  title?: string;
  isTextArea?: boolean
  setState: (value: string) => void
  checkItem: (value: string) => void
}