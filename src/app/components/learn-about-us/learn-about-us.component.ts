import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-learn-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './learn-about-us.component.html',
  styleUrl: './learn-about-us.component.css',
})
export class LearnAboutUsComponent {
  processSteps = [
    {
      title: 'What We Do',
      description:
        'We acquire, develop, and optimize residential real estate projects. From house flipping to full-scale developments, we focus on maximizing value through strategic planning, construction efficiency, and market positioning.',
      image:
        'assets/WHAT WE DO.png',
      reverse: false,
    },
    {
      title: 'How We Do It',
      description:
        'Our process combines data-driven acquisition, efficient project management, and disciplined financial structuring. We leverage market insights, experienced teams, and technology to execute projects with precision and deliver consistent returns.',
      image:
        'assets/HOW WE DO IT.png',
      reverse: true,
    },
  ];

  toggleVideo(video: HTMLVideoElement) {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
}
