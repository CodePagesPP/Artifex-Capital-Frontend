import { Component } from '@angular/core';

@Component({
  selector: 'app-learn-about-us',
  standalone: true,
  imports: [],
  templateUrl: './learn-about-us.component.html',
  styleUrl: './learn-about-us.component.css'
})
export class LearnAboutUsComponent {

  processSteps = [
    {
      title: 'What We Do',
      description: 'Identificamos oportunidades de alto valor en el sector de Self-Storage. Nuestro enfoque se centra en la adquisición estratégica y el desarrollo de infraestructuras resilientes que garantizan retornos estables.',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop', // Reemplaza con tus fotos
      reverse: false
    },
    {
      title: 'How We Do It',
      description: 'Combinamos tecnología de construcción modular con análisis de Big Data para optimizar cada metro cuadrado. Nuestra gestión integral abarca desde la planificación financiera hasta la ejecución operativa.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop',
      reverse: true
    }
  ];

}
