import { Routes } from '@angular/router';
import { TaskAssignPage } from './components/task-assign-page/task-assign-page';
import { HomePage } from './components/home-page/home-page';
import { PaHomePage } from './components/pa-home-page/pa-home-page';
import { A } from '@angular/cdk/keycodes';
import { TaskExecutionPage } from './components/task-execution-page/task-execution-page';
import { TaskCompletionPage } from './components/task-completion-page/task-completion-page';

export const routes: Routes = [
    {
        path: 'taskAssignPage',
        component: HomePage
    },
    {
        path: 'taskExecutionPage',
        component: TaskExecutionPage
    },
    {
        path: 'taskCompletionPage',
        component: TaskCompletionPage
    },
    {
        path: 'home-page',
        component : PaHomePage
    },
    {
        path: '',
        redirectTo : 'home-page',
        pathMatch : 'full'
    }
   
];
