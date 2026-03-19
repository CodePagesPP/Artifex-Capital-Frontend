import { Project } from "./project.model";

export interface Client {
  id?: number;
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  city: string;
  plannedInvestment: number;
  projectOfInterest?: Project | null; 
  assignedProjects?: Project[] | null;
}

export interface ClientProjectInvestment {
  projectId: number;
  amount: number;
}

export interface ClientUpdateData {
  projectOfInterestId: number | null;
  assignedProjects: ClientProjectInvestment[];
}


export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; 
}

export interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
}