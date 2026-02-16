export interface Project {
  id?: number;
  title: string;
  description: string;
  city: string;
  country: string;
  progress: number;
  status: string;
  createdAt?: string;
  photoUrls: string[];
}