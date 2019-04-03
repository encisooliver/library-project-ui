import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { AppSetting } from '../../app-setting';
import { User } from '../models/user-model';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorizaiton': 'Bearer' + localStorage.getItem('acces_token')
    })
  };
  
  private defaultAPIHostURL: string = this.appSettings.defaultAPIHostURL;

  public loginSource = new Subject<[Boolean, String]>();
  public loginObservable = this.loginSource.asObservable();
  public registerSource = new Subject<string[]>();
  public registerObservable = this.registerSource.asObservable();

  
  
  
  

  constructor(
    private router: Router, 
    private httpClient: HttpClient,
    private appSettings: AppSetting 
    ) { }

  //
  public register(objUser: User): void {
    this.httpClient.post(this.defaultAPIHostURL + "/api/Account/Register" , JSON.stringify(objUser),this.options).subscribe(
      response => {
        let responseResults: string[] = ["success", "Registered!"];
        this.registerSource.next(responseResults);
        console.log(response);
      },
      error => {
        let responseResults: string[] = ["failed", "Registration failed!"];
          this.registerSource.next(responseResults);
          console.log(error);
        }
    )
  } 

    // =====
    // Login
    // =====
    public login(username: string, password: string): void {
      let url = this.defaultAPIHostURL + '/token';
      let body = "username=" + username + "&password=" + password + "&grant_type=password";
      let options = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) };
  
      this.httpClient.post(url, body, options).subscribe(
        response => {
          localStorage.setItem('access_token', response["access_token"]);
          localStorage.setItem('expires_in', response["expires_in"]);
          localStorage.setItem('token_type', response["token_type"]);
          localStorage.setItem('username', response["userName"]);
          console.log(response);
  
          this.loginSource.next([true, "Login Successful."]);
        },
        error => {
          this.loginSource.next([false, error["error"].error_description]);
          console.log(error);
        }
      )
    }

}
