import { Component, OnInit } from '@angular/core';
import { ExerciseServices } from 'src/app/services/exercise.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  constructor(
    private exerciseService: ExerciseServices,
    private router: Router
  ) {}

  ngOnInit() {
    this.exerciseService.getExerciseList().subscribe((data) => console.log(data));
  }

  onLogout() {
    this.router.navigate(['login']);
  }

}
