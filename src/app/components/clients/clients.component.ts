import { Component, OnDestroy, OnInit } from '@angular/core';
import { Client, ClientProjectInvestment, ClientUpdateData } from '../../core/models/client.model';
import { Project } from '../../core/models/project.model';
import { ProjectService } from '../../core/services/project.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../core/services/client.service';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit, OnDestroy{
  searchTerm: string = '';
  private searchSubject: Subject<string> = new Subject();
  private searchSubscription!: Subscription;
  clients: Client[] = [];
  projects: Project[] = [];

  showModal = false;
  selectedClient: Client | null = null;

  selectedProjectIdOfInterest: number | null = null;
  selectedAssignedProjectIds: number[] = [];
  projectInvestments: { [projectId: number]: number } = {};
  currentPage: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;
  totalPages: number = 0;

  constructor(
    private clientService: ClientService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.loadClients();
    this.loadProjects();

    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(300), 
      distinctUntilChanged() 
    ).subscribe(searchValue => {
      this.searchTerm = searchValue;
      this.currentPage = 0;
      this.loadClients();
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

  loadClients() {
    
    this.clientService.getAllClients(this.currentPage, this.pageSize, this.searchTerm).subscribe({
      next: (pageData) => {
        this.clients = pageData.content; 
        this.totalElements = pageData.totalElements;
        this.totalPages = pageData.totalPages;
        this.currentPage = pageData.number;
      },
      error: (err) => console.error('Error cargando clientes', err)
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadClients();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadClients();
    }
  }

  loadProjects() {
    this.projectService.getAllProjectsInProgress().subscribe({
      next: (data) => this.projects = data,
      error: (err) => console.error('Error cargando proyectos', err)
    });
  }

  openEditModal(client: any) {
    this.selectedClient = { ...client };
    this.selectedProjectIdOfInterest = client.projectOfInterest ? client.projectOfInterest.id : null;
    
    
    this.projectInvestments = {};
    
    
    if (client.assignedProjects) {
      client.assignedProjects.forEach((cp: any) => {
        
        this.projectInvestments[cp.project.id] = cp.investedAmount || 0;
      });
    }
    
    this.showModal = true;
  }

 
  isProjectSelected(projectId: number): boolean {
    return this.projectInvestments[projectId] !== undefined;
  }

  closeModal() {
    this.showModal = false;
    this.selectedClient = null;
  }

  toggleProject(projectId: number) {
    if (this.isProjectSelected(projectId)) {
      delete this.projectInvestments[projectId];
    } else {
      this.projectInvestments[projectId] = 0;
    }
  }


  toggleProjectAssignment(projectId: number, event: any) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.selectedAssignedProjectIds.push(projectId);
    } else {
      this.selectedAssignedProjectIds = this.selectedAssignedProjectIds.filter(id => id !== projectId);
    }
  }

  saveClientChanges() {
  if (!this.selectedClient) return;

    
    const assignedProjectsArray: ClientProjectInvestment[] = Object.keys(this.projectInvestments).map(id => ({
      projectId: Number(id),
      amount: this.projectInvestments[Number(id)]
    }));

    const updateData: ClientUpdateData = {
      projectOfInterestId: this.selectedProjectIdOfInterest,
      assignedProjects: assignedProjectsArray
    };


  Swal.fire({
    title: 'Guardando...',
    text: 'Actualizando proyectos del cliente',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  this.clientService.updateClientProjects(this.selectedClient.id!, updateData).subscribe({
    next: (updatedClient) => {
      
      
      Swal.fire({
        icon: 'success',
        title: '¡Actualizado!',
        text: 'Los proyectos se guardaron correctamente.',
        confirmButtonColor: '#0F2B3F',
        showConfirmButton: true
      });

      this.loadClients(); 
      this.closeModal();
    },
    error: (err) => {
      console.error('Error al actualizar cliente', err);
      
      
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al guardar los cambios.',
        confirmButtonColor: '#F83C3C' 
      });
    }
  });
}
}
