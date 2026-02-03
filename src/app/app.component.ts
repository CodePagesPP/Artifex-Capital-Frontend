import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import Aos from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'artifex-capital-frontend';

  ngOnInit() {
    Aos.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }
}
