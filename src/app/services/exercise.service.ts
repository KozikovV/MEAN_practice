import { Injectable } from '@angular/core';
import { SERVICE_URL } from '../config/api-hosts';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ExerciseServices {
  baseUrl: string = SERVICE_URL.exercises;

  constructor(
    private httpClient: HttpClient
  ) {}

  getExerciseList() {
    return this.httpClient.get(this.baseUrl);
  }

}
