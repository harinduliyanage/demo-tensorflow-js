import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {LoginComponent} from './component/login/login.component';
import {SegmentationComponent} from './component/dashboard/content/segmentation/segmentation.component';
import {ClassificationComponent} from './component/dashboard/content/classification/classification.component';
import {ObjectDetectionComponent} from './component/dashboard/content/object-detection/object-detection.component';

const routes: Routes = [
  {path: '', component: LoginComponent, data: {title: 'Login'}},
  {path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'},
    children: [
      {path: 'segmentation', component: SegmentationComponent, data: {title: 'Segmentation'}},
      {path: 'object-detection', component: ObjectDetectionComponent, data: {title: 'Object Detection'}},
      {path: 'classification', component: ClassificationComponent, data: {title: 'Classification'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
