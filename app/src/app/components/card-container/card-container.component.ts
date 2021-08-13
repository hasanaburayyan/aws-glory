import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../models/card";
import {Milestone} from "../models/milestone";

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent implements OnInit {
  @Input() cards!: Card[];
  constructor() {
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


