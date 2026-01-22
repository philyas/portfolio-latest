import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero">
      <div class="hero-background">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="grid-pattern"></div>
      </div>
      
      <div class="hero-content">
        <div class="hero-text">
          <span class="hero-label">Software Engineer</span>
          <h1 class="hero-title">
            Ich entwickle
            <span class="highlight">digitale Erlebnisse</span>
            die begeistern.
          </h1>
          <p class="hero-description">
            Full-Stack Developer mit Fokus auf skalierbare Web-Applikationen, 
            moderne Architekturen und exzellente User Experience. Über 8 Jahre 
            Erfahrung in der Entwicklung von Enterprise-Lösungen.
          </p>
          <div class="hero-cta">
            <a href="#projects" class="btn btn-primary">
              <span>Projekte ansehen</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a href="#contact" class="btn btn-secondary">Kontakt aufnehmen</a>
          </div>
        </div>
        
        <div class="hero-visual">
          <div class="profile-card">
            <div class="profile-image">
              <img src="assets/images/profilepicture.png" alt="Profilbild" onerror="this.src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'">
            </div>
            <div class="profile-stats">
              <div class="stat">
                <span class="stat-value">8+</span>
                <span class="stat-label">Jahre Erfahrung</span>
              </div>
              <div class="stat">
                <span class="stat-value">50+</span>
                <span class="stat-label">Projekte</span>
              </div>
              <div class="stat">
                <span class="stat-value">30+</span>
                <span class="stat-label">Zufriedene Kunden</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="scroll-indicator">
        <span>Scroll</span>
        <div class="scroll-line"></div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 8rem 2rem 4rem;
      overflow: hidden;
    }
    
    .hero-background {
      position: absolute;
      inset: 0;
      z-index: 0;
      
      .gradient-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        opacity: 0.4;
        
        &.orb-1 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, var(--color-accent) 0%, transparent 70%);
          top: -20%;
          right: -10%;
          animation: float 20s ease-in-out infinite;
        }
        
        &.orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #6366f1 0%, transparent 70%);
          bottom: -10%;
          left: -5%;
          animation: float 15s ease-in-out infinite reverse;
        }
      }
      
      .grid-pattern {
        position: absolute;
        inset: 0;
        background-image: 
          linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
        background-size: 60px 60px;
      }
    }
    
    @keyframes float {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(30px, -30px); }
    }
    
    .hero-content {
      max-width: 1400px;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6rem;
      align-items: center;
      position: relative;
      z-index: 1;
    }
    
    .hero-label {
      display: inline-block;
      font-size: 0.85rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--color-accent);
      margin-bottom: 1.5rem;
      padding: 0.5rem 1rem;
      background: rgba(212, 175, 55, 0.1);
      border: 1px solid rgba(212, 175, 55, 0.2);
      border-radius: 4px;
    }
    
    .hero-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 700;
      line-height: 1.15;
      margin-bottom: 1.5rem;
      letter-spacing: -0.02em;
      
      .highlight {
        display: block;
        background: linear-gradient(135deg, var(--color-accent) 0%, #ffd700 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }
    
    .hero-description {
      font-size: 1.125rem;
      line-height: 1.8;
      color: var(--color-text-muted);
      margin-bottom: 2.5rem;
      max-width: 540px;
    }
    
    .hero-cta {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 2rem;
      font-size: 0.95rem;
      font-weight: 600;
      text-decoration: none;
      border-radius: 4px;
      transition: all 0.3s ease;
      
      &-primary {
        background: var(--color-accent);
        color: var(--color-bg);
        
        svg {
          transition: transform 0.3s ease;
        }
        
        &:hover {
          background: var(--color-accent-hover);
          transform: translateY(-2px);
          
          svg {
            transform: translateX(4px);
          }
        }
      }
      
      &-secondary {
        background: transparent;
        color: var(--color-text);
        border: 1px solid rgba(255, 255, 255, 0.2);
        
        &:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
        }
      }
    }
    
    .hero-visual {
      display: flex;
      justify-content: center;
    }
    
    .profile-card {
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%);
      border: 2px solid rgba(212, 175, 55, 0.3);
      border-radius: 32px;
      padding: 3rem;
      backdrop-filter: blur(20px);
      box-shadow: 
        0 20px 60px rgba(0, 0, 0, 0.4),
        0 0 0 1px rgba(255, 255, 255, 0.05) inset,
        0 0 80px rgba(212, 175, 55, 0.1);
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%);
        animation: rotate 20s linear infinite;
      }
      
      &::after {
        content: '';
        position: absolute;
        bottom: -30%;
        left: -30%;
        width: 150%;
        height: 150%;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
        animation: rotate 25s linear infinite reverse;
      }
    }
    
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .profile-image {
      width: 320px;
      height: 400px;
      border-radius: 24px;
      overflow: hidden;
      margin-bottom: 2.5rem;
      position: relative;
      z-index: 1;
      border: 4px solid rgba(255, 255, 255, 0.15);
      box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.5),
        0 0 0 1px rgba(212, 175, 55, 0.2) inset,
        0 0 60px rgba(212, 175, 55, 0.2);
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%);
      padding: 8px;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center; /* Anpassbar: z.B. "top center", "center top", "left center", etc. */
        border-radius: 20px;
        filter: grayscale(10%) contrast(1.05) brightness(1.02);
        transition: all 0.5s ease;
        margin-top: 7px;
        
        &:hover {
          filter: grayscale(0%) contrast(1.1) brightness(1.05);
          transform: scale(1.02);
        }
      }
    }
    
    .profile-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      text-align: center;
      position: relative;
      z-index: 1;
    }
    
    .stat {
      padding: 1.25rem 0.75rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(212, 175, 55, 0.3);
        transform: translateY(-4px);
      }
      
      &-value {
        display: block;
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--color-accent);
        margin-bottom: 0.25rem;
      }
      
      &-label {
        font-size: 0.7rem;
        color: var(--color-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    }
    
    .scroll-indicator {
      position: absolute;
      bottom: 3rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      color: var(--color-text-muted);
      font-size: 0.75rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      
      .scroll-line {
        width: 1px;
        height: 60px;
        background: linear-gradient(to bottom, var(--color-accent) 0%, transparent 100%);
        animation: scrollPulse 2s ease-in-out infinite;
      }
    }
    
    @keyframes scrollPulse {
      0%, 100% { opacity: 1; transform: scaleY(1); }
      50% { opacity: 0.5; transform: scaleY(0.8); }
    }
    
    @media (max-width: 1024px) {
      .hero-content {
        grid-template-columns: 1fr;
        gap: 4rem;
        text-align: center;
      }
      
      .hero-description {
        margin-left: auto;
        margin-right: auto;
      }
      
      .hero-cta {
        justify-content: center;
      }
      
      .profile-image {
        width: 260px;
        height: 330px;
      }
      
      .profile-card {
        padding: 2.5rem;
      }
    }
    
    @media (max-width: 480px) {
      .hero {
        padding: 6rem 1rem 3rem;
      }
      
      .profile-image {
        width: 220px;
        height: 280px;
      }
      
      .profile-card {
        padding: 2rem;
      }
      
      .profile-stats {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HeroComponent {}
