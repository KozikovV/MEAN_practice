import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User, ProfileContent } from 'src/app/models/auth';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userProfileForm: FormGroup;
  profileUser: User;

  @Input() sidenav: MatSidenav;

  @ViewChild('avatar') avatar: ElementRef;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getProfileinformation();
    this.userProfileForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      nickName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      age: new FormControl(null, Validators.required),
      weight: new FormControl(null, Validators.required),
      height: new FormControl(null, Validators.required),
    });
  }

  showRequireError(control: AbstractControl, errorType: string): boolean {
    return control.hasError(errorType);
  }

  private getProfileinformation() {
    this.userService.getProfileInformation()
    .subscribe(
      (profile: ProfileContent) => {
        this.profileUser = profile.body;
        this.setForm(profile.body);
        this.setAvatar(this.avatarPath);
      }
    );
  }

  private setForm(user: User): void {
    this.userProfileForm.setValue({
      name: user.name,
      surname: user.surname,
      nickName: user.nickName,
      email: user.email,
      age: user.age,
      weight: user.weight,
      height: user.height,
    });
  }

  get avatarPath(): string {
    return this.profileUser.imagePath;
  }

  private setAvatar(path: string): void {
    (this.avatar.nativeElement as HTMLDivElement).style.backgroundImage = `url('${path}')`;
    (this.avatar.nativeElement as HTMLDivElement).style.backgroundSize = 'cover';
  }

  onCancel(): void {
    this.sidenav.toggle();
  }
}
