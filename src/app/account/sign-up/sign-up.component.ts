import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {  } from '@angular/router';

// =================
// Custom Validation
// =================
import { PasswordValidator } from '../custom-validation/custom-validitor';


// ===============
// Account Service
// ===============
import { AccountService } from '../services/account-service.service';

// =====
// Model
// =====
import { User } from '../models/user-model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  title = "register";
  isFieldDisabled = false;

  public registerSubscription: any;

  constructor(
    private fb: FormBuilder, 
    private toastr: ToastrService,
    private route: Router,
    private signupService: AccountService
    ) { }

  public userModel: User = {
    //Id: 0,
    UserName: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    UserTypeId: 0
  };

  registrationForm = this.fb.group({
    UserName: ['', [Validators.required, Validators.minLength(3)]],
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.required, Validators.minLength(6)]],
    ConfirmPassword: [''],
    UserTypeId: [0]
  }, { validator: PasswordValidator });

 

  btnRegisterClick() {
    if (this.registrationForm.value !== null){
      this.signupService.register(this.registrationForm.value);
      this.registerSubscription = this.signupService.registerObservable.subscribe(
        data => {
          if (data[0] == "success") {
            this.toastr.success("Registered successfully","success");
          } else if (data[0] == "failed"){
            this.toastr.error(data[1], "Error");
          }
          if(this.registerSubscription != null) this.registerSubscription.unsubscribe();
        }
      );
    } else {
      this.toastr.error("Please don't leave empty fields.", "Error");
    }
    console.log(this.registrationForm.value);
  }

  ngOnInit() {
    if(this.registerSubscription != null) this.registerSubscription.unsubscribe();
  }
}
