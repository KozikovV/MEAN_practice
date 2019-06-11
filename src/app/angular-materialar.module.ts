import { NgModule } from '@angular/core';

import {
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatStepperModule
} from '@angular/material';

@NgModule({
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatStepperModule
  ]
})

export class AngularMaterialModule {}
