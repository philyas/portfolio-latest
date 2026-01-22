export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  imageUrl: string;
  gallery: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: ProjectCategory;
  year: number;
  highlights?: string[];
}

export type ProjectCategory = 'web' | 'mobile' | 'backend' | 'fullstack' | 'devops';

export interface ProjectFilter {
  category?: ProjectCategory;
  featured?: boolean;
  technologies?: string[];
}
