import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignedInUser } from 'src/app/resolvers/current-user.resolver';
import { Certificate } from '../models/certificate';
import { Participant } from '../models/participant';

@Component({
  selector: 'app-achievements-table',
  templateUrl: './achievements-table.component.html',
  styleUrls: ['./achievements-table.component.scss']
})
export class AchievementsTableComponent implements OnInit {
  displayedColumns: string[] = ["Participant"]
  dataSource!: Participant[];
  certs: Certificate[] = [];

  constructor(private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.data.subscribe(res => {
      let user = res.currentUser as SignedInUser;
      let certificates = res.certificates as Certificate[];
      certificates.forEach(cert => {
        this.certs.push(cert);
      });
      this.dataSource = [user.participantData!];
    });
    this.certs.forEach(c => this.displayedColumns.push(c.certificateName));
  }

  participantHasCertificate(participant: Participant, cert: Certificate): boolean {
    return participant.hasCertificate(cert);
  }

  ngOnInit(): void {
  }

}
