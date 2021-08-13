import { Component, OnInit } from '@angular/core';
import {Participant} from "../models/participant";
import {Certificate} from "../models/certificate";
import {ParticipantService} from "../../services/participant.service";
import {CertificateService} from "../../services/certificate.service";


@Component({
  selector: 'app-progress-table',
  templateUrl: './progress-table.component.html',
  styleUrls: ['./progress-table.component.css']
})
export class ProgressTableComponent implements OnInit {
  certs: Certificate[] = [];
  displayedColumns: string[] = ["Participant"];
  dataSource: Participant[] = [];

  constructor(participantService: ParticipantService, certificateService: CertificateService) {
    this.certs = certificateService.getAllCertificates();

    this.dataSource = participantService.getAllParticipants();
    this.certs.forEach(c => {this.displayedColumns.push(c.name)})
  }

  ngOnInit(): void {
  }

  participantHasCertificate(participant: Participant, cert: Certificate): boolean {
    return participant.hasCertificate(cert);
  }

}
