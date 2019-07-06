import { ExerciseResponse, Exercise } from './../models/exercise';
import { Injectable } from '@angular/core';
import { SERVICE_URL } from '../config/api-hosts';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ExerciseService {
  baseUrl: string = SERVICE_URL.exercises;

  constructor(
    private httpClient: HttpClient
  ) {}

  getExerciseList(): Observable<ExerciseResponse> {
    return this.httpClient.get<ExerciseResponse>(this.baseUrl);
  }

  createExercise(exercise: Exercise): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/create`, {exercise});
  }

  deleteExercise(exerciseId): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/delete/${exerciseId}`);
  }

  editExercise(exercise: Exercise): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/edit/${exercise.exercisesId}`, exercise);
  }

}
