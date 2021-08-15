import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {emailRegx} from "../../commons/constants";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public email: string;
  public firstName: string;
  public lastName: string;

  public updateForm: FormGroup;
  public editMode: boolean;

  public isParticipant: boolean;


  constructor(private router: Router,private authService: AuthService, private formBuilder: FormBuilder) {
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.editMode = false;
    this.isParticipant = false;

    this.getAttrs();

    this.updateForm = this.formBuilder.group({
        fname: [this.firstName, [Validators.required]],
        lname: [this.lastName, [Validators.required]],
        email: [this.email, [Validators.required, Validators.pattern(emailRegx)]],
      }
    )

    this.updateControls(false, 'fname');
    this.updateControls(false, 'lname');
    this.updateControls(false, 'email');
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(["signin"])
    }
  }

  fieldEnabled(field: string): boolean {
    return this.updateForm.controls[field].enabled;
  }

  anyFieldEditable(): boolean {
    for (let controlKey in this.updateForm.controls) {
      if (this.updateForm.controls[controlKey].enabled) {
        return true;
      }
    }
    return false;
  }

  updateControls(enable: boolean, field: string): void {
    this.editMode = enable;
    for (let controlsKey in this.updateForm.controls) {
      if (controlsKey == field) {
        if (enable) {
          this.updateForm.controls[controlsKey].enable();
        } else {
          this.updateForm.controls[controlsKey].disable();
        }
      }
    }
  }

  updateAllControls(enable: boolean): void {
    this.editMode = enable;
    for (let controlsKey in this.updateForm.controls) {
      if (enable) {
        this.updateForm.controls[controlsKey].enable();
      } else {
        this.updateForm.controls[controlsKey].disable();
      }
    }
  }

  update(): void {
    // TODO: Remove Alert When Editing User Information Is Supported
    alert("Sorry! Editing Profile Data Is Currently Unsupported")
    this.updateAllControls(false)

    console.log("Updating User!!");
    let updatedFname = this.updateForm.value.fname;
    let updatedLname = this.updateForm.value.lname;
    let updatedEmail = this.updateForm.value.email;

    let poolData = {
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId
    };
    let userPool = new CognitoUserPool(poolData);
    let cognitoUser = userPool.getCurrentUser();

    cognitoUser?.getSession((error: any, session: any) => {
      if (error) {
        alert(error)
      }
      if (session.isValid()) {

        let updatedAttributes: CognitoUserAttribute[];
        updatedAttributes = [];
        cognitoUser?.getUserAttributes((err, userAttributes) => {
          userAttributes?.forEach(attr => {
            let attrName = attr.getName();
            switch (attrName) {
              case "family_name":
                attr.setValue(updatedLname)
                break
              case "email":
                attr.setValue(updatedEmail)
                break
              case "name":
                attr.setValue(updatedFname)
                break
            }
            updatedAttributes.push(attr);
          })
        })
        console.log(`ATTEMPTING UPDATE!!!`);
        console.log(updatedAttributes);

        for (let atr in updatedAttributes) {
          console.log(`TRYING TO UPDATE: ${atr}`)
          cognitoUser?.updateAttributes(updatedAttributes, function (err, result) {
            if (err) {
              console.log(err);
            } else {
              console.log(result)
            }
          });
        }


        cognitoUser?.updateAttributes(updatedAttributes, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("SUCCESS?")
          }
        })
      }
      // END OF SESSION SCOPRE
  })
}
  notify(message: string) {
    alert(message)
  }

  getAttrs(): void {

    let poolData = {
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId
    };
    let userPool = new CognitoUserPool(poolData);
    let cognitoUser = userPool.getCurrentUser();

    cognitoUser?.getSession((err: any, session: any) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
      }
      let isAuth = session.isValid();
      if (isAuth) {
        cognitoUser?.getUserAttributes((err, userAttributes) => {
          userAttributes?.forEach(attr => {
            let attrName = attr.getName();
            let attrValue = attr.getValue();
            switch (attrName) {
              case "family_name":
                this.lastName = attrValue
                break
              case "email":
                this.email = attrValue
                break
              case "name":
                this.firstName = attrValue
                break
            }
          })
        })
      }
    })
  }

  onLogout(): void {
    let poolData = {
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId
    };
    let userPool = new CognitoUserPool(poolData);
    let cognitoUser = userPool.getCurrentUser();
    cognitoUser?.signOut();
    this.router.navigate(["signin"])
  }
}
