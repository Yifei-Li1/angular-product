import { Component } from '@angular/core';
import { UserService, TloginReturn } from '../../service/user.service';
import { LocalStorageService } from '../../service/local-storage-service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {

  username = '';
  password = '';
  flag = false;
  usernameFocus = false;
  passwordFocus = false;
  usernameTouched = false;
  passwordTouched = false;
  usernameWarning = false;
  passwordWarning = false;

  confirmPasswordWarning = false;
  confirmPasswordTouched = false;
  confirmPasswordFocus = false;
  confirmPassword = '';
  
  onInit() {}
  constructor(
    private loginService: UserService,
    private LocalStorageService: LocalStorageService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  onSignUpClick() {
    //console.log('in login component service', this.password, this.username);
    this.loginService.userRegister(this.username, this.password).subscribe({
      next: (data: TloginReturn) => {
        //this.LocalStorageService.set('token', data.access_token);
        //console.log(data.access_token);
        //this.router.navigate(['/products']);
        this._snackBar.open("registration success!");
        this.flag = false;
      },
      error: (error: any) => (this.flag = true),
    });
  }
 
  onUsernameBlur() {
    if (this.username == '') {
      this.usernameFocus = false;
    }
    if (this.username.length === 0) {
      this.usernameWarning = true;
    }
  }
  onUsernameFocus() {
    this.usernameFocus = true;
    this.usernameTouched = true;
  }
  onPasswordBlur() {
    if (this.password == '') {
      this.passwordFocus = false;
    }
    if (this.password.length === 0) {
      this.passwordWarning = true;
    }
  }
  onPasswordFocus() {
    this.passwordFocus = true;
    this.passwordTouched = true;
  }
  onPWkeyPress() {
    console.log('key pressed', this.password);
    if (this.password.length === 0 && this.passwordTouched) {
      this.passwordWarning = true;
    } else {
      this.passwordWarning = false;
    }
  }
  onUNkeyPress() {
    console.log('key pressed', this.username);
    if (this.username.length === 0 && this.usernameTouched) {
      this.usernameWarning = true;
    } else {
      this.usernameWarning = false;
    }
  }
  onConfirmPWkeyPress(){
    console.log('key pressed', this.confirmPassword);
    if (this.confirmPassword.length === 0 && this.confirmPasswordTouched) {
      this.confirmPasswordWarning = true;
    }
    else if(this.confirmPasswordTouched && this.confirmPassword !== this.password){
      this.confirmPasswordWarning = true;
    }
     else {
      this.confirmPasswordWarning = false;
    }
  }
  onConfirmPasswordFocus(){
    this.confirmPasswordFocus = true;
    this.confirmPasswordTouched = true;
  }
  onConfirmPasswordBlur(){
    if (this.confirmPassword == '') {
      this.confirmPasswordFocus = false;
    }
    if (this.confirmPassword.length === 0) {
      this.confirmPasswordWarning = true;
    }
  }
}
