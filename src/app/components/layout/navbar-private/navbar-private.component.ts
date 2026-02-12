import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar-private',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './navbar-private.component.html',
  styleUrl: './navbar-private.component.css'
})
export class NavbarPrivateComponent {
  constructor(
    
    private authService: AuthService
  ) {}


  logout(): void {
    this.authService.logout();
  }
}
