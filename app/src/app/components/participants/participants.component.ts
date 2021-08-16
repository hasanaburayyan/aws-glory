import { Component, OnInit } from '@angular/core';
import {Participant} from "../models/participant";
import {ParticipantService} from "../../services/participant.service";

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {
  public participants: Participant[];
  constructor(private participantService: ParticipantService) {
    this.participants = this.participantService.makeRequestForParticipants();
  }

  ngOnInit(): void {
  }

}
function populateParticipants(): Participant[] {
  let participants: Participant[] = [];

  let p1: Participant = new Participant("Hasan", "Abu-Rayyan");
  let p2: Participant = new Participant("Neil", "Farmer");
  let p3: Participant = new Participant("Colin", "Moran");

  participants.push(p1);
  participants.push(p2);
  participants.push(p3)

  return participants;
}
