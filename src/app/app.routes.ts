import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './components/layout/public-layout/public-layout.component';
import { LoginComponent } from './components/auth/login/login.component';
import { authenticatedGuard } from './core/guards/authenticated.guard';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { PrivateLayoutComponent } from './components/layout/private-layout/private-layout.component';

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
                loadComponent: () => import('./components/who-we-are/who-we-are.component').then(m => m.WhoWeAreComponent)
            },
            {
                path: 'curring-projects',
                loadComponent: () => import('./components/curring-projects/curring-projects.component').then(m => m.CurringProjectsComponent)
            },
            {
                path: 'case-studies-projects',
                loadComponent: () => import('./components/case-studies-projects/case-studies-projects.component').then(m => m.CaseStudiesProjectsComponent)
            },
            {
                path: 'contact-us',
                loadComponent: () => import('./components/contact/contact.component').then(m => m.ContactComponent)
            },
            {
                path: 'learn-about-us',
                loadComponent: () => import('./components/learn-about-us/learn-about-us.component').then(m => m.LearnAboutUsComponent)
            }
        ],
        canActivate: [authenticatedGuard]
    },
    {
        path: '',
        component: PrivateLayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'projects',
                loadComponent: () => import('./components/projects/projects.component').then(m => m.ProjectsComponent),
                canActivate: [roleGuard],
                data: { roles: ['ADMIN_ACCESS'] }
            }
        ],
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [authenticatedGuard]
    },
    {
        path: '**',
        redirectTo: 'who-we-are'
    }
];
