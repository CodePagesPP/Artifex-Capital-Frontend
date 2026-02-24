import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClientService } from '../../core/services/client.service';
import { ProjectService } from '../../core/services/project.service';
import { ClientProjectResponse } from '../../core/models/project-client.model';
import { Project } from '../../core/models/project.model';

@Component({
  selector: 'app-project-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-clients.component.html',
  styleUrl: './project-clients.component.css',
})
export class ProjectClientsComponent {
  myInvestments: ClientProjectResponse[] = [];
  totalInvested = 0;
  showGalleryModal = false;
  selectedProjectPhotos: string[] = [];

  constructor(
    private clientService: ClientService,
    public projectService: ProjectService,
  ) {}

  ngOnInit(): void {
    this.loadInvestments();
  }

  loadInvestments(): void {
    this.clientService.getMyProjects().subscribe({
      next: (data) => {
        this.myInvestments = data;
        this.calculateTotal();
      },
      error: (err) => console.error('Error al cargar inversiones', err),
    });
  }

  calculateTotal(): void {
    this.totalInvested = this.myInvestments.reduce(
      (acc, curr) => acc + curr.investedAmount,
      0,
    );
  }

  getPreviewImg(photoUrls: string[]): string {
    return photoUrls && photoUrls.length > 0
      ? this.projectService.getImgUrl(photoUrls[0])
      : 'assets/no-image.png';
  }

  openGallery(project: Project) {
    this.selectedProjectPhotos = project.photoUrls;
    this.showGalleryModal = true;
  }

  closeGallery() {
    this.showGalleryModal = false;
    this.selectedProjectPhotos = [];
  }
}
