import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="contact">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <span class="section-label">Kontakt</span>
            <h2 class="section-title">Lassen Sie uns zusammenarbeiten</h2>
            <p class="contact-description">
              Haben Sie ein Projekt im Kopf oder möchten Sie einfach in Kontakt treten? 
              Ich freue mich auf Ihre Nachricht und melde mich zeitnah zurück.
            </p>
            
            <div class="contact-details">
              <a href="mailto:kontakt@beispiel.de" class="contact-item">
                <div class="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <span class="contact-label">E-Mail</span>
                  <span class="contact-value">kontakt&#64;beispiel.de</span>
                </div>
              </a>
              
              <a href="tel:+49123456789" class="contact-item">
                <div class="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <span class="contact-label">Telefon</span>
                  <span class="contact-value">+49 123 456 789</span>
                </div>
              </a>
              
              <div class="contact-item">
                <div class="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <span class="contact-label">Standort</span>
                  <span class="contact-value">Deutschland</span>
                </div>
              </div>
            </div>
            
            <div class="social-links">
              <a href="https://github.com" target="_blank" class="social-link" title="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" class="social-link" title="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" class="social-link" title="Twitter/X">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
            </div>
          </div>
          
          <div class="contact-form-wrapper">
            <form class="contact-form" (ngSubmit)="submitForm()">
              <div class="form-group">
                <label for="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  [(ngModel)]="form.name"
                  required
                  placeholder="Ihr Name">
              </div>
              
              <div class="form-group">
                <label for="email">E-Mail</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  [(ngModel)]="form.email"
                  required
                  placeholder="ihre@email.de">
              </div>
              
              <div class="form-group">
                <label for="subject">Betreff</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject"
                  [(ngModel)]="form.subject"
                  required
                  placeholder="Worum geht es?">
              </div>
              
              <div class="form-group">
                <label for="message">Nachricht</label>
                <textarea 
                  id="message" 
                  name="message"
                  [(ngModel)]="form.message"
                  required
                  rows="5"
                  placeholder="Ihre Nachricht..."></textarea>
              </div>
              
              <button type="submit" class="submit-btn" [disabled]="isSubmitting()">
                @if (isSubmitting()) {
                  <span class="spinner"></span>
                  Wird gesendet...
                } @else {
                  Nachricht senden
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                }
              </button>
              
              @if (submitSuccess()) {
                <div class="success-message">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  Nachricht erfolgreich gesendet!
                </div>
              }
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact {
      padding: 8rem 2rem;
      background: var(--color-bg-secondary);
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
      }
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6rem;
      align-items: start;
    }
    
    .section-label {
      display: inline-block;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--color-accent);
      margin-bottom: 1rem;
    }
    
    .section-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(2rem, 4vw, 2.75rem);
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: 1.5rem;
    }
    
    .contact-description {
      color: var(--color-text-muted);
      font-size: 1.1rem;
      line-height: 1.8;
      margin-bottom: 2.5rem;
    }
    
    .contact-details {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      margin-bottom: 2.5rem;
    }
    
    .contact-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      text-decoration: none;
      color: inherit;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(255, 255, 255, 0.04);
        border-color: rgba(212, 175, 55, 0.2);
        transform: translateX(8px);
      }
    }
    
    .contact-icon {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(212, 175, 55, 0.1);
      border-radius: 10px;
      color: var(--color-accent);
      flex-shrink: 0;
    }
    
    .contact-label {
      display: block;
      font-size: 0.75rem;
      color: var(--color-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.15rem;
    }
    
    .contact-value {
      display: block;
      font-size: 1rem;
      color: var(--color-text);
      font-weight: 500;
    }
    
    .social-links {
      display: flex;
      gap: 0.75rem;
    }
    
    .social-link {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      color: var(--color-text-muted);
      transition: all 0.3s ease;
      
      &:hover {
        background: var(--color-accent);
        border-color: var(--color-accent);
        color: var(--color-bg);
        transform: translateY(-4px);
      }
    }
    
    .contact-form-wrapper {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 24px;
      padding: 2.5rem;
    }
    
    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      
      label {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--color-text);
      }
      
      input, textarea {
        padding: 1rem 1.25rem;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        color: var(--color-text);
        font-size: 1rem;
        font-family: inherit;
        transition: all 0.3s ease;
        
        &::placeholder {
          color: var(--color-text-muted);
          opacity: 0.6;
        }
        
        &:focus {
          outline: none;
          border-color: var(--color-accent);
          background: rgba(255, 255, 255, 0.05);
        }
      }
      
      textarea {
        resize: vertical;
        min-height: 140px;
      }
    }
    
    .submit-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      padding: 1.15rem 2rem;
      background: var(--color-accent);
      color: var(--color-bg);
      border: none;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 0.5rem;
      
      &:hover:not(:disabled) {
        background: var(--color-accent-hover);
        transform: translateY(-2px);
      }
      
      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
    
    .spinner {
      width: 20px;
      height: 20px;
      border: 2px solid transparent;
      border-top-color: currentColor;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .success-message {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.25rem;
      background: rgba(34, 197, 94, 0.1);
      border: 1px solid rgba(34, 197, 94, 0.3);
      border-radius: 10px;
      color: #22c55e;
      font-weight: 500;
    }
    
    @media (max-width: 1024px) {
      .contact-grid {
        grid-template-columns: 1fr;
        gap: 4rem;
      }
    }
    
    @media (max-width: 480px) {
      .contact {
        padding: 5rem 1rem;
      }
      
      .contact-form-wrapper {
        padding: 1.5rem;
      }
    }
  `]
})
export class ContactComponent {
  form: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  isSubmitting = signal(false);
  submitSuccess = signal(false);
  
  submitForm(): void {
    this.isSubmitting.set(true);
    
    // Simulierte Formular-Übermittlung
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submitSuccess.set(true);
      this.resetForm();
      
      setTimeout(() => {
        this.submitSuccess.set(false);
      }, 5000);
    }, 1500);
  }
  
  private resetForm(): void {
    this.form = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
