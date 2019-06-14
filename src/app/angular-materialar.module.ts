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
  MatDialogModule,
  MatSidenavModule
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
    MatDialogModule,
    MatSidenavModule
  ]
})

export class AngularMaterialModule {}
