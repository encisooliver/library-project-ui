import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppSetting } from '../../app-setting';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ObservableArray } from 'wijmo/wijmo';
import { BookModel } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private appSettings: AppSetting,
    private httpClient: HttpClient
  ) { }

  private defaultAPIHostURL: string = this.appSettings.defaultAPIHostURL;

  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorizaiton': 'Bearer' + localStorage.getItem('acces_token')
    })
  };

  public bookAddSource = new Subject<string[]>();
  public bookAddObservable = this.bookAddSource.asObservable();

  public bookListSource = new Subject<ObservableArray>();
  public bookListObservable = this.bookListSource.asObservable();

  public bookDetailSource = new Subject<string[]>();
  public bookDetailObservable = this.bookDetailSource.asObservable();

  public bookDeleteSource = new Subject<string[]>();
  public bookDeleteObservable = this.bookDeleteSource.asObservable();

  // Book - Add
  public addBook(objNewBook: BookModel): void {
    this.httpClient.post(this.defaultAPIHostURL + "/api/library/book/add", JSON.stringify(objNewBook), this.options).subscribe(
      response => {
        let responseResults: string[] = ["success", "Add succeccful"];
        this.bookAddSource.next(responseResults);
        console.log(response);
      },
      error => {
        let errorResults: string[] = ["failed", error["error"]];
        this.bookAddSource.next(errorResults);
        console.log(error);
      }
    );
  }

  // Book - List
  public listBookService(): void {
    let listBookObservableArray = new ObservableArray();
    this.bookListSource.next(listBookObservableArray);

    this.httpClient.get(this.defaultAPIHostURL + "/api/library/book/list", this.options).subscribe(
      response => {
        var results = response;
        if(results["length"] > 0){
          for(var i = 0; i <= results["length"] - 1; i++){
            listBookObservableArray.push({
              Id: results[i].Id,
              BookNumber: results[i].BookNumber,
              Title: results[i].Title,
              Author: results[i].Author,
              EditionNumber: results[i].EditionNumber,
              PlaceOfPublication: results[i].PlaceOfPublication,
              CopyRightDate: results[i].CopyRightDate,
              ISBN: results[i].ISBN,
              UserId: results[i].UserId
            });
          }
          this.bookListSource.next(listBookObservableArray);
        }
      }
    );
  }
// Update Book
  public detailBook(objUpdateBook: BookModel, id: number): void {
    this.httpClient.put(this.defaultAPIHostURL + "/api/library/book/update/" + id, JSON.stringify(objUpdateBook), this.options).subscribe(
      response => {
        let responseResults: string[] = ["success", ""];
        this.bookDetailSource.next(responseResults);
        console.log(response);
      },
      error => {
        let errorResults: string[] = ["failed", error["error"]];
        this.bookDetailSource.next(errorResults);
        console.log(error);
      }
    )
  }

  // Delete Book
  public deleteBook(id: number): void {
    this.httpClient.delete(this.defaultAPIHostURL + "/api/library/book/delete/" + id, this.options).subscribe(
      response => {
        let responseResults: string[] = ["success", ""];
        this.bookDeleteSource.next(responseResults);
      },
      error => {
        let errorResults: string[] = ["failed", error["error"]];
        this.bookDeleteSource.next(errorResults);
      }
    )
  }

  
}
