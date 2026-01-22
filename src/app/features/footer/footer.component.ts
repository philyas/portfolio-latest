import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <a href="#" class="logo">
              <span class="logo-text">Portfolio</span>
              <span class="logo-dot">.</span>
            </a>
            <p class="footer-tagline">
              Moderne Web-Entwicklung mit Fokus auf Qualität und User Experience.
            </p>
          </div>
          
          <div class="footer-links">
            <h4>Navigation</h4>
            <ul>
              <li><a href="#about">Über mich</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projekte</a></li>
              <li><a href="#testimonials">Referenzen</a></li>
              <li><a href="#contact">Kontakt</a></li>
            </ul>
          </div>
          
          <div class="footer-links">
            <h4>Rechtliches</h4>
            <ul>
              <li><a href="#">Impressum</a></li>
              <li><a href="#">Datenschutz</a></li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p class="copyright">
            © {{ currentYear }} Portfolio. Alle Rechte vorbehalten.
          </p>
          <p class="made-with">
            Entwickelt mit <span class="heart">♥</span> und Angular
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      padding: 5rem 2rem 2rem;
      background: var(--color-bg);
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
    
    .footer-content {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 4rem;
      margin-bottom: 4rem;
    }
    
    .logo {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.5rem;
      font-weight: 700;
      text-decoration: none;
      color: var(--color-text);
      letter-spacing: -0.02em;
      display: inline-block;
      margin-bottom: 1rem;
      
      .logo-dot {
        color: var(--color-accent);
      }
    }
    
    .footer-tagline {
      color: var(--color-text-muted);
      font-size: 0.95rem;
      line-height: 1.6;
      max-width: 280px;
    }
    
    .footer-links {
      h4 {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--color-text);
        margin-bottom: 1.25rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      
      a {
        color: var(--color-text-muted);
        text-decoration: none;
        font-size: 0.9rem;
        transition: color 0.3s ease;
        
        &:hover {
          color: var(--color-accent);
        }
      }
    }
    
    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }
    
    .copyright {
      font-size: 0.85rem;
      color: var(--color-text-muted);
    }
    
    .made-with {
      font-size: 0.85rem;
      color: var(--color-text-muted);
      
      .heart {
        color: #ef4444;
        animation: pulse 1.5s ease-in-out infinite;
      }
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.2); }
    }
    
    @media (max-width: 768px) {
      .footer {
        padding: 4rem 1rem 1.5rem;
      }
      
      .footer-content {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }
      
      .footer-bottom {
        flex-direction: column;
        gap: 0.75rem;
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
