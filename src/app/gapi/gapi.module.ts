import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  GoogleApiModule,
  GoogleApiService,
  GoogleAuthService,
  NgGapiClientConfig,
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from 'ng-gapi';

const gapiClientConfig: NgGapiClientConfig = {
  client_id: '338028287680-ff46dmkam0d3gsv8b4a17i4bev18gngm.apps.googleusercontent.com',
  discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
  scope: ['https://www.googleapis.com/auth/calendar'].join(' '),
  cookie_policy: ''
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
  ]
})
export class GapiModule { }
