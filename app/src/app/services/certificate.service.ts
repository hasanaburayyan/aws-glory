import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Certificate} from "../components/models/certificate";

export interface CertificateData {
  certificateName: string,
  id: string,
  level: string,
  order: number
}

@Injectable({
  providedIn: 'root'
})

export class CertificateService {
  private api: string;

  constructor(private http: HttpClient) {
    this.api = environment.awsGloryRestApi;
  }


  getCertificate(certName: string): Observable<CertificateData> {
    // console.log(`incoming cert to service: ${certName}`);
    return this.http.get<CertificateData>(this.api.concat('dynamodb/certificate'), {
      params: {
        certificateId: certName
      },
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getAllCertificates(): Observable<CertificateData[]> {
    return this.http.get<CertificateData[]>(this.api.concat('dynamodb'),{
      params: {
        tableName: "aws-glory-certificates"
      },
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
