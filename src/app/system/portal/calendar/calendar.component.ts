import { Component, OnInit } from '@angular/core';
import { TrainingsService } from 'src/app/services/trainings.service';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  trainings: any[] = [];

  constructor(
    private trainingService: TrainingsService,
    private calendarService: CalendarService
  ) { }

  ngOnInit() {
    this.getTrainings();
  }

  getTrainings() {
    this.trainingService.getTrainingList()
    .subscribe(
      (data) => {
        this.trainings = data.body;
      }
    );
  }

  deleteTraining(trainingId: string) {
    this.trainingService.deleteTraining(trainingId)
    .subscribe(
      (data) => this.getTrainings()
    );
    this.calendarService.deleteCalendarEvent(trainingId);
  }
}
