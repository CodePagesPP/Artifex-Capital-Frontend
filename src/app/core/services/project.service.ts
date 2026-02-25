import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = `${environment.apiUrl}/projects`;
  private imageUrl = `${environment.apiUrl}/public/images`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllProjects(page: number, size: number, search: string = '', status: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (search) params = params.set('search', search);
    if (status) params = params.set('status', status);

    return this.http.get<any>(this.apiUrl, { 
      headers: this.authService.getAuthHeaders(),
      params: params 
    });
  }

  getAllProjectsInProgress(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/in-progress`);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  createProject(formData: FormData): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, formData, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  updateProject(id: number, formData: FormData): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, formData, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  getImgUrl(fileName: string): string {
    return `${this.imageUrl}/${fileName}`;
  }

  deleteImage(projectId: number, imageUrl: string): Observable<Project> {
    return this.http.delete<Project>(`${this.apiUrl}/${projectId}/images?imageUrl=${imageUrl}`, {
      headers: this.authService.getAuthHeaders(),
    });
  }
}
