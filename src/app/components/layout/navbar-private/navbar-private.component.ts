import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MenuItem } from '../../../core/models/auth.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-private',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './navbar-private.component.html',
  styleUrl: './navbar-private.component.css'
})
export class NavbarPrivateComponent implements OnInit{

  readonly ADMIN = 'ADMIN_ACCESS';
  readonly CLIENT = 'CLIENT_ACCESS';

  userRoles: string[] = []; 
  menuItems: MenuItem[] = [];

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userRoles = this.authService.getAuthorities(); 
    this.menuItems = this.getMasterMenu().filter(item => this.hasPermission(item));
  }

  private getMasterMenu(): MenuItem[] {
    return [
      {
        label: 'Projects',
        route: '/projects',
        icon: 'fa-folder-open',
        roles: [this.ADMIN]
      },
      {
        label: 'My Projects',
        route: '/c/projects',
        icon: 'fa-folder-open',
        roles: [this.CLIENT]
      },
      {
        label: 'Clients',
        route: '/clients',
        icon: 'fa-users',
        roles: [this.ADMIN] 
      }
    ];
  }

  private hasPermission(item: MenuItem): boolean {
    if (!item.roles || item.roles.length === 0) return true; 
    
    return item.roles.some(role => this.userRoles.includes(role));
  }

  logout(): void {
    this.authService.logout();
  }
}
