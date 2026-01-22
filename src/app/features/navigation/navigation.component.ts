import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navigation" [class.scrolled]="isScrolled()" [class.menu-open]="isMenuOpen()">
      <div class="nav-container">
        <a href="#" class="logo">
          <span class="logo-text">Portfolio</span>
          <span class="logo-dot">.</span>
        </a>
        
        <button class="menu-toggle" (click)="toggleMenu()" [attr.aria-expanded]="isMenuOpen()">
          <span class="hamburger" [class.active]="isMenuOpen()">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        
        <ul class="nav-links" [class.active]="isMenuOpen()">
          <li><a href="#about" (click)="closeMenu()">Über mich</a></li>
          <li><a href="#skills" (click)="closeMenu()">Skills</a></li>
          <li><a href="#projects" (click)="closeMenu()">Projekte</a></li>
          <li><a href="#testimonials" (click)="closeMenu()">Referenzen</a></li>
          <li><a href="#contact" (click)="closeMenu()" class="nav-cta">Kontakt</a></li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    .navigation {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      padding: 1.5rem 0;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      
      &.scrolled {
        background: rgba(10, 10, 12, 0.95);
        backdrop-filter: blur(20px);
        padding: 1rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }
    }
    
    .nav-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.75rem;
      font-weight: 700;
      text-decoration: none;
      color: var(--color-text);
      letter-spacing: -0.02em;
      
      .logo-dot {
        color: var(--color-accent);
      }
    }
    
    .nav-links {
      display: flex;
      gap: 2.5rem;
      list-style: none;
      margin: 0;
      padding: 0;
      align-items: center;
      
      a {
        color: var(--color-text-muted);
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: 500;
        letter-spacing: 0.02em;
        transition: color 0.3s ease;
        position: relative;
        
        &::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--color-accent);
          transition: width 0.3s ease;
        }
        
        &:hover {
          color: var(--color-text);
          
          &::after {
            width: 100%;
          }
        }
        
        &.nav-cta {
          background: var(--color-accent);
          color: var(--color-bg);
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          font-weight: 600;
          
          &::after {
            display: none;
          }
          
          &:hover {
            background: var(--color-accent-hover);
            color: var(--color-bg);
          }
        }
      }
    }
    
    .menu-toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      z-index: 1001;
    }
    
    .hamburger {
      display: flex;
      flex-direction: column;
      gap: 5px;
      width: 24px;
      
      span {
        display: block;
        height: 2px;
        background: var(--color-text);
        transition: all 0.3s ease;
        
        &:nth-child(1) { width: 100%; }
        &:nth-child(2) { width: 75%; }
        &:nth-child(3) { width: 50%; }
      }
      
      &.active {
        span {
          &:nth-child(1) {
            transform: translateY(7px) rotate(45deg);
          }
          &:nth-child(2) {
            opacity: 0;
          }
          &:nth-child(3) {
            width: 100%;
            transform: translateY(-7px) rotate(-45deg);
          }
        }
      }
    }
    
    @media (max-width: 768px) {
      .menu-toggle {
        display: block;
      }
      
      .nav-links {
        position: fixed;
        top: 0;
        right: -100%;
        width: 100%;
        height: 100vh;
        background: var(--color-bg);
        flex-direction: column;
        justify-content: center;
        gap: 2rem;
        transition: right 0.4s ease;
        
        &.active {
          right: 0;
        }
        
        a {
          font-size: 1.5rem;
        }
      }
    }
  `]
})
export class NavigationComponent {
  isScrolled = signal(false);
  isMenuOpen = signal(false);
  
  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }
  
  toggleMenu(): void {
    this.isMenuOpen.update(v => !v);
  }
  
  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
