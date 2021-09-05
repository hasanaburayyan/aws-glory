import { Injectable } from '@angular/core';
import {Participant} from "../components/models/participant";
import {CognitoUserPool} from "amazon-cognito-identity-js";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import { CertificateData } from './certificate.service';

export interface ParticipantData {
  lastName: string,
  firstName: string,
  username: string,
  titles: TitleData[],
  id: string,
  inProgressCertificates: CertificateData[],
  completedCertificates: CertificateData[],
  email: string,
}

export interface TitleData {
  name: string
  prerequisite: string[]
  id: string,
  order: number
}

export interface ParticipantUpdate {
  statusCode: number
  headers: {
    "Content-Type": string
    "Access-Control": string
  }
  body: ParticipantData
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

  updateParticipant(participantToUpdate: Participant): Observable<ParticipantUpdate> {
    return this.http.post<ParticipantUpdate>(this.api.concat('dynamodb'), {
      participant: participantToUpdate
    }, {
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
    }).subscribe(async participantData => {
      participants = await Participant.fromListOfParticipantData(participantData)
    });
    
    return participants;
  }
}
