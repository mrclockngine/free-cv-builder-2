import { Routes } from '@angular/router';
import { BuilderComponent } from './features/builder/builder.component';
import { Steps } from './steps';

export const routes: Routes = [
  {
    path: 'builder',
    component: BuilderComponent,
    children: [
      ...Steps.map((step) => ({ path: step.key, component: step.component })),
      {
        path: '',
        redirectTo: 'template-and-theme',
        pathMatch: 'full',
      },
    ],
  },
];
