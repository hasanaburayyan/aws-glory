import { Injectable } from '@angular/core';
import {Certificate} from "../components/models/certificate";

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor() { }

  getAllCertificates(): Certificate[] {
    return [
      {
        name: "Cloud Practitioner",
        level: "Foundational"
      },
      {
        name: "Developer",
        level: "Associate"
      },
      {
        name: "SysOps Administrator",
        level: "Associate"
      },
      {
        name: "Solutions Architect",
        level: "Associate"
      },
      {
        name: "DevOps Engineer",
        level: "Professional"
      },
      {
        name: "Solutions Architect II",
        level: "Professional"
      },
      {
        name: "Advanced Networking",
        level: "Specialty"
      },
      {
        name: "Database",
        level: "Specialty"
      },
      {
        name: "Security",
        level: "Specialty"
      },
      {
        name: "Data Analytics",
        level: "Specialty"
      },
      {
        name: "Machine Learning",
        level: "Specialty"
      }
    ]
  }
}
