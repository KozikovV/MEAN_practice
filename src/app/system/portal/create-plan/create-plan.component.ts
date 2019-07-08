import { Component, OnInit } from '@angular/core';
import { ExerciseService } from 'src/app/services/exercise.service';
import { FormControl, Validators } from '@angular/forms';
import { TIME_ZONE, CalendarEvent } from 'src/app/config/models';
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

  constructor(
    private exerciseService: ExerciseService,
    private trainingsService: TrainingsService,
    private calendarService: CalendarService
  ) { }

  ngOnInit() {
    this.serializedDate = new FormControl(new Date().toISOString(), Validators.required);
    this.serializedTime = new FormControl('08:00', Validators.required);
    this.exerciseService.getExerciseList()
    .subscribe(
      (data) => this.exercises = data.exercises
    );
  }

  onSelectExercise(event, exercise) {
    if (event.checked) {
      this.selectedExercises.push(exercise);
    } else {
      this.selectedExercises = this.selectedExercises.filter(exerciseFromArray => exerciseFromArray.exercisesId !== exercise.exercisesId);
    }
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



}
