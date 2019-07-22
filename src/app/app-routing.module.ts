import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SingupComponent } from './auth/singup/singup.component';
import { PortalComponent } from './system/portal/portal.component';
import { MainPageComponent } from './system/portal/main-page/main-page/main-page.component';
import { CreatePlanComponent } from './system/portal/create-plan/create-plan.component';
import { TodayTrainingComponent } from './system/portal/today-training/today-training.component';
import { CalendarComponent } from './system/portal/calendar/calendar.component';
import {LogginedGuard} from './guard/loggined.guard';

const routes: Routes = [
  {path: '',  redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'singup', component: SingupComponent},
  {path: 'portal', component: PortalComponent, canActivateChild: [LogginedGuard], children: [
    {path: '', redirectTo: 'main-page', pathMatch: 'full'},
    {path: 'main-page', component: MainPageComponent},
    {path: 'create-training', component: CreatePlanComponent},
    {path: 'today-training/:trainingId', component: TodayTrainingComponent},
    {path: 'my-calendar', component: CalendarComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
