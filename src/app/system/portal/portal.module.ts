import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/angular-materialar.module';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { PortalComponent } from './portal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from '../profile/profile/profile.component';
import { MainPageComponent } from './main-page/main-page/main-page.component';
import { CreatePlanComponent } from './create-plan/create-plan.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TodayTrainingComponent } from './today-training/today-training.component';
import { CalendarSigninComponent } from './main-page/calendar-signin/calendar-signin.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PortalComponent,
    ProfileComponent,
    MainPageComponent,
    CreatePlanComponent,
    CalendarComponent,
    TodayTrainingComponent,
    CalendarSigninComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PortalComponent
  ]
})

export class PortalModule {}
