import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainingsService } from 'src/app/services/trainings.service';

@Component({
  selector: 'app-today-training',
  templateUrl: './today-training.component.html',
  styleUrls: ['./today-training.component.scss']
})
export class TodayTrainingComponent implements OnInit {

  training: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private trainingService: TrainingsService
  ) { }

  ngOnInit() {
    this.trainingService.getTrainingById(this.activatedRoute.snapshot.params.trainingId)
    .subscribe(
      (data) => this.training = data.body
    );
  }

}
