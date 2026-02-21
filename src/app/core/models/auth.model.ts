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


export interface ClientRegistration {

    name: string;
    lastName: string;
    email: string;
    password?: string;
    phoneNumber: string;
    country: string;
    city: string;
    sex: 'M' | 'F' | 'O'; 

    projectId: number;
    plannedInvestment: number;
}

export interface MenuItem {
  label: string;
  route: string;
  icon: string;
  roles: string[]; 
}