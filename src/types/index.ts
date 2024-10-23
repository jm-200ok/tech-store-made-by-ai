export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
}

export interface Order {
  customerInfo: CustomerInfo;
  items: CartItem[];
  total: number;
  date: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthState {
  user: User | null;
  cart: CartItem[];
}