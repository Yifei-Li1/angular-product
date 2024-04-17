import { Component } from '@angular/core';
import { LoginService, TloginReturn } from '../service/login.service';
import { LocalStorageService } from '../service/local-storage-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  flag = false;
  onInit() {}
  constructor(
    private loginService: LoginService,
    private LocalStorageService: LocalStorageService
  ) {}
  onLoginClick() {
    console.log('in login component service', this.password, this.username);
    this.loginService.userLogin(this.username, this.password).subscribe({
      next: (data: TloginReturn) => {
        this.LocalStorageService.set('token', data.access_token);
        console.log(data.access_token);
        this.flag = false;
      },
      error: (error: any) => (this.flag = !this.flag),
    });
  }
}
