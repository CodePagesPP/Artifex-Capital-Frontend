import { Component } from '@angular/core';

@Component({
  selector: 'app-who-we-are',
  standalone: true,
  imports: [],
  templateUrl: './who-we-are.component.html',
  styleUrl: './who-we-are.component.css'
})
export class WhoWeAreComponent {

  introData = {
    title: 'Artifex Capital',
    subtitle: 'Investing in Real Value',
    description: 'Artifex Capital is a real estate investment firm focused on developing high-value residential projects and strategic property acquisitions. We combine market expertise, disciplined execution, and innovative investment structures to deliver consistent returns. Through our tokenized model, we make real estate investing more accessible, transparent, and scalable.'
  };

  teamMembers = [
    { name: 'Diego Machado', role: 'CEO & Founder', image: 'assets/TEAM 1.png' },
    { name: 'Luis Ishikawa', role: 'Production Manager', image: 'assets/TEAM 3.png' },
    { name: 'Martin Ferradas', role: 'Marketing Director', image: 'assets/TEAM 4.png' },
    { name: 'Saul Bazan', role: 'Founder', image: 'assets/TEAM 2.png' }
  ];

  foundationEvents = [
    { year: '2015', title: 'The Beginning', description: 'Artifex was founded with a clear vision: to transform the real estate investment landscape through innovation and efficiency.' },
    { year: '2018', title: 'Regional Expansion', description: 'We successfully launched large-scale projects across Ohio, establishing a strong operational presence.' },
    { year: '2023', title: 'Artifex10x', description: 'Introduction of our private capital division, enabling structured investment opportunities through modern financial models.' },
    { year: '2026', title: 'Present', description: 'We continue to lead with technology-driven strategies and efficient project management, scaling opportunities for investors.'}
  ];
  
}
