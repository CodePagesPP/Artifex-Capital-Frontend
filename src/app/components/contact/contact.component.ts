import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../core/services/client.service';
import { ContactForm } from '../../core/models/client.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm: FormGroup;
  isSending = false;
  statusMessage = '';

  constructor(
    private fb: FormBuilder, 
    private contactService: ClientService
  ) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      message: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.statusMessage = 'Please fill out all required fields.';
      return;
    }

    this.isSending = true;
    const formData: ContactForm = this.contactForm.value;

    this.contactService.sendContactMessage(formData).subscribe({
      next: () => {
        this.statusMessage = 'Success! Your message has been sent.';
        this.contactForm.reset();
        this.isSending = false;
      },
      error: (err) => {
        console.error('Mail Error:', err);
        this.statusMessage = 'Error sending message. Please try again later.';
        this.isSending = false;
      }
    });
  }
}
