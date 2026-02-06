import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: PublicLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'who-we-are',
                pathMatch: 'full'
            },
            {
                path: 'who-we-are',
                loadComponent: () => import('./who-we-are/who-we-are.component').then(m => m.WhoWeAreComponent)
            },
            {
                path: 'curring-projects',
                loadComponent: () => import('./curring-projects/curring-projects.component').then(m => m.CurringProjectsComponent)
            },
            {
                path: 'case-studies-projects',
                loadComponent: () => import('./case-studies-projects/case-studies-projects.component').then(m => m.CaseStudiesProjectsComponent)
            },
            {
                path: 'contact-us',
                loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent)
            },
            {
                path: 'learn-about-us',
                loadComponent: () => import('./learn-about-us/learn-about-us.component').then(m => m.LearnAboutUsComponent)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'who-we-are'
    }
];
