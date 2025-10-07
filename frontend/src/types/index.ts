export interface User {
  id: number;
  email: string;
  name: string;
  balance: number;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Transaction {
  id: number;
  amount: number;
  type: 'income' | 'expense';
  description: string;
  date: string;
  attachment?: string;
  category: Category;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface ApiResponse<T> {
  message?: string;
  data?: T;
  error?: string;
}

