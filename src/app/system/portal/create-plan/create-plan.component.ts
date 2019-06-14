import { Component, OnInit } from '@angular/core';
import { ExerciseService } from 'src/app/services/exercise.service';
import { CreateExerciseComponent } from 'src/app/modals/create-exercise/create-exercise.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.scss']
})
export class CreatePlanComponent implements OnInit {

  constructor(
    private exerciseService: ExerciseService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.exerciseService.getExerciseList()
    .subscribe(
      (data) => console.log(data)
    );
  }

  openCreateExerciseModal(): void {
    const dialogRef = this.dialog.open(CreateExerciseComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
