import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="about" #aboutSection>
      <div class="container">
        <div class="section-header" [class.animate-in]="isVisible()" [style.animation-delay]="'0.1s'">
          <span class="section-label">Über mich</span>
          <h2 class="section-title">Entwickler aus Leidenschaft</h2>
        </div>
        
        <div class="about-content">
          <div class="about-text" [class.animate-in]="isVisible()" [style.animation-delay]="'0.2s'">
            <p class="lead">
              Als Full-Stack Developer mit über 4 Jahren Erfahrung verbinde ich 
              technische Exzellenz mit einem Auge für Design und Benutzerfreundlichkeit.
            </p>
            <p>
              Meine Reise begann mit einer Faszination für die Möglichkeiten der 
              Softwareentwicklung. Heute arbeite ich an komplexen Enterprise-Lösungen, 
              von skalierbaren Backend-Systemen bis hin zu performanten Frontend-Anwendungen.
            </p>
            <p>
              Ich glaube an Clean Code, kontinuierliche Verbesserung und den Wert 
              guter Architektur. Jedes Projekt ist eine Gelegenheit, nicht nur 
              technische Probleme zu lösen, sondern echten Mehrwert zu schaffen.
            </p>
            
            <div class="about-highlights">
              <div class="highlight-item" [class.animate-in]="isVisible()" [style.animation-delay]="'0.3s'">
                <div class="highlight-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                </div>
                <div>
                  <h4>Clean Architecture</h4>
                  <p>Wartbare, skalierbare Systemdesigns</p>
                </div>
              </div>
              
              <div class="highlight-item" [class.animate-in]="isVisible()" [style.animation-delay]="'0.4s'">
                <div class="highlight-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div>
                  <h4>Agile Entwicklung</h4>
                  <p>Iterative, kundenorientierte Prozesse</p>
                </div>
              </div>
              
              <div class="highlight-item" [class.animate-in]="isVisible()" [style.animation-delay]="'0.5s'">
                <div class="highlight-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 20V10"></path>
                    <path d="M12 20V4"></path>
                    <path d="M6 20v-6"></path>
                  </svg>
                </div>
                <div>
                  <h4>Performance Fokus</h4>
                  <p>Optimierte, effiziente Lösungen</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="about-image" [class.animate-in]="isVisible()" [style.animation-delay]="'0.6s'">
            <div class="image-container">
              <div class="image-frame">
                <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600" alt="Arbeitsplatz">
              </div>
              <div class="experience-badge">
                <span class="badge-number">4+</span>
                <span class="badge-text">Jahre<br>Erfahrung</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about {
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
    
    .section-header {
      text-align: center;
      margin-bottom: 5rem;
      opacity: 0;
      transform: translateY(30px);
    }
    
    .animate-in {
      animation: fadeInUp 0.8s ease-out forwards;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
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
    }
    
    .about-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6rem;
      align-items: center;
    }
    
    .about-text {
      opacity: 0;
      transform: translateY(30px);
    }
    
    .about-image {
      opacity: 0;
      transform: translateY(30px);
    }
    
    .about-text {
      .lead {
        font-size: 1.25rem;
        line-height: 1.7;
        color: var(--color-text);
        margin-bottom: 1.5rem;
      }
      
      p {
        color: var(--color-text-muted);
        line-height: 1.8;
        margin-bottom: 1rem;
      }
    }
    
    .about-highlights {
      margin-top: 2.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .highlight-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1.25rem;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      opacity: 0;
      transform: translateY(20px);
      
      h4 {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
        color: var(--color-text);
      }
      
      p {
        font-size: 0.875rem;
        color: var(--color-text-muted);
        margin: 0;
      }
    }
    
    .highlight-icon {
      flex-shrink: 0;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(212, 175, 55, 0.1);
      border-radius: 10px;
      color: var(--color-accent);
    }
    
    .about-image {
      position: relative;
    }
    
    .image-container {
      position: relative;
    }
    
    .image-frame {
      position: relative;
      border-radius: 24px;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        inset: 0;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 24px;
        z-index: 1;
        pointer-events: none;
      }
      
      img {
        width: 100%;
        height: auto;
        display: block;
        filter: grayscale(30%) contrast(1.1);
        transition: filter 0.5s ease;
        
        &:hover {
          filter: grayscale(0%) contrast(1);
        }
      }
    }
    
    .experience-badge {
      position: absolute;
      bottom: -30px;
      right: -30px;
      width: 140px;
      height: 140px;
      background: var(--color-bg);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
      
      .badge-number {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--color-accent);
        line-height: 1;
      }
      
      .badge-text {
        font-size: 0.75rem;
        color: var(--color-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        line-height: 1.3;
      }
    }
    
    @media (max-width: 1024px) {
      .about-content {
        grid-template-columns: 1fr;
        gap: 4rem;
      }
      
      .about-image {
        order: -1;
        max-width: 500px;
        margin: 0 auto;
      }
      
      .experience-badge {
        bottom: -20px;
        right: -10px;
        width: 110px;
        height: 110px;
        
        .badge-number {
          font-size: 2rem;
        }
      }
    }
    
    @media (max-width: 480px) {
      .about {
        padding: 5rem 1rem;
      }
      
      .about-highlights {
        gap: 1rem;
      }
      
      .highlight-item {
        padding: 1rem;
      }
    }
  `]
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('aboutSection', { static: true }) aboutSection!: ElementRef;
  isVisible = signal(false);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    // Don't set isVisible here - let the observer handle it
  }

  ngAfterViewInit(): void {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      const element = this.aboutSection?.nativeElement;
      if (!element) return;

      // Check if element is already visible
      const rect = element.getBoundingClientRect();
      const isVisibleNow = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisibleNow) {
        this.isVisible.set(true);
        return;
      }

      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.isVisible.set(true);
              this.observer?.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.05,
          rootMargin: '0px 0px 0px 0px'
        }
      );

      this.observer.observe(element);
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
