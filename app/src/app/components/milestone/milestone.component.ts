import { Component, OnInit } from '@angular/core';
import {Milestone} from "../models/milestone";
import {MilestoneService} from "../../services/milestone.service";

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.css']
})
export class MilestoneComponent implements OnInit {
  public cards: Milestone[];
  constructor(milestoneService: MilestoneService) {
    this.cards = milestoneService.getAllMilestones();
  }

  ngOnInit(): void {
  }

}
