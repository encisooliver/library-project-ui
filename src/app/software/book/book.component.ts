import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

import { ObservableArray, CollectionView } from 'wijmo/wijmo';
import { WjFlexGrid } from 'wijmo/wijmo.angular2.grid';
import { WjComboBox } from 'wijmo/wijmo.angular2.input';


import { ToastrService } from 'ngx-toastr';
import { BookService } from './book.service';
import { Router } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { BookModel } from './book.model';






@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  constructor(
    private modalService: BsModalService,
    private toastr: ToastrService,
    private bookService: BookService
  ) { }
  
  public addBookModalRef: BsModalRef;
  public deleteBookModalRef: BsModalRef;
  public detailBookModalRef: BsModalRef;

  public addBookSubscription: any;
  public bookListSubsciption: any;
  public bookDetailSubsciption: any;
  public deleteBookSubscription: any;

  public listBookObservableArray: ObservableArray = new ObservableArray();
  public listBookCollectionView: CollectionView = new CollectionView(this.listBookObservableArray);
  public bookListIndex: number = 15;
  @ViewChild('bookListFlexGrid') bookListFlexGrid: WjFlexGrid;

  public isDataLoaded: boolean = false;
  public isEditClicked: boolean = false;

  public bookModel: BookModel = {
    Id: 0,
    BookNumber: 0,
    Title: "",
    Author: "",
    EditionNumber: "",
    PlaceOfPublication: "",
    CopyRightDate: new Date(),
    ISBN: "",
    CreatedByUserId: 0,
    CreatedBy: "",
    CreatedDate: new Date(),
    UpdatedByUserId: 0,
    UpdatedBy: "",
    UpdatedDate: new Date(),
  }

  

  public btnAddBookModalClick(addBookModalTemplate: TemplateRef<any>, isNew: Boolean): void {
    this.addBookModalRef = this.modalService.show(addBookModalTemplate, { class: "modal-lg" });
    // let btnCloseAddBookModal: Element = document.getElementById("btnCloseAddBookModal");
    // (<HTMLButtonElement>btnCloseAddBookModal).disabled = false;
    this.resetform();
  }

  public btnSaveBookOnClick(): void {
    if(this.bookModel.BookNumber !== 0 && this.bookModel.Author !== "" && this.bookModel.Title !== ""
      || this.bookModel.EditionNumber !== "" && this.bookModel.CopyRightDate !== null && this.bookModel.PlaceOfPublication !== "") {
      this.bookService.addBook(this.bookModel);

      console.log(this.bookModel);

      this.addBookSubscription = this.bookService.bookAddObservable.subscribe(
        data => {
          if(data[0] == "success"){
            this.toastr.success("User is successfully added.", "Success");
            setTimeout(() => {
              this.isDataLoaded = false;
              this.addBookModalRef.hide();
              
              this.listBook();
              this.resetform();
            }, 100)
          } else if(data[0] == "failed") {
            this.toastr.error(data[1], "Error");
          }
          if(this.addBookSubscription == null) this.addBookSubscription.unsubscribe();
        }
      );
    } else {
      this.toastr.error("Please don't leave empty fields.", "Error");
    }
  }

  resetform(){
    this.bookModel.BookNumber = 0;
    this.bookModel.Author = "";
    this.bookModel.Title = "";
    this.bookModel.EditionNumber = "";
    this.bookModel.CopyRightDate = new Date();
    this.bookModel.PlaceOfPublication = "";
    this.bookModel.ISBN = "";
  }

  public listBook(): void {
    if(!this.isDataLoaded){
      setTimeout(() => {
        this.listBookObservableArray = new ObservableArray;
        this.listBookCollectionView = new CollectionView(this.listBookObservableArray);
        this.listBookCollectionView.pageSize = this.bookListIndex;
        this.listBookCollectionView.trackChanges = true;
        this.listBookCollectionView.refresh();
        this.bookListFlexGrid.refresh();
      
        this.bookService.listBookService();
          this.bookListSubsciption = this.bookService.bookListObservable.subscribe(
            data => {
              if(data.length > 0){
                this.listBookObservableArray = data;
                this.listBookCollectionView = new CollectionView(this.listBookObservableArray);
                this.listBookCollectionView.pageSize = this.bookListIndex;
                this.listBookCollectionView.trackChanges = true;
                this.listBookCollectionView.refresh();
                this.bookListFlexGrid.refresh();

              }
              this.isDataLoaded = true;
              if(this.bookListSubsciption != null) this.bookListSubsciption.unsubscribe();
            }
        ); 
        
      }, 100)
    }
       
  }

  

  // Detail - Book
  public btnDetailBookModalClick(detailBookModalTemplate: TemplateRef<any>): void {
    this.detailBookModalRef = this.modalService.show(detailBookModalTemplate, { class: "modal-lg"});
    this.isEditClicked = true;

    setTimeout(()=>{
      this.currentBook(this.isEditClicked);
      this.listBook();
    },100);

    
  }

  public currentBook(isEditClicked: boolean): void{
    if(isEditClicked){
      let currentBook = this.listBookCollectionView.currentItem;
      
      this.bookModel.BookNumber = currentBook.BookNumber;
      this.bookModel.Author = currentBook.Author;
      this.bookModel.Title = currentBook.Title;
      this.bookModel.EditionNumber = currentBook.EditionNumber;
      this.bookModel.CopyRightDate = currentBook.CopyRightDate;
      this.bookModel.PlaceOfPublication = currentBook.PlaceOfPublication;
      this.bookModel.ISBN = currentBook.ISBN;
      
      
      this.isEditClicked = false;
    }
  }

  public btnUpdateBookClick(): void {
    let currentBook = this.listBookCollectionView.currentItem;
    this.bookService.detailBook(this.bookModel, currentBook.Id);
    this.bookDetailSubsciption = this.bookService.bookDetailObservable.subscribe(
      data => {
        if (data[0] == "success") {
          this.toastr.success("User is successfully updated", "Success");

          setTimeout(() => {
            this.isDataLoaded = false;

            this.detailBookModalRef.hide();
            this.listBook();
          }, 100);
        }
        else if (data[0] == "failed") {
          this.toastr.error(data[1], "Error");
        }

        if (this.bookDetailSubsciption != null) this.bookDetailSubsciption.unsubscribe();
      }
    );
  }

   // Delete - Book
  public btnDeleteBookModalClick(deleteBookModalTemplate: TemplateRef<any>, isNew: Boolean): void {
    this.deleteBookModalRef = this.modalService.show(deleteBookModalTemplate, { class: "modal-ms" });

    let btnCloseDeleteUserModal: Element = document.getElementById("btnCloseDeleteUserModal");
    (<HTMLButtonElement>btnCloseDeleteUserModal).disabled = false;
  }

  btnDeleteBookClick(): void {
    let currentBook = this.listBookCollectionView.currentItem;
    this.bookService.deleteBook(currentBook.Id);

    this.deleteBookSubscription = this.bookService.bookDeleteObservable.subscribe(
      data => {
        if (data[0] == "success") {
          this.toastr.success("Book is successfully deleted", "Success");

          setTimeout(() => {
            this.isDataLoaded = false;

            this.deleteBookModalRef.hide();
            this.listBook();
          }, 100);
          
        }
        else if (data[0] == "failed") {
          this.toastr.error(data[1], "Error");
        }

        if (this.deleteBookSubscription != null) this.deleteBookSubscription.unsubscribe();
      }
    );
  }

  ngOnInit() {
    setTimeout(()=>{
      this.listBook();
    }, 100);
  }

  ngOnDestroy() {
    if(this.bookListSubsciption != null) this.bookListSubsciption.unsubscribe();
    if(this.addBookSubscription != null) this.addBookSubscription.unsubscribe();
    if (this.deleteBookSubscription != null) this.deleteBookSubscription.unsubscribe();
    if (this.bookDetailSubsciption != null) this.bookDetailSubsciption.unsubscribe();
  }

}
