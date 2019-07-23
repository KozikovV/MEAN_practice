import { Component, OnInit } from '@angular/core';
import { ExerciseService } from 'src/app/services/exercise.service';
import { FormControl, Validators } from '@angular/forms';
import { CalendarEvent } from 'src/app/config/models';
import { TrainingsService } from 'src/app/services/trainings.service';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.scss']
})
export class CreatePlanComponent implements OnInit {

  exercises: any[] = [];
  selectedExercises: any[] = [];
  serializedDate: FormControl;
  serializedTime: FormControl;
  repsInput: FormControl;
  countInput: FormControl;
  cycleInput: FormControl;
  timeInput: FormControl;
  restInput: FormControl;



  typeOfExercises: string[] = ['Cardio', 'Anaerobical'];
  isAnaerobical: boolean;

  constructor(
    private exerciseService: ExerciseService,
    private trainingsService: TrainingsService,
    private calendarService: CalendarService
  ) { }

  ngOnInit() {
    this.repsInput = new FormControl();
    this.timeInput = new FormControl();
    this.cycleInput = new FormControl();
    this.countInput = new FormControl();
    this.restInput = new FormControl();
    this.serializedDate = new FormControl(new Date().toISOString(), Validators.required);
    this.serializedTime = new FormControl('08:00', Validators.required);
    this.exerciseService.getExerciseList()
    .subscribe(
      (data) => this.exercises = data.exercises
    );
  }

  onSelectExercise(exercise) {
    this.selectedExercises.push(exercise);
  }

  createTrainingDay() {
    const calendarEvent: CalendarEvent = this.calendarService.createCalendarEvent(this.serializedTime.value, this.serializedDate.value);
    this.selectedExercises = this.selectedExercises.map((exercise) => {
      return {
        title: exercise.title,
        information: exercise.information
      };
    });
    this.trainingsService.createTraining({
      date: this.calendarService.dateConverter(this.serializedDate.value), exercises: this.selectedExercises
    },
    {
      calendar_event: calendarEvent,
      calendar_id: this.calendarService.calendarId,
      calendar_token: this.calendarService.calendarToken
    })
    .subscribe(
      (data: any) => {
        console.log(data);
      }
    );
  }


  toggleTypeOfExercise(): void {
    this.isAnaerobical = !this.isAnaerobical;
  }

  addRest(rest: HTMLInputElement): void {
    const restToExercises = {
      // Todo correct implementation of  rest depend of new schema
    };

    this.selectedExercises.push(restToExercises);
  }

  get cardioTrainings(): any[] {
    return this.exercises.filter((exercise: any) => exercise.type === 'cardio');
  }

  get anaerobicTrainings(): any[] {
    return this.exercises.filter((exercise: any) => exercise.type === 'anaerobic');
  }

}
