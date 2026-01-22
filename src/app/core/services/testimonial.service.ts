import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Testimonial } from '../models';
import { ITestimonialService } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService implements ITestimonialService {
  
  private readonly testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Dr. Michael Weber',
      role: 'CTO',
      company: 'TechVentures GmbH',
      content: 'Außergewöhnliche technische Fähigkeiten gepaart mit einem tiefen Verständnis für Geschäftsanforderungen. Die Zusammenarbeit war durchweg professionell und ergebnisorientiert. Unsere Plattform wurde termingerecht und über unseren Erwartungen geliefert.',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      rating: 5,
      date: new Date('2025-10-15')
    },
    {
      id: '2',
      name: 'Sarah Hoffmann',
      role: 'Product Lead',
      company: 'InnoSoft Solutions',
      content: 'Sehr strukturierte Arbeitsweise und exzellente Kommunikation. Komplexe technische Konzepte werden verständlich erklärt. Das Projekt wurde nicht nur technisch hervorragend umgesetzt, sondern auch strategisch begleitet.',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      rating: 5,
      date: new Date('2025-08-22')
    },
    {
      id: '3',
      name: 'Thomas Schneider',
      role: 'Geschäftsführer',
      company: 'Digital First Agency',
      content: 'Zuverlässig, innovativ und immer einen Schritt voraus bei neuen Technologien. Die Zusammenarbeit hat unsere digitale Transformation maßgeblich vorangetrieben. Absolute Empfehlung für anspruchsvolle Projekte.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      rating: 5,
      date: new Date('2025-06-10')
    },
    {
      id: '4',
      name: 'Lisa Müller',
      role: 'Engineering Manager',
      company: 'FinTech Innovations',
      content: 'Hervorragende Code-Qualität und tiefgreifendes Architekturverständnis. Besonders beeindruckend war die Fähigkeit, Legacy-Systeme schrittweise zu modernisieren ohne den laufenden Betrieb zu gefährden.',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      rating: 5,
      date: new Date('2025-03-28')
    }
  ];

  getAll(): Observable<Testimonial[]> {
    return of(this.testimonials);
  }

  getById(id: string): Observable<Testimonial | undefined> {
    return of(this.testimonials.find(t => t.id === id));
  }
}
