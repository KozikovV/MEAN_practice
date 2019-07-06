import { Injectable } from '@angular/core';
import { SERVICE_URL } from '../config/api-hosts';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {

  base_url: string = SERVICE_URL.trainings;

  constructor(
    private httpClient: HttpClient
  ) { }

  createTraining(training: any): Observable<any> {
    return this.httpClient.post(this.base_url + '/create', training);
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
