import { Component, OnInit } from '@angular/core';
import {Participant} from "../models/participant";
import {Certificate} from "../models/certificate";
import {CertificateService} from "../../services/certificate.service";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-progress-table',
  templateUrl: './progress-table.component.html',
  styleUrls: ['./progress-table.component.scss']
})
export class ProgressTableComponent implements OnInit {
  certs: Certificate[] = [];
  displayedColumns: string[] = ["Participant"];
  dataSource: Participant[] = [];

  constructor(private activatedRoute: ActivatedRoute, certificateService: CertificateService) {
    this.activatedRoute.data.subscribe(res => {
      this.dataSource = res.participants;
    });
    this.certs = certificateService.getAllCertificates();
    this.certs.forEach(c => {this.displayedColumns.push(c.name)})
  }

  ngOnInit(): void {
  }

  participantHasCertificate(participant: Participant, cert: Certificate): boolean {
    return participant.hasCertificate(cert);
  }

}
