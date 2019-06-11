import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/angular-materialar.module';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { PortalComponent } from './portal.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from '../profile/profile/profile.component';
import { MainPageComponent } from './main-page/main-page/main-page.component';
import { CreatePlanComponent } from './create-plan/create-plan.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PortalComponent,
    ProfileComponent,
    MainPageComponent,
    CreatePlanComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    FormsModule
  ],
  exports: [
    PortalComponent
  ]
})

export class PortalModule {}
