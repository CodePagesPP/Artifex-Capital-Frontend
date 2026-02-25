import { Component } from '@angular/core';
import { Project } from '../../core/models/project.model';
import Swal from 'sweetalert2';
import { ProjectService } from '../../core/services/project.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects: Project[] = [];
  selectedProject: Project | null = null;
  selectedProjectPhotos: string[] = [];
  currentEditingProjectId: number | null = null;
  showGalleryModal = false;
  isEditMode = false;
  selectedFiles: File[] = [];
  showModal = false;

  searchTerm: string = '';
  selectedStatus: string = '';
  private searchSubject: Subject<string> = new Subject();
  private searchSubscription!: Subscription;

  currentPage: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;
  totalPages: number = 0;

  projectForm = {
    title: '',
    description: '',
    city: '',
    country: '',
    progress: 0,
    status: 'IN_PROGRESS'
  };

  constructor(public projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();


    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchValue => {
      this.searchTerm = searchValue;
      this.currentPage = 0;
      this.loadProjects();
    });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  onSearchChange(event: any) {
    this.searchSubject.next(event.target.value);
  }

  onStatusChange() {
    this.currentPage = 0;
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getAllProjects(this.currentPage, this.pageSize, this.searchTerm, this.selectedStatus)
      .subscribe({
        next: (pageData) => {
          this.projects = pageData.content;
          this.totalElements = pageData.totalElements;
          this.totalPages = pageData.totalPages;
          this.currentPage = pageData.number;
        },
        error: (err) => console.error('Error loading projects', err)
      });
  }


  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadProjects();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadProjects();
    }
  }

  onFilesSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  openCreateModal() {
    this.isEditMode = false;
    this.selectedProject = null;
    this.resetForm();
    this.showModal = true;
  }

  openEditModal(project: Project) {
    this.isEditMode = true;
    this.selectedProject = project;
    this.projectForm = {
      title: project.title,
      description: project.description,
      city: project.city,
      country: project.country,
      progress: project.progress,
      status: project.status
    };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  openGallery(project: Project) {
    this.selectedProjectPhotos = project.photoUrls;
    this.currentEditingProjectId = project.id || null;
    this.showGalleryModal = true;
  }

  closeGallery() {
    this.showGalleryModal = false;
    this.selectedProjectPhotos = [];
    this.currentEditingProjectId = null;
  }

  removePhoto(url: string) {
    if (!this.currentEditingProjectId) return;

    Swal.fire({
      title: '¿Eliminar foto?',
      text: "Esta acción es irreversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.projectService.deleteImage(this.currentEditingProjectId!, url).subscribe({
          next: (updatedProject) => {
            this.selectedProjectPhotos = updatedProject.photoUrls;
            this.loadProjects();
            Swal.fire('Deleted', 'The image has been deleted.', 'success');
          },
          error: (err) => {
            console.error(err);
            Swal.fire('Error', 'Failed to delete the image.', 'error');
          }
        });
      }
    });
  }

  saveProject() {
    const formData = new FormData();
    formData.append('title', this.projectForm.title);
    formData.append('description', this.projectForm.description);
    formData.append('city', this.projectForm.city);
    formData.append('country', this.projectForm.country);
    formData.append('progress', this.projectForm.progress.toString());
    formData.append('status', this.projectForm.status);

    this.selectedFiles.forEach(file => {
      formData.append('images', file);
    });

    if (this.isEditMode && this.selectedProject?.id) {
      this.projectService.updateProject(this.selectedProject.id, formData).subscribe({
        next: () => this.handleSuccess('Project updated'),
        error: (err) => this.handleError(err)
      });
    } else {
      this.projectService.createProject(formData).subscribe({
        next: () => this.handleSuccess('Project created'),
        error: (err) => this.handleError(err)
      });
    }
  }

  deleteProject(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone. The project will be permanently deleted.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.projectService.deleteProject(id).subscribe({
          next: () => {
            this.projects = this.projects.filter(p => p.id !== id);
            Swal.fire('Deleted', 'The project has been deleted.', 'success');
          }
        });
      }
    });
  }

  private handleSuccess(msg: string) {
    Swal.fire('Success', msg, 'success');
    this.loadProjects();
    this.closeModal();
  }

  private handleError(err: any) {
    Swal.fire('Error', 'An error occurred while processing the request.', 'error');
    console.error(err);
  }

  private resetForm() {
    this.projectForm = { title: '', description: '', city: '', country: '', progress: 0, status: 'IN_PROGRESS' };
    this.selectedFiles = [];
  }

  getImg(project: Project) {
    return project.photoUrls.length > 0
      ? this.projectService.getImgUrl(project.photoUrls[0])
      : 'assets/no-image.png';
  }
}
