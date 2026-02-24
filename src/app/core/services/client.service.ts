import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Client, ClientUpdateData, Page } from '../models/client.model';
import { Observable } from 'rxjs';
import { ClientProjectResponse } from '../models/project-client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
private apiUrl = `${environment.apiUrl}/clients`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAllClients(page: number, size: number, search: string = ''): Observable<Page<Client>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

  
    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<Page<Client>>(this.apiUrl, {
      headers: this.authService.getAuthHeaders(),
      params: params
    });
  }

  updateClientProjects(clientId: number, updateData: ClientUpdateData): Observable<Client> {
    const url = `${this.apiUrl}/${clientId}/projects`;
    
    return this.http.put<Client>(url, updateData, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getMyProjects(): Observable<ClientProjectResponse[]> {
    return this.http.get<ClientProjectResponse[]>(`${this.apiUrl}/me/projects`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
