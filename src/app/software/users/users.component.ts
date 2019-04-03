import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

import { ObservableArray, CollectionView } from 'wijmo/wijmo';
import { WjFlexGrid } from 'wijmo/wijmo.angular2.grid';
import { WjComboBox } from 'wijmo/wijmo.angular2.input';

import { UserService } from './users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { UserModel } from './user.model';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    protected userService: UserService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService,

  ) { }

  public addUserModalRef: BsModalRef;
  public detailUserModalRef: BsModalRef;
  public deleteUserModalRef: BsModalRef;

  public addUserSubscription: any;
  public deleteUserSubscription: any;
  public detailUserSubscrition: any;
  public listUserSubscription: any;

  public cboUserTypeListSubscription: any;
  public cboUserTypeListObservableArray: ObservableArray = new ObservableArray();
  @ViewChild('cboUserTypeList') cboUserTypeList: WjComboBox;

  public listUserObservableArray: ObservableArray = new ObservableArray();
  public listUserCollectionView: CollectionView = new CollectionView(this.listUserObservableArray);
  public listUserPageIndex: number = 15;
  @ViewChild('listUserFlexGrid') listUserFlexGrid: WjFlexGrid;

  // Master Noad Added
  public isEditClicked = false;
  public isDataLoaded: boolean = false;

  public userModel: UserModel = {
    // Id: 0,
    UserName: "",
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    UserTypeId: 0
  }

  public btnAddUserModalClick(addUserModalTemplate: TemplateRef<any>, isNew: Boolean): void {
    this.addUserModalRef = this.modalService.show(addUserModalTemplate, { class: "modal-ms" });

    // let btnCloseAddUserModal: Element = document.getElementById("btnCloseAddUserModal");
    // (<HTMLButtonElement>btnCloseAddUserModal).disabled = false;
    this.listUserType();
    this.resetForm();
  }

  // Add User
  public btnSaveUserOnClick(): void {
    if (this.userModel.UserName !== "") {
      this.userModel.ConfirmPassword = this.userModel.Password;
      this.userService.addUser(this.userModel);
      console.log(this.userModel);
      let btnAddUser: Element = document.getElementById("btnAddUser");
      (<HTMLButtonElement>btnAddUser).disabled = true;

      this.addUserSubscription = this.userService.addUserObservable.subscribe(
        data => {
          if (data[0] == "success") {
            
            this.toastr.success("User is successfully added.", "Success");
            setTimeout(()=>{
              this.isDataLoaded = false;

              this.addUserModalRef.hide();
              this.listUser();
              this.resetForm();
            }, 100);

          } else if (data[0] == "failed") {
            this.toastr.error(data[1], "Error");
          }
          if (this.addUserSubscription != null) this.addUserSubscription.unsubscribe();
        }
      );
    }
    else {
      this.toastr.error("Please don't leave empty fields.", "Error");
    }
  }
  resetForm() {
    this.userModel.UserName = "";
    this.userModel.FirstName = "";
    this.userModel.LastName = "";
    this.userModel.Email = "";
    this.userModel.Password = "";
  }
  // List of User Type
  public listUserType(): void {
    this.userService.listUserType();

    this.cboUserTypeListSubscription = this.userService.userTypeObservable.subscribe(
      data => {
        let userTypeObservableArray = new ObservableArray();
        if (data != null) {
          for (var i = 0; i <= data.length - 1; i++) {
            userTypeObservableArray.push({
              Id: data[i].Id,
              UserType: data[i].UserType
            });
          }
        }

        this.cboUserTypeListObservableArray = userTypeObservableArray;

        // Master Noah added
        if (this.isEditClicked) {
          setTimeout(() => {
            this.currentuser(this.isEditClicked);
          }, 100);
        }

        if (this.cboUserTypeListSubscription != null) this.cboUserTypeListSubscription.unsubscribe();
      }
    );
  }

  // List of User
  public listUser(): void {
    if(!this.isDataLoaded) {
      setTimeout(() => {
        this.listUserObservableArray = new ObservableArray();
        this.listUserCollectionView = new CollectionView(this.listUserObservableArray);
        this.listUserCollectionView.pageSize = 15;
        this.listUserCollectionView.trackChanges = true;
        this.listUserCollectionView.refresh();
        this.listUserFlexGrid.refresh();
    
        this.userService.listUserService();
        this.listUserSubscription = this.userService.userListSourceObservable.subscribe(
          data => {
            if (data.length > 0) {
              this.listUserObservableArray = data;
              this.listUserCollectionView = new CollectionView(this.listUserObservableArray);
              this.listUserCollectionView.pageSize = this.listUserPageIndex;
              this.listUserCollectionView.trackChanges = true;
              this.listUserCollectionView.refresh();
              this.listUserFlexGrid.refresh();
            }
            this.isDataLoaded = true;
            if (this.listUserSubscription != null) this.listUserSubscription.unsubscribe();
          }
        );
      }, 100);
    }
    
  }

  


  
  // Delete - User
  public btnDeleteUserModalClick(deleteUserModalTemplate: TemplateRef<any>, isNew: Boolean): void {
    this.deleteUserModalRef = this.modalService.show(deleteUserModalTemplate, { class: "modal-ms" });

    // let btnCloseDeleteUserModal: Element = document.getElementById("btnCloseDeleteUserModal");
    // (<HTMLButtonElement>btnCloseDeleteUserModal).disabled = false;
  }

  btnDeleteUserClick(): void {
    let currentUser = this.listUserCollectionView.currentItem;
    this.userService.deleteUser(currentUser.Id);

    this.deleteUserSubscription = this.userService.deleteUserObservable.subscribe(
      data => {
        if (data[0] == "success") {
          this.toastr.success("User is successfully deleted", "Success");
          setTimeout(()=>{
            this.isDataLoaded = false;

            this.deleteUserModalRef.hide();
            this.listUser();
          }, 100);
         
        }
        else if (data[0] == "failed") {
          this.toastr.error(data[1], "Error");
        }

        if (this.deleteUserSubscription != null) this.deleteUserSubscription.unsubscribe();
      }
    );
  }

  public btnDetailUserModalClick(detailUserModalTemplate: TemplateRef<any>, isNew: Boolean): void {
    this.detailUserModalRef = this.modalService.show(detailUserModalTemplate, { class: "modal-ms" });

    // Master Noah added
    this.isEditClicked = true;
    this.listUserType();
    // let btnCloseDetailUserModal: Element = document.getElementById("btnCloseDetailUserModal");
    // (<HTMLButtonElement>btnCloseDetailUserModal).disabled = false;
  }

  // Master Noah added
  public currentuser(isEditClicked: boolean): void {
    if (isEditClicked) {
      let currentUser = this.listUserCollectionView.currentItem;

      this.userModel.UserName = currentUser.UserName;
      this.userModel.FirstName = currentUser.FirstName;
      this.userModel.LastName = currentUser.LastName;
      this.userModel.Email = currentUser.Email;
      this.userModel.Password = currentUser.Password;
      this.userModel.UserTypeId = currentUser.UserTypeId;

      console.log(currentUser.Id)
      // Master Noah added
      this.isEditClicked = false;
    }
  }

  public btnUpdateUserClick(): void {
    let currentUser = this.listUserCollectionView.currentItem;
    this.userService.detailUser(this.userModel, currentUser.Id);
    console.log(currentUser.Id)
    this.detailUserSubscrition = this.userService.userDetailSourceObservable.subscribe(
      data => {
        if (data[0] == "success") {
          this.toastr.success("User is successfully updated", "Success");
          
          setTimeout(()=>{
            this.isDataLoaded = false;

            this.detailUserModalRef.hide();
            this.listUser();
          }, 100);
        }
        else if (data[0] == "failed") {
          this.toastr.error(data[1], "Error");
        }
        if (this.detailUserSubscrition != null) this.detailUserSubscrition.unsubscribe();
      }
    );
  }

  ngOnInit() {
    setTimeout(()=>{
      this.listUser();
    }, 100);
  }

  ngOnDestroy() {
    if (this.listUserSubscription != null) this.listUserSubscription.unsubscribe();
    if (this.addUserSubscription != null) this.addUserSubscription.unsubscribe();
    if (this.detailUserSubscrition != null) this.detailUserSubscrition.unsubscribe();
    if (this.deleteUserSubscription != null) this.deleteUserSubscription.unsubscribe();
  }

}
