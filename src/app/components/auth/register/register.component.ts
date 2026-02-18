
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Project } from '../../../core/models/project.model';
import { ProjectService } from '../../../core/services/project.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  currentStep: number = 1;
  projects: Project[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  constructor(
    private fb: FormBuilder,
    private clientService: AuthService,
    private projectService: ProjectService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({

      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9+ ]*$')]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      sex: ['M', Validators.required],


      projectId: [null, Validators.required],
      plannedInvestment: ['', [Validators.required, Validators.min(100)]]
    });
  }

  ngOnInit(): void {
    this.loadProjects();
  }


  loadProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (data) => this.projects = data,
      error: (err) => console.error('Error cargando proyectos', err)
    });
    console.log(this.projects);
  }


  getImgUrl(fileName: string): string {
    
    return this.projectService.getImgUrl(fileName);
  }


  nextStep(): void {
    if (this.currentStep === 1) {

      const step1Controls = ['name', 'lastName', 'email', 'password', 'phoneNumber', 'country', 'city', 'sex'];
      const isStep1Valid = step1Controls.every(field => this.registerForm.get(field)?.valid);

      if (isStep1Valid) {
        this.currentStep = 2;
        this.errorMessage = '';
      } else {
        this.registerForm.markAllAsTouched();
        this.errorMessage = 'Por favor completa todos los campos obligatorios.';
      }
    }
  }

  prevStep(): void {
    this.currentStep = 1;
    this.errorMessage = '';
  }


  selectProject(projectId: number): void {
    
    this.registerForm.patchValue({
      projectId: projectId
    });

    
    this.registerForm.get('projectId')?.markAsTouched();
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.clientService.registerClient(this.registerForm.value).subscribe({
      next: (response) => {
       
        this.isLoading = false;
        this.successMessage = 'Registration successful!';
        
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Registration failed. Please try again.';
        this.isLoading = false;
      }
    });
  }


  hasError(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
