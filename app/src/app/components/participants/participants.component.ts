import { Component, OnInit } from '@angular/core';
import {Participant} from "../models/participant";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {
  public participants: Participant[] = [];
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.data.subscribe(res => {
      this.participants = res.participants;
    })
  }
  
  ngOnInit(): void {
  }

}
