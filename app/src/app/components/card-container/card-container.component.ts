import {Component, Input, OnInit} from '@angular/core';
import { ParticipantService } from 'src/app/services/participant.service';
import {Card} from "../models/card";
import {Milestone} from "../models/milestone";
import { Participant } from '../models/participant';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent implements OnInit {
  @Input() cards!: Card[];
  constructor(private participantService: ParticipantService) {
  }

  ngOnInit(): void {
  }

  isMilestone(card: Card): boolean {
    return 'achievedBy' in card;
  }

  getMilestoneAchievement(card: Card): string {
    const milestone = card as Milestone
    return milestone.achievedBy;
  }
}


