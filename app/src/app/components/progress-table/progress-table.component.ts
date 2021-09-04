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

  constructor(private activatedRoute: ActivatedRoute, private certificateService: CertificateService) {
    this.activatedRoute.data.subscribe(res => {
      let participants = res.participants as Participant[];
      let certificates = res.certificates as Certificate[];
      participants.sort((a: Participant, b: Participant) => {
        if (a.unresolvedCompletedCertificates.length < b.unresolvedCompletedCertificates.length) {
          console.log(`${a.firstName} is less than ${b.firstName}`)
          return -1;
        }
        if (a.unresolvedCompletedCertificates.length > b.unresolvedCompletedCertificates.length) {
          console.log(`${a.firstName} is greater than ${b.firstName}`)
          return 1;
        }
        console.log(`${a.firstName} is equal to ${b.firstName}`)
        return 0;
      })
      this.dataSource = participants.reverse();
      certificates.forEach(cert => {
        this.certs.push(cert);
      });
      this.certs.sort((a: Certificate, b: Certificate) => {
        if (a.order < b.order) {
          return -1;
        }
        if (a.order > b.order) {
          return 1;
        }
        return 0;
      })
      console.log(res)
    });
    this.certs.forEach(c => this.displayedColumns.push(c.certificateName))
  }

  ngOnInit(): void {
  }

  participantHasCertificate(participant: Participant, cert: Certificate): boolean {
    return participant.hasCertificate(cert);
  }

}
