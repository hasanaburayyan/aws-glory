import {Component, Input, OnInit} from '@angular/core';
import {Participant} from "../models/participant";

@Component({
  selector: 'app-terminal-switch',
  templateUrl: './terminal-switch.component.html',
  styleUrls: ['./terminal-switch.component.css']
})
export class TerminalSwitchComponent implements OnInit {
  @Input() participants!: Participant[];
  public selectedParticipant: Participant|undefined;
  constructor() {
    this.selectedParticipant = undefined;
  }

  ngOnInit(): void {
    console.log("Man")
    console.log(this.participants)
  }

  selectParticipant(participant: Participant) {
    this.selectedParticipant = participant;
  }

  getParticipantData(): string {
    return `
    First Name: ${this.selectedParticipant?.firstName}
    Last Name: ${this.selectedParticipant?.lastName}
    Completed Certificates: ${this.selectedParticipant?.completedCertificates}
    In Progress Certificates: ${this.selectedParticipant?.inProgressCertificates}
    `
  }

  isParticipantSelected(): boolean {
    if (this.selectedParticipant) {
      return true;
    }
    return false
  }
}
