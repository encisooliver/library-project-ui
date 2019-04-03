import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account-service.service';
import { LoginModel } from '../models/login-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public loginSubscription: any;

  public loginModel: LoginModel = {
    UserName: "",
    Password: ""
  };

  constructor(
   private fb: FormBuilder,
    private loginService: AccountService,
    private toastr: ToastrService,
    private router: Router,
    ) { }

  loginForm = this.fb.group({
    userName:['', Validators.required],
    password:['', Validators.required]
  });

  ngOnInit() {
  }

  public login(): void {
    console.log(this.loginModel);
    let btnLogin: Element = document.getElementById("btnLogin");
    btnLogin.setAttribute("disabled", "disabled");
    btnLogin.setAttribute("value", "Signing in...");

    let inpUsername: Element = document.getElementById("inpUsername");
    inpUsername.setAttribute("disabled", "disabled");

    let inpPassword: Element = document.getElementById("inpPassword");
    inpPassword.setAttribute("disabled", "disabled");

    if ((<HTMLInputElement>inpUsername).value === "" || (<HTMLInputElement>inpPassword).value === "") {
      this.toastr.error('Username or Password is empty. Please do not leave blanks.', 'Error');
      console.log(this.loginModel);
      btnLogin.removeAttribute("disabled");
      btnLogin.setAttribute("value", "Sign in");
      inpUsername.removeAttribute("disabled");
      inpPassword.removeAttribute("disabled");
    } else {
      this.loginService.login(this.loginModel.UserName, this.loginModel.Password);
      this.loginSubscription = this.loginService.loginObservable.subscribe(
        data => {
          if (data[0]) {
            this.toastr.success(data[1].toString(), 'Success');
            console.log(data);

            setTimeout(() => {
              this.router.navigate(['/software']);
            }, 500);
          } else {
            this.toastr.error(data[1].toString(), 'Error');

            console.log(data);
            btnLogin.removeAttribute("disabled");
            btnLogin.setAttribute("value", "Sign in");
            inpUsername.removeAttribute("disabled");
            inpPassword.removeAttribute("disabled");

            if (this.loginSubscription != null) this.loginSubscription.unsubscribe();
          }
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.loginSubscription != null) this.loginSubscription.unsubscribe();
  }
}
