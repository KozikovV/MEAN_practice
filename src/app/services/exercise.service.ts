import {ExerciseResponse, Exercise, CreateExercise, DeleteExercise, EditExercise} from '../models/api-models';
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

  createExercise(exercise: Exercise): Observable<CreateExercise> {
    return this.httpClient.post<CreateExercise>(`${this.baseUrl}/create`, {exercise});
  }

  deleteExercise(exerciseId): Observable<DeleteExercise> {
    return this.httpClient.delete<DeleteExercise>(`${this.baseUrl}/delete/${exerciseId}`);
  }

  editExercise(exercise: Exercise): Observable<EditExercise> {
    return this.httpClient.put<EditExercise>(`${this.baseUrl}/edit/${exercise.exercisesId}`, exercise);
  }

}
