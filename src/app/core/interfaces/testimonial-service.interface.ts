import { Observable } from 'rxjs';
import { Testimonial } from '../models';

export interface ITestimonialService {
  getAll(): Observable<Testimonial[]>;
  getById(id: string): Observable<Testimonial | undefined>;
}
