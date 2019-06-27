import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SingupComponent } from './auth/singup/singup.component';
import { PortalComponent } from './system/portal/portal.component';
import { MainPageComponent } from './system/portal/main-page/main-page/main-page.component';
import { CreatePlanComponent } from './system/portal/create-plan/create-plan.component';

const routes: Routes = [
  {path: '',  redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'singup', component: SingupComponent},
  {path: 'portal', component: PortalComponent,  children: [
    {path: '', redirectTo: 'main-page', pathMatch: 'full'},
    {path: 'main-page', component: MainPageComponent},
    {path: 'create-training', component: CreatePlanComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
