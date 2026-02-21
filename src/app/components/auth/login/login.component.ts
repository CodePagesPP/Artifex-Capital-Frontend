import { Component } from '@angular/core';
import { AuthRequest } from '../../../core/models/auth.model';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials: AuthRequest = { email: '', password: '' };
  error: string | null = null;
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.loading = true;
    this.error = null;

    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        

        localStorage.setItem('token', res.token);

        const routeToNavigate = this.authService.getDefaultRoute();

        this.router.navigate([routeToNavigate]);
        
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        
        this.error = 'Credenciales incorrectas o error de conexión.';
        this.loading = false;
      },
    });
  }
}
