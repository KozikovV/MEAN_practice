import { Component, OnInit } from '@angular/core';
import { ExerciseServices } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.scss']
})
export class CreatePlanComponent implements OnInit {

  constructor(
    private exerciseService: ExerciseServices
  ) { }

  ngOnInit() {
    this.exerciseService.getExerciseList()
    .subscribe(
      (data) => console.log(data)
    )
  }

}
