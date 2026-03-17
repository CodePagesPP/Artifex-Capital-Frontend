import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './components/layout/public-layout/public-layout.component';
import { LoginComponent } from './components/auth/login/login.component';
import { authenticatedGuard } from './core/guards/authenticated.guard';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { PrivateLayoutComponent } from './components/layout/private-layout/private-layout.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';

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
            },
            {
                path: 'incoming-projects',
                loadComponent: () => import('./components/incoming-projects/incoming-projects.component').then(m => m.IncomingProjectsComponent)
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
                data: { roles: ['ADMIN_ACCESS' ] }
            },
            {
                path: 'c/projects',
                loadComponent: () => import('./components/project-clients/project-clients.component').then(m => m.ProjectClientsComponent),
                canActivate: [roleGuard],
                data: { roles: ['CLIENT_ACCESS' ] }
            },
            {
                path: 'clients',
                loadComponent: () => import('./components/clients/clients.component').then(m => m.ClientsComponent),
                canActivate: [roleGuard],
                data: { roles: ['ADMIN_ACCESS' ] }
            }
        ],
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [authenticatedGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [authenticatedGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [authenticatedGuard]
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent,
        canActivate: [authenticatedGuard]
    },
    {
        path: '**',
        redirectTo: 'who-we-are'
    }
];
