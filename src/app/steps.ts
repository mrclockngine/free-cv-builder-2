import { Step } from './core/interfaces';
import { EducationComponent } from './features/builder/steps/education/education.component';
import { ExperienceComponent } from './features/builder/steps/experience/experience.component';
import { FinalizeComponent } from './features/builder/steps/finalize/finalize.component';
import { OthersComponent } from './features/builder/steps/others/others.component';
import { PersonalInfoComponent } from './features/builder/steps/personal-info/personal-info.component';
import { SkillsComponent } from './features/builder/steps/skills/skills.component';
import { SummaryComponent } from './features/builder/steps/summary/summary.component';

export const Steps: Step[] = [
  // {
  //   title: 'Template and Theme',
  //   key: 'template-and-theme',
  //   component: TemplateAndThemeComponent,
  // },
  {
    title: 'Personal Info',
    key: 'personal-info',
    component: PersonalInfoComponent,
  },
  {
    title: 'Experience',
    key: 'experience',
    component: ExperienceComponent,
  },
  {
    title: 'Education',
    key: 'education',
    component: EducationComponent,
  },
  {
    title: 'Skills',
    key: 'skills',
    component: SkillsComponent,
  },
  {
    title: 'Summary',
    key: 'summary',
    component: SummaryComponent,
  },
  {
    title: 'Others',
    key: 'others',
    component: OthersComponent,
  },
  {
    title: 'Finalize',
    key: 'finalize',
    component: FinalizeComponent,
  },
];

export const StepKeys = Steps.map((step) => step.key);
