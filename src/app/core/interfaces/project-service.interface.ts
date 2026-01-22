import { Observable } from 'rxjs';
import { Project, ProjectFilter } from '../models';

// Interface Segregation Principle - kleine, spezifische Interfaces
export interface IProjectReader {
  getAll(): Observable<Project[]>;
  getById(id: string): Observable<Project | undefined>;
  getFeatured(): Observable<Project[]>;
}

export interface IProjectFilter {
  filterBy(filter: ProjectFilter): Observable<Project[]>;
  getCategories(): Observable<string[]>;
}

export interface IProjectService extends IProjectReader, IProjectFilter {}
