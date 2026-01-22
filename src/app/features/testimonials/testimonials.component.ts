import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialService } from '../../core/services';
import { Testimonial } from '../../core/models';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="testimonials" class="testimonials">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Referenzen</span>
          <h2 class="section-title">Was Kunden sagen</h2>
          <p class="section-subtitle">
            Feedback von zufriedenen Kunden und Projektpartnern
          </p>
        </div>
        
        <div class="testimonials-grid">
          @for (testimonial of testimonials(); track testimonial.id) {
            <article class="testimonial-card">
              <div class="quote-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" opacity="0.2">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              
              <div class="testimonial-content">
                <p class="testimonial-text">{{ testimonial.content }}</p>
              </div>
              
              <div class="testimonial-footer">
                <div class="testimonial-avatar">
                  @if (testimonial.avatarUrl) {
                    <img [src]="testimonial.avatarUrl" [alt]="testimonial.name">
                  } @else {
                    <div class="avatar-placeholder">
                      {{ getInitials(testimonial.name) }}
                    </div>
                  }
                </div>
                <div class="testimonial-author">
                  <h4 class="author-name">{{ testimonial.name }}</h4>
                  <p class="author-role">{{ testimonial.role }}, {{ testimonial.company }}</p>
                </div>
                <div class="testimonial-rating">
                  @for (star of [1, 2, 3, 4, 5]; track star) {
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      [attr.fill]="star <= testimonial.rating ? 'var(--color-accent)' : 'none'"
                      stroke="var(--color-accent)" 
                      stroke-width="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  }
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .testimonials {
      padding: 8rem 2rem;
      position: relative;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .section-header {
      text-align: center;
      margin-bottom: 5rem;
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
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: 1rem;
    }
    
    .section-subtitle {
      color: var(--color-text-muted);
      font-size: 1.1rem;
      max-width: 500px;
      margin: 0 auto;
    }
    
    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 2rem;
    }
    
    .testimonial-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 20px;
      padding: 2rem;
      transition: all 0.4s ease;
      display: flex;
      flex-direction: column;
      
      &:hover {
        transform: translateY(-4px);
        border-color: rgba(212, 175, 55, 0.2);
        background: rgba(255, 255, 255, 0.03);
      }
    }
    
    .quote-icon {
      margin-bottom: 1rem;
      color: var(--color-accent);
    }
    
    .testimonial-content {
      flex: 1;
      margin-bottom: 1.5rem;
    }
    
    .testimonial-text {
      font-size: 1rem;
      line-height: 1.8;
      color: var(--color-text-muted);
      font-style: italic;
    }
    
    .testimonial-footer {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 1rem;
      align-items: center;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }
    
    .testimonial-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .avatar-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(212, 175, 55, 0.2);
      color: var(--color-accent);
      font-weight: 600;
      font-size: 1rem;
    }
    
    .testimonial-author {
      .author-name {
        font-size: 1rem;
        font-weight: 600;
        color: var(--color-text);
        margin-bottom: 0.15rem;
      }
      
      .author-role {
        font-size: 0.8rem;
        color: var(--color-text-muted);
      }
    }
    
    .testimonial-rating {
      display: flex;
      gap: 2px;
    }
    
    @media (max-width: 768px) {
      .testimonials {
        padding: 5rem 1rem;
      }
      
      .testimonials-grid {
        grid-template-columns: 1fr;
      }
      
      .testimonial-footer {
        grid-template-columns: auto 1fr;
      }
      
      .testimonial-rating {
        grid-column: span 2;
        margin-top: 0.5rem;
      }
    }
  `]
})
export class TestimonialsComponent implements OnInit {
  private testimonialService = inject(TestimonialService);
  
  testimonials = signal<Testimonial[]>([]);
  
  ngOnInit(): void {
    this.testimonialService.getAll().subscribe(testimonials => {
      this.testimonials.set(testimonials);
    });
  }
  
  getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
