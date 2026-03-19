import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import Aos from 'aos';

@Component({
  selector: 'app-curring-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './curring-projects.component.html',
  styleUrl: './curring-projects.component.css'
})
export class CurringProjectsComponent {
  selectedProjectIndex = 0;
  animateClass = true; 

  projects = [
    {
      name: 'Flip House #1',
      location: 'Huntington, WV',
      type: 'Single-family Home',
      address: '314 Buffington St, Huntington, West Virginia',
      image: '/curring-projects/flip-house-1.webp'
    },
    {
      name: 'Flip House #2',
      location: 'Huntington, WV',
      type: 'Single-family Home',
      address: '4328 Altizer Ave, Huntington, West Virginia',
      image: '/curring-projects/flip-house-2.webp'
    }
  ];

  selectProject(index: number) {
    this.selectedProjectIndex = index;
    this.animateClass = false;
    
    setTimeout(() => {
      this.animateClass = true;
      Aos.refresh();
    }, 10);
}
}