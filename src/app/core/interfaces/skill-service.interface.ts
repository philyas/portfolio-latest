import { Observable } from 'rxjs';
import { Skill, SkillGroup, SkillCategory } from '../models';

export interface ISkillService {
  getAll(): Observable<Skill[]>;
  getGrouped(): Observable<SkillGroup[]>;
  getByCategory(category: SkillCategory): Observable<Skill[]>;
}
