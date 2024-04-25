import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  login = true;

  onLoginClick(){
    this.login = true;
    console.log(this.login)
  }
  onSignUpClick(){
    this.login = false;
    console.log(this.login)
  }
}
