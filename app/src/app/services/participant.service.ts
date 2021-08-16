import { Injectable } from '@angular/core';
import {Participant} from "../components/models/participant";
import {CognitoUserPool} from "amazon-cognito-identity-js";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

interface ParticpantData {
  lastName: string,
  firstName: string,
  titles: string[],
  id: string,
  inProgressCertificates: string[],
  completedCertificates: string[],
  email?: string,
}

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  private api: string;
  constructor(private http: HttpClient) {
    this.api = environment.awsGloryRestApi;
  }

  makeRequestForParticipants(): Participant[] {
    let participants: Participant[] = [];
    this.http.get<ParticpantData[]>(this.api.concat('dynamodb'),{
      params: {
        tableName: "aws-glory-participants"
      },
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(parts => {
      parts.forEach(p => {
        let participantToAdd = new Participant(p.firstName, p.lastName);
        participants.push(participantToAdd)
      })
    });
    return participants;
  }

  getAllParticipants(): Participant[] {

    let poolData = {
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId
    };

    const p1: Participant = new Participant("Hasan", "Abu-Rayyan")
    const p2: Participant = new Participant("Neil", "Farmer")
    const p3: Participant = new Participant("Colin", "Moran")

    p1.addCompletedCertificate({name: "Cloud Practitioner", level: "Foundational"})

    const participants = [
      p1,
      p2,
      p3
    ]

    return participants
  }
}
