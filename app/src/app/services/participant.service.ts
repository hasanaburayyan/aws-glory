import { Injectable } from '@angular/core';
import {Participant} from "../components/models/participant";
import {CognitoUserPool} from "amazon-cognito-identity-js";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

export interface ParticipantData {
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

  makeRequestForParticipants(): Observable<ParticipantData[]> {
    return this.http.get<ParticipantData[]>(this.api.concat('dynamodb'),{
      params: {
        tableName: "aws-glory-participants"
      },
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getAllParticipants(): Participant[] {
    let participants: Participant[] = [];
    this.http.get<ParticipantData[]>(this.api.concat('dynamodb'),{
      params: {
        tableName: "aws-glory-participants"
      },
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(participantData => {participants = Participant.fromListOfParticipantData(participantData)});
    
    return participants;
  }
}
