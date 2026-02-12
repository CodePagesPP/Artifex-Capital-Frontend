export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface User{
  id: number;
  email: string;
  name: string;
  lastName: string;
  sex: string;
  createdAt: Date;
  updatedAt: Date;
}