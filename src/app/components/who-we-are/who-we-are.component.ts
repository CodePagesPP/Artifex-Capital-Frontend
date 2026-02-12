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
    subtitle: 'Building the Future of Storage',
    description: 'En Artifex Capital, transformamos espacios en oportunidades de alto rendimiento. Nuestra visión combina la solidez de la construcción tradicional con estrategias de inversión innovadoras, garantizando seguridad y crecimiento para nuestros socios.'
  };

  teamMembers = [
    { name: 'Nombre CEO', role: 'CEO & Founder', image: 'assets/placeholder-user.jpg' },
    { name: 'Nombre Socio', role: 'Head of Construction', image: 'assets/placeholder-user.jpg' },
    { name: 'Nombre Arq', role: 'Lead Architect', image: 'assets/placeholder-user.jpg' },
    { name: 'Nombre Ing', role: 'Civil Engineer', image: 'assets/placeholder-user.jpg' }
  ];

  foundationEvents = [
    { year: '2015', title: 'El Inicio', description: 'Fundación de Artifex con la visión de revolucionar el sector.' },
    { year: '2018', title: 'Expansión Regional', description: 'Primeros proyectos de gran envergadura en Washington.' },
    { year: '2023', title: 'Artifex10x', description: 'Lanzamiento de la nueva división de capital privado.' },
    { year: '2026', title: 'Presente', description: 'Liderando el mercado con tecnología y gestión eficiente.' }
  ];
  
}
