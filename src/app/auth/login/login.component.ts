import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Login } from 'src/app/models/auth';
import { CalendarService } from 'src/app/services/calendar.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;

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
      .subscribe(
        (data: Login) => {
          this.calendarService.signIn();
          this.userService.setToken(data.token);
          this.router.navigate(['./portal']);
        }
      );
    }
  }
}
