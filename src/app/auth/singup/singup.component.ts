import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Singup } from 'src/app/models/auth';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})

export class SingupComponent implements OnInit {
  singupForm: FormGroup;
  imagePreview: string = './assets/images/user.jpg';

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.singupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      nickName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      age: new FormControl(null, Validators.required),
      weight: new FormControl(null, Validators.required),
      height: new FormControl(null, Validators.required),
      image: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)

    });
  }

  onSubmit() {
    if (this.singupForm.valid) {
      this.userService.singup(this.singupForm.value)
      .subscribe(
        (data: Singup) => {
          this.singupForm.reset();
          this.router.navigate(['/login']);
        }
      );
    }
  }

  onUploadImage() {
    const file = (event.target as HTMLInputElement).files[0];
        if (file) {
            this.singupForm.patchValue({image: file});
            this.singupForm.get('image').updateValueAndValidity();
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.imagePreview = reader.result as string;
            };
        } else {
            this.imagePreview = '';
        }
  }

  showError(control: AbstractControl, errorType: string): boolean {
    return control.hasError(errorType);
  }
}
