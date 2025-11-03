import { Routes } from '@angular/router'

export const routes: Routes = [
  { path: 'notes', loadComponent: () => import('./pages/notes/notes.page').then(m => m.NotesPage) },
  { path: 'counter', loadComponent: () => import('./pages/counter/counter.page').then(m => m.CounterPage) },
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
]
