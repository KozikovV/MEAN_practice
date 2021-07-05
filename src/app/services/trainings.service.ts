import { Injectable } from '@angular/core';
import { SERVICE_URL } from '../config/api-hosts';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalendarEvent } from '../config/models';
import {CreateTrainingResponse, DeleteTraining, TrainingList, TrainingRes} from '../models/api-models';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {

  base_url: string = SERVICE_URL.trainings;

  constructor(
    private httpClient: HttpClient
  ) { }

  createTraining(training: any, calendarCred: CalendarCred): Observable<CreateTrainingResponse> {
    return this.httpClient.post<CreateTrainingResponse>(this.base_url + '/create', {training, calendarCred});
  }

  getTrainingList(): Observable<TrainingList> {
    return this.httpClient.get<TrainingList>(this.base_url);
  }

  getTrainingById(trainingId: string): Observable<TrainingRes> {
    return this.httpClient.get<TrainingRes>(this.base_url + '/' + trainingId);
  }

  deleteTraining(trainingId: string): Observable<DeleteTraining> {
    return this.httpClient.delete<DeleteTraining>(`${this.base_url}/${trainingId}/delete`);
  }
}

export interface CalendarCred {
  calendar_token: string;
  calendar_id: string;
  calendar_event: CalendarEvent;
}
