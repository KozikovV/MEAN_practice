import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormArray, NgForm, AbstractControl, Validators } from '@angular/forms';
import { ExerciseService } from 'src/app/services/exercise.service';
import { Exercise } from 'src/app/models/exercise';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.scss']
})
export class CreateExerciseComponent implements OnInit {
  createExerciseForm: FormGroup;
  editState: boolean;
  constructor(
    public dialogRef: MatDialogRef<CreateExerciseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Exercise,
    private exerciseService: ExerciseService
  ) { }

  ngOnInit() {
    this.editState = !!this.data;
    this.createExerciseForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      information: new FormGroup({
        description: new FormControl(null, Validators.required),
        targetMuscle: new FormArray([])
      }),
    });
    this.patchArrayValue();
  }

  createExercise() {
    if (!this.createExerciseForm.valid) {
      return;
    }
    if (!this.editState) {
      this.exerciseService.createExercise(this.createExerciseForm.value)
      .subscribe(
        () => {
          this.dialogRef.close(this.createExerciseForm.value);
        }
      );
    } else {
      const exercise = this.createExerciseForm.value;
      Object.assign(exercise, {exercisesId: this.data.exercisesId});
      this.exerciseService.editExercise(exercise)
      .subscribe(
        (data) => {
          this.dialogRef.close(exercise);
        }
      );
    }
  }

  ocCloseModal(): void {
    this.dialogRef.close();
  }

  addTargetMuscle() {
    if (this.createExerciseForm.value.information.targetMuscle.length < 5) {
      (this.createExerciseForm.get('information.targetMuscle') as FormArray).push(new FormControl);
    }
  }

  patchArrayValue() {
    if (!!this.data) {
      this.createExerciseForm.get('title').setValue(this.data.title);
      this.createExerciseForm.get('information.description').setValue(this.data.information.description);
      this.data.information.targetMuscle.forEach((muscle: string, i: number) => {
        (this.createExerciseForm.get('information.targetMuscle') as FormArray).push(new FormControl);
        this.createExerciseForm.get(`information.targetMuscle.${i}`).setValue(muscle);
      });
    }
  }

  get buttonName(): string {
    return this.editState ? 'Update' : 'Add';
  }

}
