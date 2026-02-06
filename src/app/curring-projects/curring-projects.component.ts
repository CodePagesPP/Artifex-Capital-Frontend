import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
      name: 'Salem Turnpike',
      location: 'Norwich, CT',
      description: '85,722 sq ft ground-up, three-story all interior climate-controlled',
      units: 646,
      image: '/curring-projects/1.webp'
    },
    {
      name: 'Shiloh',
      location: 'Shiloh, PA',
      description: 'Expansion project with new climate-controlled storage units.',
      units: 420,
      image: '/curring-projects/Norwich.webp'
    },
    {
      name: 'Belle Road',
      location: 'York, PA',
      description: 'Ground-up construction featuring modern security systems.',
      units: 512,
      image: '/curring-projects/Belle-Road.webp'
    },
    {
      name: 'Chambers Road',
      location: 'Dover, DE',
      description: 'Renovation of existing facilities into premium storage.',
      units: 300,
      image: '/curring-projects/Chambers-Road.webp'
    }
  ];

  selectProject(index: number) {
    if (this.selectedProjectIndex === index) return;
    
    this.selectedProjectIndex = index;
    this.animateClass = false; 
    setTimeout(() => {
      this.animateClass = true;
    }, 10);
  }
}