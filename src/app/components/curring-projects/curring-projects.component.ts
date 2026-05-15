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
      name: '10X — 105 Kitts Ln',
      location: 'South Point, OH',
      type: 'One-story single-family home',
      address: '105 Kitts Ln, South Point, Ohio',
      image: '/curring-projects/project.webp'
    },
    {
      name: 'Flip Number #1 — 314 Buffington St',
      location: 'Huntington, WV',
      type: 'Two-story single-family home',
      address: '314 Buffington St, Huntington, West Virginia',
      image: '/curring-projects/project.webp'
    },
    {
      name: 'Flip Number #2 — 4326 Altizer Ave',
      location: 'Huntington, WV',
      type: 'One-story single-family residence',
      address: '4326 Altizer Ave, Huntington, West Virginia',
      image: '/curring-projects/project.webp'
    },
    {
      name: 'Creekside Estates — 10 Premium Homes',
      location: 'Proctorville, OH',
      type: '10 one-story single-family homes',
      address: 'Creekside Estates, Proctorville, Ohio',
      image: '/curring-projects/project.webp'
    },
    {
      name: '10X — 145 Creekside Dr',
      location: 'Proctorville, OH',
      type: 'One-story single-family home',
      address: '145 Creekside Dr, Proctorville, Ohio',
      image: '/curring-projects/project.webp'
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