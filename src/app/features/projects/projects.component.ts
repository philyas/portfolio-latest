import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../core/services';
import { Project, ProjectCategory } from '../../core/models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="projects">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Portfolio</span>
          <h2 class="section-title">Ausgewählte Projekte</h2>
          <p class="section-subtitle">
            Eine Auswahl meiner wichtigsten Projekte aus verschiedenen Branchen
          </p>
        </div>
        
        <div class="filter-tabs">
          <button 
            class="filter-btn" 
            [class.active]="activeFilter() === null"
            (click)="filterProjects(null)">
            Alle
          </button>
          @for (category of categories; track category.value) {
            <button 
              class="filter-btn" 
              [class.active]="activeFilter() === category.value"
              (click)="filterProjects(category.value)">
              {{ category.label }}
            </button>
          }
        </div>
        
        <div class="projects-grid">
          @for (project of filteredProjects(); track project.id) {
            <article class="project-card" [class.featured]="project.featured">
              <div class="project-image">
                <img [src]="project.imageUrl" [alt]="project.title" loading="lazy">
                <div class="project-overlay">
                  <div class="project-links">
                    @if (project.liveUrl) {
                      <a [href]="project.liveUrl" target="_blank" class="project-link" title="Live Demo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    }
                    @if (project.githubUrl) {
                      <a [href]="project.githubUrl" target="_blank" class="project-link" title="GitHub">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                      </a>
                    }
                  </div>
                </div>
              </div>
              
              <div class="project-content">
                <div class="project-meta">
                  <span class="project-category">{{ getCategoryLabel(project.category) }}</span>
                  <span class="project-year">{{ project.year }}</span>
                </div>
                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-description">{{ project.shortDescription }}</p>
                <div class="project-tech">
                  @for (tech of project.technologies.slice(0, 4); track tech) {
                    <span class="tech-badge">{{ tech }}</span>
                  }
                  @if (project.technologies.length > 4) {
                    <span class="tech-more">+{{ project.technologies.length - 4 }}</span>
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
    .projects {
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
      max-width: 1300px;
      margin: 0 auto;
    }
    
    .section-header {
      text-align: center;
      margin-bottom: 3rem;
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
    
    .filter-tabs {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-bottom: 4rem;
      flex-wrap: wrap;
    }
    
    .filter-btn {
      padding: 0.75rem 1.5rem;
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 50px;
      color: var(--color-text-muted);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        border-color: rgba(255, 255, 255, 0.3);
        color: var(--color-text);
      }
      
      &.active {
        background: var(--color-accent);
        border-color: var(--color-accent);
        color: var(--color-bg);
      }
    }
    
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 2rem;
    }
    
    .project-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 20px;
      overflow: hidden;
      transition: all 0.4s ease;
      
      &:hover {
        transform: translateY(-8px);
        border-color: rgba(212, 175, 55, 0.3);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
        
        .project-image img {
          transform: scale(1.05);
        }
        
        .project-overlay {
          opacity: 1;
        }
      }
      
      &.featured {
        grid-column: span 2;
        
        @media (max-width: 900px) {
          grid-column: span 1;
        }
      }
    }
    
    .project-image {
      position: relative;
      height: 240px;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s ease;
      }
    }
    
    .project-overlay {
      position: absolute;
      inset: 0;
      background: rgba(10, 10, 12, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .project-links {
      display: flex;
      gap: 1rem;
    }
    
    .project-link {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      color: var(--color-text);
      transition: all 0.3s ease;
      
      &:hover {
        background: var(--color-accent);
        border-color: var(--color-accent);
        color: var(--color-bg);
        transform: scale(1.1);
      }
    }
    
    .project-content {
      padding: 1.75rem;
    }
    
    .project-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    
    .project-category {
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-accent);
    }
    
    .project-year {
      font-size: 0.8rem;
      color: var(--color-text-muted);
    }
    
    .project-title {
      font-size: 1.35rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      color: var(--color-text);
    }
    
    .project-description {
      font-size: 0.95rem;
      color: var(--color-text-muted);
      line-height: 1.6;
      margin-bottom: 1.25rem;
    }
    
    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .tech-badge {
      padding: 0.35rem 0.75rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 4px;
      font-size: 0.75rem;
      color: var(--color-text-muted);
    }
    
    .tech-more {
      padding: 0.35rem 0.75rem;
      background: rgba(212, 175, 55, 0.1);
      border-radius: 4px;
      font-size: 0.75rem;
      color: var(--color-accent);
    }
    
    @media (max-width: 768px) {
      .projects {
        padding: 5rem 1rem;
      }
      
      .projects-grid {
        grid-template-columns: 1fr;
      }
      
      .filter-tabs {
        gap: 0.35rem;
      }
      
      .filter-btn {
        padding: 0.5rem 1rem;
        font-size: 0.8rem;
      }
    }
  `]
})
export class ProjectsComponent implements OnInit {
  private projectService = inject(ProjectService);
  
  projects = signal<Project[]>([]);
  filteredProjects = signal<Project[]>([]);
  activeFilter = signal<ProjectCategory | null>(null);
  
  categories: { value: ProjectCategory; label: string }[] = [
    { value: 'fullstack', label: 'Full-Stack' },
    { value: 'web', label: 'Web' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'backend', label: 'Backend' },
    { value: 'devops', label: 'DevOps' }
  ];
  
  ngOnInit(): void {
    this.projectService.getAll().subscribe(projects => {
      this.projects.set(projects);
      this.filteredProjects.set(projects);
    });
  }
  
  filterProjects(category: ProjectCategory | null): void {
    this.activeFilter.set(category);
    
    if (category === null) {
      this.filteredProjects.set(this.projects());
    } else {
      this.filteredProjects.set(
        this.projects().filter(p => p.category === category)
      );
    }
  }
  
  getCategoryLabel(category: ProjectCategory): string {
    return this.categories.find(c => c.value === category)?.label || category;
  }
}
