import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DefaultComponent } from './dashboards/default/default.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
 
  { path: 'dashboard', component: DefaultComponent },

 
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'report', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule) },


  { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
 

  { path: 'pages', loadChildren: () => import('./utility/utility.module').then(m => m.UtilityModule) },
 
 
 
  { path: 'charts', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule) },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
