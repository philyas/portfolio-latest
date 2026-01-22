import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Skill, SkillGroup, SkillCategory } from '../models';
import { ISkillService } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SkillService implements ISkillService {
  
  private readonly skills: Skill[] = [
    // Frontend
    { id: '1', name: 'Angular', category: 'frontend', proficiency: 95, yearsOfExperience: 4 },
    { id: '2', name: 'TypeScript', category: 'frontend', proficiency: 95, yearsOfExperience: 4 },
    { id: '3', name: 'React', category: 'frontend', proficiency: 85, yearsOfExperience: 4 },
    { id: '4', name: 'React Native', category: 'frontend', proficiency: 80, yearsOfExperience: 3 },
    { id: '5', name: 'HTML/CSS/SCSS', category: 'frontend', proficiency: 95, yearsOfExperience: 4 },
    
    // Backend
    { id: '7', name: 'Node.js', category: 'backend', proficiency: 90, yearsOfExperience: 4 },
    { id: '8', name: 'Python', category: 'backend', proficiency: 85, yearsOfExperience: 4 },
    { id: '9', name: 'Java', category: 'backend', proficiency: 80, yearsOfExperience: 3 },
    { id: '10', name: 'C', category: 'backend', proficiency: 75, yearsOfExperience: 2 },
    { id: '11', name: 'NestJS', category: 'backend', proficiency: 88, yearsOfExperience: 4 },
    
    // Database
    { id: '12', name: 'PostgreSQL', category: 'database', proficiency: 90, yearsOfExperience: 4 },
    { id: '13', name: 'MongoDB', category: 'database', proficiency: 85, yearsOfExperience: 4 },
    { id: '14', name: 'Redis', category: 'database', proficiency: 80, yearsOfExperience: 4 },
    { id: '15', name: 'Oracle', category: 'database', proficiency: 85, yearsOfExperience: 4 },
    { id: '16', name: 'MySQL', category: 'database', proficiency: 85, yearsOfExperience: 4 },
    
    // DevOps
    { id: '17', name: 'Docker', category: 'devops', proficiency: 90, yearsOfExperience: 4 },
    { id: '18', name: 'AWS', category: 'devops', proficiency: 85, yearsOfExperience: 4 },
    { id: '20', name: 'Google Cloud Platform', category: 'devops', proficiency: 80, yearsOfExperience: 3 },
    { id: '19', name: 'CI/CD', category: 'devops', proficiency: 90, yearsOfExperience: 4 },
    
    // Tools
    { id: '21', name: 'Git', category: 'tools', proficiency: 95, yearsOfExperience: 4 },
    { id: '22', name: 'Workflow', category: 'tools', proficiency: 90, yearsOfExperience: 4 },
  ];

  private readonly categoryLabels: Record<SkillCategory, string> = {
    frontend: 'Frontend Development',
    backend: 'Backend Development',
    database: 'Datenbanken',
    devops: 'DevOps & Cloud',
    tools: 'Tools & Workflow',
    other: 'Sonstiges'
  };

  getAll(): Observable<Skill[]> {
    return of(this.skills);
  }

  getGrouped(): Observable<SkillGroup[]> {
    return this.getAll().pipe(
      map(skills => {
        const groups: Map<SkillCategory, Skill[]> = new Map();
        
        skills.forEach(skill => {
          const existing = groups.get(skill.category) || [];
          groups.set(skill.category, [...existing, skill]);
        });

        const result: SkillGroup[] = [];
        groups.forEach((skills, category) => {
          result.push({
            category,
            label: this.categoryLabels[category],
            skills: skills.sort((a, b) => b.proficiency - a.proficiency)
          });
        });

        return result;
      })
    );
  }

  getByCategory(category: SkillCategory): Observable<Skill[]> {
    return this.getAll().pipe(
      map(skills => skills.filter(s => s.category === category))
    );
  }
}
