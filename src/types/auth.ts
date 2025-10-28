export interface User {
  token: string;
  email: string;
  username: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  PK: string;
  SK: string;
  'GSI2-PK': string;
  'GSI2-SK': string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  username: string;
  confirm_password: string;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
}
