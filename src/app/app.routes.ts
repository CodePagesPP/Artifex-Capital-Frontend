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
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'who-we-are'
    }
];
