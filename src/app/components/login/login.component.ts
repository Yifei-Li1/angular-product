import { Component } from '@angular/core';
import { UserService, TloginReturn } from '../../service/user.service';
import { LocalStorageService } from '../../service/local-storage-service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  flag = false;
  usernameFocus = false;
  passwordFocus = false;
  usernameTouched = false;
  passwordTouched = false;
  usernameWarning = false;
  passwordWarning = false;
  onInit() {}
  constructor(
    private loginService: UserService,
    private LocalStorageService: LocalStorageService,
    private router:Router
  ) {}
  onLoginClick() {
    console.log('in login component service', this.password, this.username);
    this.loginService.userLogin(this.username, this.password).subscribe({
      next: (data: TloginReturn) => {
        this.LocalStorageService.set('token', data.access_token);
        console.log(data.access_token);
        this.router.navigate(['/products'])
        this.flag = false;
      },
      error: (error: any) => (this.flag = true),
    });
  }

  onUsernameBlur() {
    if (this.username == "") {
      this.usernameFocus = false;
    }
    if(this.username.length === 0){
      this.usernameWarning = true;
    }
  }
  onUsernameFocus() {
    this.usernameFocus = true;
    this.usernameTouched = true;
  }
  onPasswordBlur() {
    if (this.password == "") {
      this.passwordFocus = false;
    }
    if(this.password.length === 0){
      this.passwordWarning = true;
    }
  }
  onPasswordFocus() {
    this.passwordFocus = true;
    this.passwordTouched = true;
  }
  onPWkeyPress(){
    console.log("key pressed", this.password)
    if(this.password.length === 0 && this.passwordTouched){
      this.passwordWarning = true;
    }
    else{
      this.passwordWarning = false;
    }
  }
  onUNkeyPress(){
    console.log("key pressed", this.username)
    if(this.username.length === 0 && this.usernameTouched){
      this.usernameWarning = true;
    }
    else{
      this.usernameWarning = false;
    }
  }
}
