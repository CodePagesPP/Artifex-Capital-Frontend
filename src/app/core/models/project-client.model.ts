import { Project } from './project.model';

export interface ClientProjectResponse {
  project: Project;
  investedAmount: number;
}