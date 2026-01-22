import { Component, inject, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillService } from '../../core/services';
import { SkillGroup } from '../../core/models';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="skills" #skillsSection>
      <div class="container">
        <div class="section-header" [class.animate-in]="isVisible()" [style.animation-delay]="'0.1s'">
          <span class="section-label">Expertise</span>
          <h2 class="section-title">Technische Skills</h2>
          <p class="section-subtitle">
            Moderne Technologien und bewährte Tools für erfolgreiche Projekte
          </p>
        </div>
        
        <div class="skills-grid" [class.animate-in]="isVisible()" [style.animation-delay]="'0.2s'">
          @for (group of skillGroups(); track group.category; let i = $index) {
            <div class="skill-group" [class.animate-in]="isVisible()" [style.animation-delay]="(0.3 + i * 0.1) + 's'">
              <h3 class="group-title">{{ group.label }}</h3>
              <div class="skill-list">
                @for (skill of group.skills; track skill.id) {
                  <div class="skill-item">
                    <div class="skill-header">
                      <span class="skill-name">{{ skill.name }}</span>
                      <span class="skill-years">{{ skill.yearsOfExperience }}y</span>
                    </div>
                    <div class="skill-bar">
                      <div 
                        class="skill-progress" 
                        [style.width.%]="skill.proficiency"
                        [style.--delay]="getDelay(skill.id)">
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        </div>
        
        <div class="tech-marquee" [class.animate-in]="isVisible()" [style.animation-delay]="'0.6s'">
          <div class="marquee-content">
            @for (tech of technologies; track tech) {
              <span class="tech-tag">{{ tech }}</span>
            }
            @for (tech of technologies; track tech; let idx = $index) {
              <span class="tech-tag">{{ tech }}</span>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .skills {
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
      margin-bottom: 1rem;
    }
    
    .section-subtitle {
      color: var(--color-text-muted);
      font-size: 1.1rem;
      max-width: 500px;
      margin: 0 auto;
    }
    
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 3rem;
      margin-bottom: 5rem;
      opacity: 0;
      transform: translateY(30px);
    }
    
    .skill-group {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 20px;
      padding: 2rem;
      opacity: 0;
      transform: translateY(30px);
    }
    
    .tech-marquee {
      opacity: 0;
      transform: translateY(30px);
    }
    
    .group-title {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: var(--color-text);
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    
    .skill-list {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    
    .skill-item {
      &:hover .skill-progress {
        background: linear-gradient(90deg, var(--color-accent) 0%, #ffd700 100%);
      }
    }
    
    .skill-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    
    .skill-name {
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--color-text);
    }
    
    .skill-years {
      font-size: 0.75rem;
      color: var(--color-text-muted);
      background: rgba(255, 255, 255, 0.05);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
    }
    
    .skill-bar {
      height: 6px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 3px;
      overflow: hidden;
    }
    
    .skill-progress {
      height: 100%;
      background: var(--color-accent);
      border-radius: 3px;
      transition: width 1s ease-out, background 0.3s ease;
      animation: slideIn 1s ease-out;
      animation-delay: var(--delay, 0s);
    }
    
    @keyframes slideIn {
      from { width: 0; }
    }
    
    .tech-marquee {
      overflow: hidden;
      padding: 2rem 0;
      position: relative;
      
      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 150px;
        z-index: 1;
        pointer-events: none;
      }
      
      &::before {
        left: 0;
        background: linear-gradient(90deg, var(--color-bg) 0%, transparent 100%);
      }
      
      &::after {
        right: 0;
        background: linear-gradient(90deg, transparent 0%, var(--color-bg) 100%);
      }
    }
    
    .marquee-content {
      display: flex;
      gap: 1rem;
      animation: marquee 40s linear infinite;
      width: fit-content;
    }
    
    @keyframes marquee {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
    
    .tech-tag {
      flex-shrink: 0;
      padding: 0.75rem 1.5rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 50px;
      font-size: 0.875rem;
      color: var(--color-text-muted);
      transition: all 0.3s ease;
      
      &:hover {
        border-color: var(--color-accent);
        color: var(--color-accent);
      }
    }
    
    @media (max-width: 768px) {
      .skills {
        padding: 5rem 1rem;
      }
      
      .skills-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .skill-group {
        padding: 1.5rem;
      }
    }
  `]
})
export class SkillsComponent implements OnInit, AfterViewInit, OnDestroy {
  private skillService = inject(SkillService);
  @ViewChild('skillsSection', { static: true }) skillsSection!: ElementRef;
  isVisible = signal(false);
  private observer?: IntersectionObserver;
  
  skillGroups = signal<SkillGroup[]>([]);
  
  technologies = [
    'Angular', 'TypeScript', 'React', 'React Native', 'Node.js', 'Python', 'PostgreSQL', 
    'MongoDB', 'Oracle', 'MySQL', 'Docker', 'AWS', 'Git', 'GraphQL', 'REST APIs',
    'Microservices', 'CI/CD', 'TDD', 'Agile', 'Scrum'
  ];
  
  ngOnInit(): void {
    this.skillService.getGrouped().subscribe(groups => {
      this.skillGroups.set(groups);
    });
  }
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      const element = this.skillsSection?.nativeElement;
      if (!element) return;

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
  
  getDelay(id: string): string {
    return `${parseInt(id) * 0.05}s`;
  }
}
