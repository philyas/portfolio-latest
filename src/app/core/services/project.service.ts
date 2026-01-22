import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project, ProjectFilter, ProjectCategory } from '../models';
import { IProjectService } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProjectService implements IProjectService {
  
  private readonly projects: Project[] = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      shortDescription: 'Skalierbare E-Commerce Lösung mit Microservices-Architektur',
      description: 'Eine vollständige E-Commerce Plattform mit modernem Tech-Stack. Implementiert wurden Warenkorb, Checkout, Zahlungsabwicklung und Admin-Dashboard. Die Architektur basiert auf Microservices für maximale Skalierbarkeit.',
      technologies: ['Angular', 'Node.js', 'PostgreSQL', 'Docker', 'Kubernetes', 'Stripe'],
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true,
      category: 'fullstack',
      year: 2025
    },
    {
      id: '2',
      title: 'Real-Time Analytics Dashboard',
      shortDescription: 'Interaktives Dashboard für Business Intelligence',
      description: 'Ein leistungsstarkes Analytics-Dashboard mit Echtzeit-Datenvisualisierung. WebSocket-Integration für Live-Updates, komplexe Chartings und exportierbare Reports.',
      technologies: ['Angular', 'D3.js', 'WebSockets', 'Python', 'FastAPI', 'Redis'],
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      liveUrl: 'https://example.com',
      featured: true,
      category: 'web',
      year: 2025
    },
    {
      id: '3',
      title: 'Mobile Banking App',
      shortDescription: 'Sichere Mobile-First Banking Anwendung',
      description: 'Native mobile App für Banking mit biometrischer Authentifizierung, Transaktionshistorie, QR-Code Zahlungen und Push-Benachrichtigungen.',
      technologies: ['React Native', 'TypeScript', 'Node.js', 'MongoDB', 'Firebase'],
      imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
      githubUrl: 'https://github.com',
      featured: true,
      category: 'mobile',
      year: 2024
    },
    {
      id: '4',
      title: 'CI/CD Pipeline Infrastructure',
      shortDescription: 'Automatisierte Deployment-Pipeline für Enterprise',
      description: 'Komplette CI/CD Infrastructure mit automatisierten Tests, Code-Quality-Checks, Container-Orchestrierung und Zero-Downtime Deployments.',
      technologies: ['Jenkins', 'Docker', 'Kubernetes', 'Terraform', 'AWS', 'Prometheus'],
      imageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
      featured: false,
      category: 'devops',
      year: 2024
    },
    {
      id: '5',
      title: 'API Gateway Service',
      shortDescription: 'Hochverfügbarer API Gateway mit Rate Limiting',
      description: 'Zentraler API Gateway mit Authentifizierung, Rate Limiting, Request/Response Transformation und umfassender Dokumentation via OpenAPI.',
      technologies: ['Go', 'gRPC', 'Redis', 'PostgreSQL', 'Docker'],
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
      githubUrl: 'https://github.com',
      featured: false,
      category: 'backend',
      year: 2024
    },
    {
      id: '6',
      title: 'Healthcare Management System',
      shortDescription: 'Digitales Patientenmanagement für Kliniken',
      description: 'Umfassendes System für Patientenverwaltung, Terminplanung, elektronische Patientenakten und Abrechnungsintegration. HIPAA-konform.',
      technologies: ['Angular', 'Java', 'Spring Boot', 'PostgreSQL', 'Elasticsearch'],
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800',
      liveUrl: 'https://example.com',
      featured: false,
      category: 'fullstack',
      year: 2023
    }
  ];

  getAll(): Observable<Project[]> {
    return of(this.projects);
  }

  getById(id: string): Observable<Project | undefined> {
    return of(this.projects.find(p => p.id === id));
  }

  getFeatured(): Observable<Project[]> {
    return of(this.projects.filter(p => p.featured));
  }

  filterBy(filter: ProjectFilter): Observable<Project[]> {
    return this.getAll().pipe(
      map(projects => {
        let filtered = [...projects];
        
        if (filter.category) {
          filtered = filtered.filter(p => p.category === filter.category);
        }
        
        if (filter.featured !== undefined) {
          filtered = filtered.filter(p => p.featured === filter.featured);
        }
        
        if (filter.technologies?.length) {
          filtered = filtered.filter(p => 
            filter.technologies!.some(tech => p.technologies.includes(tech))
          );
        }
        
        return filtered;
      })
    );
  }

  getCategories(): Observable<string[]> {
    const categories: ProjectCategory[] = ['web', 'mobile', 'backend', 'fullstack', 'devops'];
    return of(categories);
  }
}
