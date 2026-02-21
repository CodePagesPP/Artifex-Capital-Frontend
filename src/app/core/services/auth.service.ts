import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthRequest, AuthResponse, ClientRegistration, User } from '../models/auth.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;
  private tokenKey = 'token'
  private roleRouteMap: { [key: string]: string } = {
    'ADMIN_ACCESS': '/projects',
    'CLIENT_ACCESS': '/c/projects'
  };
  constructor(private http: HttpClient, private router: Router) { }


  public getDefaultRoute(): string {
    const roles = this.getAuthorities();


    if (roles.includes('ADMIN_ACCESS')) {
      return this.roleRouteMap['ADMIN_ACCESS'];
    }
    if (roles.includes('CLIENT_ACCESS')) {
      return this.roleRouteMap['CLIENT_ACCESS'];
    }

    
    return '/login'; 
  }

  public getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.tokenKey);
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      catchError((error) => {
        let errorMsg = 'Ocurrió un error inesperado';


        if (error.error && error.error.message) {
          errorMsg = error.error.message;
        }
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  registerClient(clientData: ClientRegistration): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-client`, clientData);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      const exp = decoded['exp'];
      if (!exp) return false;
      return Date.now() < exp * 1000;
    } catch (e) {
      return false;
    }
  }

  getAuthorities(): string[] {
    const token = this.getToken();
    if (!token) return [];

    try {
      const decoded: any = jwtDecode(token);
      return decoded['authorities'] || [];
    } catch (e) {
      return [];
    }
  }

  public hasRole(roleName: string): boolean {

    const authorities = this.getAuthorities();
    return authorities.includes(roleName);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    } else {
      return null;
    }
  }

  getUserInfo(): Observable<User> {
    const token = this.getToken();  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<User>(`${this.apiUrl}/profile`, { headers }).pipe(
      map((response: User) => {

        return response;  
      })
    );
  }
}
