import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppSetting } from '../../app-setting';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ObservableArray } from 'wijmo/wijmo';
import { UserModel } from './user.model';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private appSettings: AppSetting 
  ) { }
  
  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    })
  };

  private defaultAPIHostURL: string = this.appSettings.defaultAPIHostURL;

  public addUserSource = new Subject<string[]>();
  public addUserObservable = this.addUserSource.asObservable();

  public userDetailSource = new Subject<string[]>();
  public userDetailSourceObservable = this.userDetailSource.asObservable();

  public userListSource = new Subject<ObservableArray>();
  public userListSourceObservable = this.userListSource.asObservable();
  
  public userTypeListSource = new Subject<ObservableArray>();
  public userTypeObservable = this.userTypeListSource.asObservable();

  public deleteUserSource = new Subject<string[]>();
  public deleteUserObservable = this.deleteUserSource.asObservable();

  // Add user 
  public addUser(objNewUser: UserModel): void {
    this.httpClient.post(this.defaultAPIHostURL + "/api/Account/Register", JSON.stringify(objNewUser), this.options).subscribe(
      response => {
        let responseResults: string[] = ["success", "Add succeccful"];
        this.addUserSource.next(responseResults);
        console.log(response)
      },
      error => {
        let errorResults: string[] = ["failed", error["error"]];
        this.addUserSource.next(errorResults);
        console.log(error)
      }
    )
  }


  // List user group
  public listUserService(): void {
    console.log(this.options);

    let userListObservableArray = new ObservableArray();
    this.userListSource.next(userListObservableArray);

    this.httpClient.get(this.defaultAPIHostURL + "/api/Library/User/List", this.options).subscribe(
      response => {
        var results = response;
        if (results["length"] > 0) {
          for (var i = 0; i <= results["length"] - 1; i++) {
            userListObservableArray.push({
                Id: results[i].Id,
                UserName: results[i].UserName,
                FirstName: results[i].FirstName,
                LastName: results[i].LastName,
                Email: results[i].Email,
                Password: results[i].Password,
                UserTypeId: results[i].UserTypeId
            });
          }
        }
        this.userListSource.next(userListObservableArray);
      }
    ); 
  }

  // User Type List
  public listUserType(): void {
    let userTypeListObservableArray = new ObservableArray();
    this.userTypeListSource.next(userTypeListObservableArray);

    this.httpClient.get(this.defaultAPIHostURL + "/api/Library/User/UserType", this.options).subscribe(
      response => {
        var results = response;
        if(results["length"] > 0) {
          for (var i = 0; i <= results["length"] - 1; i++) {
            userTypeListObservableArray.push({
              Id: results[i].Id,
              UserType: results[i].UserType
            });
          }
        }
        this.userTypeListSource.next(userTypeListObservableArray);
      }
    );
  }

  // Delete user
  public deleteUser(id: number): void {
    this.httpClient.delete(this.defaultAPIHostURL + "/api/user/delete/" + id, this.options).subscribe(
      response => {
        let responseResults: string[] = ["success", ""];
        this.deleteUserSource.next(responseResults);
      },
      error => {
        let errorResults: string[] = ["failed", error["error"]];
        this.deleteUserSource.next(errorResults);
      }
    )
  }

  // Detail user
  public detailUser(objUpdateUser: UserModel, id: number): void {
    this.httpClient.put(this.defaultAPIHostURL + "/api/Library/User/Update/" + id, JSON.stringify(objUpdateUser), this.options).subscribe(
      response => {
        let responseResults: string[] = ["success", ""];
        this.userDetailSource.next(responseResults);
        console.log(response);
      },
      error => {
        let errorResults: string[] = ["failed", error["error"]];
        this.userDetailSource.next(errorResults);
        console.log(error);
      }
    )
  }

}
