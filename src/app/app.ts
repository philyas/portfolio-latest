import { Component } from '@angular/core';
import { NavigationComponent } from './features/navigation/navigation.component';
import { HeroComponent } from './features/hero/hero.component';
import { AboutComponent } from './features/about/about.component';
import { SkillsComponent } from './features/skills/skills.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { TestimonialsComponent } from './features/testimonials/testimonials.component';
import { ContactComponent } from './features/contact/contact.component';
import { FooterComponent } from './features/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavigationComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    TestimonialsComponent,
    ContactComponent,
    FooterComponent
  ],
  template: `
    <app-navigation />
    <main>
      <app-hero />
      <app-about />
      <app-skills />
      <app-projects />
      <app-testimonials />
      <app-contact />
    </main>
    <app-footer />
  `,
  styles: [`
    main {
      overflow-x: hidden;
    }
  `]
})
export class App {}
