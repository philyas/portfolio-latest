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
      title: 'Gastro Depot Worms',
      shortDescription: 'Webanwendung inkl. Online-Shop mit Kassensystem-Integration und Flottentracking',
      description: 'Entwicklung einer umfassenden Webanwendung inkl. Online-Shop für Gastro Depot Worms. Das System wurde nahtlos in bestehende Kassensysteme via orgaMAX PHP-Schnittstelle integriert. Ein Flottentracking-System via OBD ermöglicht Echtzeit-Überwachung der Lieferfahrzeuge, während intelligente Routenoptimierung für effizientere Lieferwege sorgt.',
      technologies: ['Angular', 'PHP', 'orgaMAX API', 'OBD Integration', 'MySQL', 'Google Maps API'],
      imageUrl: 'assets/images/project-images/portfolio_gastro_1.png',
      gallery: [
        'assets/images/project-images/portfolio_gastro_1.png',
        'assets/images/project-images/portfolio_gastro_2.png',
        'assets/images/project-images/portfolio_gastro_3.png',
        'assets/images/project-images/portfolio_gastro_4.png',
        'assets/images/project-images/portfolio_gastro_5.png',
        'assets/images/project-images/portfolio_gastro_6.png'
      ],
      featured: true,
      category: 'fullstack',
      year: 2024,
      liveUrl: 'https://gastro-depot-worms.de',
      highlights: [
        'Schnellere Lieferungen durch automatisierte Prozesse',
        'Optimierte Lieferwege durch intelligente Routenplanung',
        'Echtzeit-Flottentracking via OBD',
        'Nahtlose Kassensystem-Integration'
      ]
    },
    {
      id: '2',
      title: 'Romed Kliniken',
      shortDescription: 'Upload & Analyse von Stationsdateien mit automatisiertem Compliance-Export',
      description: 'Webanwendung für Upload und Analyse von Stationsdateien aus verschiedenen Bereichen der Romed Kliniken. Das System ermöglicht automatisierte Exporte für gesetzliche Meldungen (PPUG, PPBV) und sichert damit die Compliance. Durch die Automatisierung wurde der Verwaltungsaufwand um ca. 50% reduziert.',
      technologies: ['Angular', 'Node.js', 'PostgreSQL', 'Express', 'PDF Generation', 'Excel Export'],
      imageUrl: 'assets/images/project-images/portfolio_romed_4.png',
      gallery: [
        'assets/images/project-images/portfolio_romed_4.png',
        'assets/images/project-images/portfolio_romed_1.png',
        'assets/images/project-images/portfolio_romed_2.png',
        'assets/images/project-images/portfolio_romed_3.png'
      ],
      featured: true,
      category: 'fullstack',
      year: 2024,
      highlights: [
        'Ca. 50% Reduktion des Verwaltungsaufwands',
        'Automatisierte PPUG/PPBV-Meldungen',
        'Compliance-Sicherung durch standardisierte Prozesse',
        'Multi-Bereich-Datenanalyse'
      ]
    },
    {
      id: '3',
      title: 'Wonder Stories',
      shortDescription: 'KI-basierte Kindergeschichten-App mit Audio-to-Audio Personalisierung',
      description: 'Entwicklung einer innovativen KI-basierten Kindergeschichten-App für App Store & Google Play. Das Herzstück ist eine Audio-to-Audio KI, die Geschichten als gesprochene Audiodateien verarbeiten, verändern und personalisieren kann. Die App ermöglicht es Eltern und Kindern, einzigartige, interaktive Audioinhalte zu erstellen.',
      technologies: ['React Native', 'TypeScript', 'AI/ML', 'Audio Processing', 'Firebase', 'Node.js'],
      imageUrl: 'assets/images/project-images/portfolio_wonderstories_1.png',
      gallery: [
        'assets/images/project-images/portfolio_wonderstories_1.png',
        'assets/images/project-images/portfolio_wonderstories_2.png',
        'assets/images/project-images/portfolio_wonderstories_3.png'
      ],
      featured: true,
      category: 'mobile',
      year: 2024,
      liveUrl: 'https://wonderstories.onelink.me/3ltl/duwq7cx1',
      highlights: [
        'Über 1.000 aktive Nutzer',
        'Kontinuierlich steigendes Engagement',
        'Verfügbar im App Store & Google Play',
        'Innovative Audio-to-Audio KI-Technologie'
      ]
    },
    {
      id: '4',
      title: 'FSH Service',
      shortDescription: 'CRM-System mit DATEV, Banking, Stripe & DocuSign Integration',
      description: 'Implementierung eines umfassenden CRM-Systems für FSH Service mit nahtloser Integration verschiedener Business-Tools. Das System verbindet DATEV für Buchhaltung, Online-Banking für Finanztransaktionen, Stripe als Payment Provider und DocuSign für digitale Vertragsunterzeichnung in einer einheitlichen Plattform.',
      technologies: ['Angular', 'Node.js', 'DATEV API', 'Stripe', 'DocuSign API', 'Banking APIs'],
      imageUrl: 'assets/images/project-images/portfolio_fsh_1.png',
      gallery: [
        'assets/images/project-images/portfolio_fsh_1.png',
        'assets/images/project-images/portfolio_fsh_2.png',
        'assets/images/project-images/portfolio_fsh_3.png'
      ],
      featured: true,
      category: 'fullstack',
      year: 2023,
      liveUrl: 'https://fsh-service.vercel.app',
      highlights: [
        'Optimierte Geschäftsprozesse',
        'Digitale Vertragsunterzeichnung via DocuSign',
        'Nahtlose DATEV-Integration',
        'Automatisierte Zahlungsabwicklung'
      ]
    },
    {
      id: '5',
      title: 'Hide and Grow',
      shortDescription: 'Innovative Plattform für nachhaltiges Wachstum und Entwicklung',
      description: 'Entwicklung einer modernen Webanwendung für Hide and Grow. Die Plattform bietet umfassende Funktionen für Nutzer, die nachhaltiges persönliches und berufliches Wachstum anstreben. Mit intuitiver Benutzeroberfläche und durchdachter User Experience.',
      technologies: ['Angular', 'TypeScript', 'Node.js', 'MongoDB', 'REST API'],
      imageUrl: 'assets/images/project-images/portfolio_hideandgrow_1.png',
      gallery: [
        'assets/images/project-images/portfolio_hideandgrow_1.png',
        'assets/images/project-images/portfolio_hideandgrow_2.png',
        'assets/images/project-images/portfolio_hideandgrow_3.png',
        'assets/images/project-images/portfolio_hideandgrow_4.png',
        'assets/images/project-images/portfolio_hideandgrow_5.png'
      ],
      featured: false,
      category: 'web',
      year: 2023,
      liveUrl: 'https://hideandgrow.vercel.app',
      highlights: [
        'Moderne, intuitive Benutzeroberfläche',
        'Responsive Design für alle Geräte',
        'Durchdachte User Experience'
      ]
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
