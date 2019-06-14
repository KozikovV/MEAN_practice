import { NgModule } from '@angular/core';

import {
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatStepperModule,
  MatDialogModule
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
    MatStepperModule,
    MatDialogModule
  ]
})

export class AngularMaterialModule {}
