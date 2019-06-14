import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormArray, NgForm, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.scss']
})
export class CreateExerciseComponent implements OnInit {
  createExerciseForm: FormGroup;
  targets: number[] = [1];
  constructor(
    public dialogRef: MatDialogRef<CreateExerciseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.createExerciseForm = new FormGroup({
      title: new FormControl(),
      information: new FormGroup({
        description: new FormControl(),
        targetMuscle: new FormArray([
          new FormControl()
        ])
      }),
    });
  }

  createExercise() {
  }
  ocCloseModal(): void {
    this.dialogRef.close();
  }

  addTargetMuscle() {
    if (this.targets.length < 5) {
      this.targets.push(this.targetLastValue + 1);
      (this.createExerciseForm.get('information.targetMuscle') as FormArray).push(new FormControl);
    }
  }

  get targetLastValue(): number {
    return this.targets[this.targets.length - 1];
  }

}
