import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-case-studies-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './case-studies-projects.component.html',
  styleUrl: './case-studies-projects.component.css'
})
export class CaseStudiesProjectsComponent {

}
