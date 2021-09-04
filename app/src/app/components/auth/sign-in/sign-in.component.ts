import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';
import {emailRegx} from "../../../commons/constants";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  isLoading: boolean = false;
  email_address: string = "";
  password: string = "";

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(emailRegx)]],
      password: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.setLoginForm()
  }

  setLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(emailRegx)]],
      password: [null, Validators.required]
    });
  }

  submit() {
    if (!this.loginForm.valid) {
      alert("Login Failed!")
      return;
    }
    this.authenticate();
  }

  authenticate(): boolean{
    if (this.loginForm.valid) {
      this.isLoading = true;
      let authenticationDetails = new AuthenticationDetails({
        Username: this.loginForm.value.email,
        Password: this.loginForm.value.password,
      });
      let poolData = {
        UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
        ClientId: environment.cognitoAppClientId // Your client id here
      };

      let userPool = new CognitoUserPool(poolData);
      let userData = { Username: this.loginForm.value.email, Pool: userPool };
      var cognitoUser = new CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          this.router.navigate(["dashboard"])
        },
        onFailure: (err) => {
          alert(err.message || JSON.stringify(err));
          this.isLoading = false;
          return false
        },
      });
    }
    return false;
  }
}
