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
      name: 'Brigitte Klieber',
      role: 'Leitung Controlling',
      company: 'Romed Kliniken',
      content: 'Die Zusammenarbeit war sehr pragmatisch und das Projekt ging im richtigen Tempo voran. Die Arbeit war sehr strukturiert und hat unsere Compliance-Prozesse maßgeblich verbessert. Die Automatisierung spart uns enorm viel Zeit.',
      rating: 5,
      date: new Date('2024-12-15')
    },
    {
      id: '2',
      name: 'Fiona Sailer',
      role: 'Geschäftsführung',
      company: 'Hide and Grow',
      content: 'Zuverlässiger Partner, der immer an unserer Seite steht. Das Webseiten-Upgrade repräsentiert perfekt unsere Marke und Vision. Die Zusammenarbeit war durchweg professionell und ergebnisorientiert.',
      rating: 5,
      date: new Date('2023-11-20')
    },
    {
      id: '3',
      name: 'Sascha Hofmann',
      role: 'Geschäftsführer',
      company: 'FSH Service',
      content: 'Das CRM-System hat alle unsere Prozesse automatisiert und alles in einer Plattform vereint. DATEV, Banking, Payment Gateway und Online E-Signaturen - alles nahtlos integriert. Unsere Geschäftsprozesse wurden deutlich optimiert.',
      rating: 5,
      date: new Date('2023-09-10')
    }
  ];

  getAll(): Observable<Testimonial[]> {
    return of(this.testimonials);
  }

  getById(id: string): Observable<Testimonial | undefined> {
    return of(this.testimonials.find(t => t.id === id));
  }
}
