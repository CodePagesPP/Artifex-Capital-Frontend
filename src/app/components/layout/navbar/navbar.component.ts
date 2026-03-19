import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NzDrawerModule, NzIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMenuVisible = false;

  openMenu(): void {
    this.isMenuVisible = true;
  }

  closeMenu(): void {
    this.isMenuVisible = false;
  }
}
