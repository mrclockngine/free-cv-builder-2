import { Step } from '../../interfaces';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { FinalizeComponent } from './finalize/finalize.component';
import { OthersComponent } from './others/others.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { SkillsComponent } from './skills/skills.component';
import { SummaryComponent } from './summary/summary.component';
import { TemplateAndThemeComponent } from './template-and-theme/template-and-theme.component';

export const Steps: Step[] = [
  {
    title: 'Template and Theme',
    key: 'template-and-theme',
    component: TemplateAndThemeComponent,
  },
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
