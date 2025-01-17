import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'dropdown-menu',
    loadComponent: () => import('@components/dropdown-menu/dropdown-menu.component').then(m => m.DropdownMenuComponent),
    data: { title: 'Dropdown Menu' }
  }
];
