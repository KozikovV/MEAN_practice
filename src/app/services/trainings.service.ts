import { Injectable } from '@angular/core';
import { SERVICE_URL } from '../config/api-hosts';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalendarEvent } from '../config/models';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {

  base_url: string = SERVICE_URL.trainings;

  constructor(
    private httpClient: HttpClient
  ) { }

  createTraining(training: any, calendarCred: CalendarCred): Observable<any> {
    return this.httpClient.post(this.base_url + '/create', {training, calendarCred});
  }

  getTrainingList(): Observable<any> {
    return this.httpClient.get(this.base_url);
  }

  getTrainingById(trainingId: string): Observable<any> {
    return this.httpClient.get(this.base_url + '/' + trainingId);
  }

  deleteTraining(trainingId: string): Observable<any> {
    return this.httpClient.delete(`${this.base_url}/${trainingId}/delete`);
  }
}

export interface CalendarCred {
  calendar_token: string;
  calendar_id: string;
  calendar_event: CalendarEvent;
}
