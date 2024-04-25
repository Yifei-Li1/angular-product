import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  userLogin(username:string,password:string):any{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    console.log("inside login service",password,username)

    // URLSearchParams will automatically encode the parameters
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    body.set('grant_type', 'password');
    return this.http.post<string>('https://localhost:44377/token', body.toString(), { headers: headers, responseType:'json' });
  }
  userRegister(username:string,password:string):any{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    console.log("inside register service",password,username)

    // URLSearchParams will automatically encode the parameters
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    
    return this.http.post<string>('https://localhost:44377/api/register', body.toString(), { headers: headers, responseType:'json' });
  }
  
}
export type TloginReturn={
  access_token:string,
  token_type:string,
  expires_in:number
}

