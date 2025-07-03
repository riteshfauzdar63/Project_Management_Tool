import { Routes } from '@angular/router';
import { TaskAssignPage } from './components/task-assign-page/task-assign-page';
import { HomePage } from './components/home-page/home-page';

export const routes: Routes = [
    {
        path: 'home',
        component: HomePage
    },
    {
        path: 'TaskAssignPage',
        component: TaskAssignPage
    },
    {
        path: '',
        redirectTo : 'home',
        pathMatch : 'full'
    },
];
