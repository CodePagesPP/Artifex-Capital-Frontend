import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarPrivateComponent } from '../navbar-private/navbar-private.component';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [NavbarPrivateComponent, RouterOutlet],
  templateUrl: './private-layout.component.html',
  styleUrl: './private-layout.component.css'
})
export class PrivateLayoutComponent {

}
