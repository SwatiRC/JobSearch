import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PageComponent } from './page/page.component';

export const routes: Routes = [
    { path: 'jobs', component: MainComponent },
    { path: 'favourite', component: MainComponent },
    { path: 'job/:id', component: PageComponent },
    { path: '', redirectTo: '/jobs', pathMatch: 'full' }, // Redirect to /jobs by default
    { path: '**', redirectTo: '/jobs' } // Redirect to /jobs for any other unknown route
  ];
