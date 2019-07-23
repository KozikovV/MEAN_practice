import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Login } from 'src/app/models/auth';
import { CalendarService } from 'src/app/services/calendar.service';
import {ReplaySubject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  private readonly destroy$: ReplaySubject<void> = new ReplaySubject<void>();

  showError: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private calendarService: CalendarService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      nickName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data: Login) => {
            this.calendarService.signIn(); // TODO remove it to login modal
            this.userService.setToken(data.token);
            this.router.navigate(['./portal']);
          }
        );
    } else {
      this.showError = true;
    }
  }

}
