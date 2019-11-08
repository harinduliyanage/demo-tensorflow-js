import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {LoginComponent} from './component/login/login.component';
import {SegmentationComponent} from './component/dashboard/content/segmentation/segmentation.component';
import {ClassificationComponent} from './component/dashboard/content/classification/classification.component';

const routes: Routes = [
  {path: '', component: LoginComponent, data: {title: 'Login'}},
  {path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'},
    children: [
      {path: 'segmentation', component: SegmentationComponent, data: {title: 'Segmentation'}},
      {path: 'classification', component: ClassificationComponent, data: {title: 'Classification'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
