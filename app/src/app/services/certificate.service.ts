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

  // getAllCertificates(): Certificate[] {
  //   return [
  //     {
  //       certificateName: "Cloud Practitioner",
  //       id: "cloud-practitioner",
  //       level: "Foundational"
  //     },
  //     {
  //       certificateName: "Developer",
  //       id: "developer",
  //       level: "Associate"
  //     },
  //     {
  //       certificateName: "SysOps Administrator",
  //       id: "cloud-practitioner",
  //       level: "Associate"
  //     },
  //     {
  //       certificateName: "Solutions Architect",
  //       id: "cloud-practitioner",
  //       level: "Associate"
  //     },
  //     {
  //       certificateName: "DevOps Engineer",
  //       id: "cloud-practitioner",
  //       level: "Professional"
  //     },
  //     {
  //       certificateName: "Solutions Architect II",
  //       id: "cloud-practitioner",
  //       level: "Professional"
  //     },
  //     {
  //       certificateName: "Advanced Networking",
  //       id: "cloud-practitioner",
  //       level: "Specialty"
  //     },
  //     {
  //       certificateName: "Database",
  //       id: "cloud-practitioner",
  //       level: "Specialty"
  //     },
  //     {
  //       certificateName: "Security",
  //       id: "cloud-practitioner",
  //       level: "Specialty"
  //     },
  //     {
  //       certificateName: "Data Analytics",
  //       id: "cloud-practitioner",
  //       level: "Specialty"
  //     },
  //     {
  //       certificateName: "Machine Learning",
  //       id: "cloud-practitioner",
  //       level: "Specialty"
  //     }
  //   ]
  // }
}
