import { Component, inject, OnInit, signal, HostListener } from '@angular/core';
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
            <article class="project-card" [class.featured]="project.featured" (click)="openProjectDetail(project)">
              <div class="project-image">
                <img [src]="project.imageUrl" [alt]="project.title" loading="lazy">
                <div class="project-overlay">
                  <button class="view-details-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      <line x1="11" y1="8" x2="11" y2="14"></line>
                      <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                    <span>Details ansehen</span>
                  </button>
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

    <!-- Project Detail Modal -->
    @if (selectedProject()) {
      <div class="modal-backdrop" (click)="closeProjectDetail()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <button class="modal-close" (click)="closeProjectDetail()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div class="modal-body">
            <div class="modal-gallery">
              <div class="gallery-main">
                <img [src]="currentGalleryImage()" [alt]="selectedProject()!.title">
                @if (selectedProject()!.gallery.length > 1) {
                  <button class="gallery-nav prev" (click)="prevImage()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button class="gallery-nav next" (click)="nextImage()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                }
              </div>
              @if (selectedProject()!.gallery.length > 1) {
                <div class="gallery-thumbnails">
                  @for (image of selectedProject()!.gallery; track image; let i = $index) {
                    <button 
                      class="thumbnail" 
                      [class.active]="currentImageIndex() === i"
                      (click)="setCurrentImage(i)">
                      <img [src]="image" [alt]="selectedProject()!.title + ' - Bild ' + (i + 1)">
                    </button>
                  }
                </div>
              }
            </div>
            
            <div class="modal-info">
              <div class="modal-header">
                <span class="modal-category">{{ getCategoryLabel(selectedProject()!.category) }}</span>
                <span class="modal-year">{{ selectedProject()!.year }}</span>
              </div>
              <h2 class="modal-title">{{ selectedProject()!.title }}</h2>
              <p class="modal-description">{{ selectedProject()!.description }}</p>
              
              @if (selectedProject()!.highlights?.length) {
                <div class="modal-highlights">
                  <h4>Highlights</h4>
                  <ul>
                    @for (highlight of selectedProject()!.highlights; track highlight) {
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        {{ highlight }}
                      </li>
                    }
                  </ul>
                </div>
              }
              
              <div class="modal-tech">
                <h4>Technologien</h4>
                <div class="tech-list">
                  @for (tech of selectedProject()!.technologies; track tech) {
                    <span class="tech-badge">{{ tech }}</span>
                  }
                </div>
              </div>
              
              <div class="modal-actions">
                @if (selectedProject()!.liveUrl) {
                  <a [href]="selectedProject()!.liveUrl" target="_blank" class="action-btn primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Live Demo
                  </a>
                }
                @if (selectedProject()!.githubUrl) {
                  <a [href]="selectedProject()!.githubUrl" target="_blank" class="action-btn secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    GitHub
                  </a>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    }
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
      cursor: pointer;
      
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
        
        .project-image {
          height: 320px;
        }
        
        @media (max-width: 900px) {
          grid-column: span 1;
          
          .project-image {
            height: 240px;
          }
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
        object-position: top center;
        transition: transform 0.6s ease;
      }
    }
    
    .project-overlay {
      position: absolute;
      inset: 0;
      background: rgba(10, 10, 12, 0.85);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .view-details-btn {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.5rem;
      background: var(--color-accent);
      border: none;
      border-radius: 8px;
      color: var(--color-bg);
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
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
    
    /* Modal Styles */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.9);
      backdrop-filter: blur(10px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .modal-content {
      background: var(--color-bg-secondary);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 24px;
      max-width: 1200px;
      max-height: 90vh;
      width: 100%;
      overflow: hidden;
      position: relative;
      animation: slideUp 0.3s ease;
    }
    
    @keyframes slideUp {
      from { 
        opacity: 0;
        transform: translateY(30px);
      }
      to { 
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .modal-close {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      color: var(--color-text);
      cursor: pointer;
      transition: all 0.3s ease;
      z-index: 10;
      
      &:hover {
        background: var(--color-accent);
        border-color: var(--color-accent);
        color: var(--color-bg);
      }
    }
    
    .modal-body {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      max-height: 90vh;
      overflow: hidden;
    }
    
    .modal-gallery {
      background: rgba(0, 0, 0, 0.3);
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .gallery-main {
      position: relative;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 400px;
      
      img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        border-radius: 12px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      }
    }
    
    .gallery-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      color: var(--color-text);
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background: var(--color-accent);
        border-color: var(--color-accent);
        color: var(--color-bg);
      }
      
      &.prev { left: 1rem; }
      &.next { right: 1rem; }
    }
    
    .gallery-thumbnails {
      display: flex;
      gap: 0.75rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .thumbnail {
      width: 70px;
      height: 50px;
      border-radius: 8px;
      overflow: hidden;
      border: 2px solid transparent;
      background: none;
      padding: 0;
      cursor: pointer;
      transition: all 0.3s ease;
      opacity: 0.6;
      
      &:hover, &.active {
        opacity: 1;
        border-color: var(--color-accent);
      }
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .modal-info {
      padding: 3rem;
      overflow-y: auto;
      max-height: 90vh;
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .modal-category {
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-accent);
      padding: 0.5rem 1rem;
      background: rgba(212, 175, 55, 0.1);
      border-radius: 4px;
    }
    
    .modal-year {
      font-size: 0.9rem;
      color: var(--color-text-muted);
    }
    
    .modal-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: var(--color-text);
    }
    
    .modal-description {
      font-size: 1rem;
      line-height: 1.8;
      color: var(--color-text-muted);
      margin-bottom: 2rem;
    }
    
    .modal-highlights {
      margin-bottom: 2rem;
      
      h4 {
        font-size: 0.85rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--color-accent);
        margin-bottom: 1rem;
      }
      
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      
      li {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        padding: 0.75rem 0;
        color: var(--color-text-muted);
        font-size: 0.95rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        
        svg {
          color: var(--color-accent);
          flex-shrink: 0;
          margin-top: 2px;
        }
        
        &:last-child {
          border-bottom: none;
        }
      }
    }
    
    .modal-tech {
      margin-bottom: 2rem;
      
      h4 {
        font-size: 0.85rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--color-accent);
        margin-bottom: 1rem;
      }
      
      .tech-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      
      .tech-badge {
        padding: 0.5rem 1rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 6px;
        font-size: 0.85rem;
        color: var(--color-text);
      }
    }
    
    .modal-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    
    .action-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 1.5rem;
      font-size: 0.9rem;
      font-weight: 600;
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.3s ease;
      
      &.primary {
        background: var(--color-accent);
        color: var(--color-bg);
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
        }
      }
      
      &.secondary {
        background: transparent;
        color: var(--color-text);
        border: 1px solid rgba(255, 255, 255, 0.2);
        
        &:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
        }
      }
    }
    
    @media (max-width: 1024px) {
      .modal-body {
        grid-template-columns: 1fr;
        max-height: none;
      }
      
      .modal-content {
        max-height: 95vh;
        overflow-y: auto;
      }
      
      .modal-gallery {
        min-height: 300px;
      }
      
      .gallery-main {
        min-height: 250px;
      }
      
      .modal-info {
        max-height: none;
        overflow: visible;
      }
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
      
      .modal-backdrop {
        padding: 1rem;
      }
      
      .modal-info {
        padding: 2rem;
      }
      
      .modal-title {
        font-size: 1.5rem;
      }
      
      .gallery-nav {
        width: 40px;
        height: 40px;
      }
    }
  `]
})
export class ProjectsComponent implements OnInit {
  private projectService = inject(ProjectService);
  
  projects = signal<Project[]>([]);
  filteredProjects = signal<Project[]>([]);
  activeFilter = signal<ProjectCategory | null>(null);
  selectedProject = signal<Project | null>(null);
  currentImageIndex = signal<number>(0);
  
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
  
  openProjectDetail(project: Project): void {
    this.selectedProject.set(project);
    this.currentImageIndex.set(0);
    document.body.style.overflow = 'hidden';
  }
  
  closeProjectDetail(): void {
    this.selectedProject.set(null);
    this.currentImageIndex.set(0);
    document.body.style.overflow = '';
  }
  
  currentGalleryImage(): string {
    const project = this.selectedProject();
    if (!project) return '';
    return project.gallery[this.currentImageIndex()];
  }
  
  nextImage(): void {
    const project = this.selectedProject();
    if (!project) return;
    const newIndex = (this.currentImageIndex() + 1) % project.gallery.length;
    this.currentImageIndex.set(newIndex);
  }
  
  prevImage(): void {
    const project = this.selectedProject();
    if (!project) return;
    const newIndex = this.currentImageIndex() === 0 
      ? project.gallery.length - 1 
      : this.currentImageIndex() - 1;
    this.currentImageIndex.set(newIndex);
  }
  
  setCurrentImage(index: number): void {
    this.currentImageIndex.set(index);
  }
  
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.selectedProject()) {
      this.closeProjectDetail();
    }
  }
  
  @HostListener('document:keydown.arrowRight')
  onArrowRight(): void {
    if (this.selectedProject()) {
      this.nextImage();
    }
  }
  
  @HostListener('document:keydown.arrowLeft')
  onArrowLeft(): void {
    if (this.selectedProject()) {
      this.prevImage();
    }
  }
}
