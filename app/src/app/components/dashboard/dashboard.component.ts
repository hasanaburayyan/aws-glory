import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {emailRegx} from "../../commons/constants";
import { Participant } from '../models/participant';
import { SignedInUser } from 'src/app/resolvers/current-user.resolver';
import { Card } from '../models/card';
import { CertificateData } from 'src/app/services/certificate.service';
import { fromCertificateData } from '../models/certificate';
import { ParticipantService } from 'src/app/services/participant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public email: string;
  public firstName: string;
  public lastName: string;

  public updateForm: FormGroup;
  public editMode: boolean;

  public participantInfo?: Participant;
  public participantList?: Participant[];
  public isParticipant: boolean = false;
  public displayTable: boolean = false;
  public addNewCert: boolean = false;
  public certCards: Card[];
  public titleCards: Card[];
  public addCertCards: Card[];


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private participantService: ParticipantService, private authService: AuthService, private formBuilder: FormBuilder) {
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.editMode = false;
    this.certCards = [];
    this.titleCards = [];
    this.addCertCards = [];
    this.activatedRoute.data.subscribe(data => {
      let user = data.currentUser as SignedInUser;
      let certs = data.certificates as CertificateData[];
      this.firstName = user.firstName!
      this.lastName = user.lastName!
      this.email = user.email!
      console.log(`USER DATA: ${user.participantData}`)
      this.participantInfo = user.participantData
      if (user.participantData) {
        this.participantList = [user.participantData];
        this.isParticipant = true;
      }
      certs.forEach(c => {this.addCertCards.push(
        {
          text: c.certificateName,
          isLink: false,
          certificate: fromCertificateData(c),
          runFunction: function () {
            console.log(`Trying to add ${c.certificateName} to participant: ${user.participantData!.firstName}`);
            user.participantData!.addCompletedCertificate(c);
            return true;
          }
        }
      )})
      this.participantService.updateParticipant(this.participantInfo!).subscribe(x => {
        console.log(JSON.stringify(x));
      });
    })
    
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

  toggleTable(): void {
    this.certCards = [];
    this.titleCards = [];
    this.participantService.updateParticipant(this.participantInfo!).subscribe(x => {
      console.log(JSON.stringify(x));
    });
    
    this.participantInfo?.completedCertificates.forEach(cert => {
      this.certCards.push(
        {
          text: cert.certificateName,
          isLink: false,
          image: cert.id
        }
      )
    })
    this.participantInfo?.titles.forEach(title => {
      this.titleCards.push(
        {
          text: title.name,
          isLink: false,
          image: 'crown'
        }
      )
    })
    this.displayTable = !this.displayTable
    this.addNewCert = false;
    console.log(this.participantList)
  }

  async getParticipantsToList(): Promise<Participant[]> {
    this.activatedRoute.data.subscribe(data => {
      let user = data as SignedInUser;
      this.participantInfo = user.participantData
      if (user.participantData) {
        return [user.participantData]
      }
      let emptyList: Participant[] = []
      return emptyList;
    });
    return new Promise(x => {
      return null;
    });
  }

  addCertMenu() {
    let missingCertsCards: Card[] = [];
    this.addCertCards.forEach(addC => {
      if (!this.participantInfo?.hasCertificate(addC.certificate!)) {
        missingCertsCards.push(addC);
      }
    });
    this.displayTable = false;
    this.addNewCert = true;
    this.addCertCards = missingCertsCards;
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
