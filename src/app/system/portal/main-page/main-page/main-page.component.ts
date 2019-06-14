import { Component, OnInit } from '@angular/core';
import { ExerciseService } from 'src/app/services/exercise.service';
import { MatDialog } from '@angular/material';
import { CreateExerciseComponent } from 'src/app/modals/create-exercise/create-exercise.component';
import { ExerciseResponse, Exercise } from 'src/app/models/exercise';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  exerciseList: Exercise[];
  constructor(
    private exerciseService: ExerciseService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.fetchExercises();
  }

  fetchExercises() {
    this.exerciseService.getExerciseList()
    .subscribe(
      (response: ExerciseResponse) => {
        this.exerciseList = response.exercises;
      }
    );
  }

  openCreateExerciseModal(): void {
    const dialogRef = this.dialog.open(CreateExerciseComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  deleteExercise(id: string): void {
    this.exerciseService.deleteExercise(id)
    .subscribe(
      (response) => this.fetchExercises()
    );
  }

  editExercise(exercise: Exercise): void {
    const dialogRef = this.dialog.open(CreateExerciseComponent, { data: exercise

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.exerciseService.editExercise(Object.assign({exercisesId: exercise.exercisesId}, result))
        .subscribe(
          (response) => this.fetchExercises()
        );
      }
    });
  }
}
