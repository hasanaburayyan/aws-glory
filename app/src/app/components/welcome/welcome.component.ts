import { Component, OnInit } from '@angular/core';
import {Card} from "../models/card";
import {Milestone} from "../models/milestone";
import {MilestoneService} from "../../services/milestone.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  public welcomeTitle: string;
  public welcomeMessage: string;
  constructor() {
    this.welcomeTitle = "Road To AWS Glory!"
    this.welcomeMessage = populateWelcomeMessage();
  }

  ngOnInit(): void {
  }

}

function populateWelcomeMessage(): string {
  return `
To Become AWS Legends!
`
}
