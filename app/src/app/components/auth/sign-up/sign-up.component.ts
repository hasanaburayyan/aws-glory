import { Component, OnInit } from '@angular/core';
import { CognitoUserPool,CognitoUserAttribute } from 'amazon-cognito-identity-js';
import {NgForm, FormsModule, FormGroup, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {emailRegx} from "../../../commons/constants";

interface formDataInterface {
  "name": string;
  "family_name": string;
  "email": string;
  [key: string]: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  isLoading:boolean = false;
  fname:string = '';
  lname:string = '';
  email:string = '';
  password:string = '';

  loginForm: FormGroup

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
    ) {
    this.loginForm = this.formBuilder.group({
      fname: [null, [Validators.required]],
      lname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(emailRegx)]],
      password: [null, [Validators.required]]

    })
  }

  ngOnInit(): void {}

  submit() {
    if (!this.loginForm.valid) {
      alert("Signup Failed!")
      return;
    }
    this.fname = this.loginForm.value.fname;
    this.lname = this.loginForm.value.lname;
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;
    this.Signup()
  }

  Signup(){
    if (this.loginForm.valid) {
      this.isLoading = true;
      var poolData = {
        UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
        ClientId: environment.cognitoAppClientId // Your client id here
      };
      var userPool = new CognitoUserPool(poolData);
      var attributeList = [];
      let formData:formDataInterface = {
        "name": this.fname,
        "family_name": this.lname,
        "email": this.email,
      }


      attributeList.push(new CognitoUserAttribute({Name: 'name', Value: this.fname}));
      attributeList.push(new CognitoUserAttribute({Name: 'family_name', Value: this.lname}));
      attributeList.push(new CognitoUserAttribute({Name: 'email', Value: this.email}));


      userPool.signUp(this.email, this.password, attributeList, [], (
        err,
        result
      ) => {
        this.isLoading = false;
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        this.router.navigate(['/signin']);
      });
    }
  }
}
