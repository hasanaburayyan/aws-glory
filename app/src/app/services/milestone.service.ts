import { Injectable } from '@angular/core';
import {Milestone} from "../components/models/milestone";

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {

  constructor() { }

  getAllMilestones(): Milestone[] {
    return [
      {
        text: "Officially Certified",
        achievedBy: "AWS Certified Cloud Practitioner",
        isLink: false
      },
      {
        text: "Real Player",
        achievedBy: "AWS Associate Level Certificate",
        isLink: false
      },
      {
        text: "The Associate",
        achievedBy: "3x Associate Level Certificate",
        isLink: false
      },
      {
        text: "Big Boy",
        achievedBy: "AWS Professional Level Certificate",
        isLink: false
      },
      {
        text: "The Man",
        achievedBy: "2x Professional Level Certificate",
        isLink: false
      },
      {
        text: "The SME",
        achievedBy: "1x Specialty Certificate",
        isLink: false
      },
      {
        text: "The Specialist",
        achievedBy: "3x Specialty Certificates",
        isLink: false
      },
      {
        text: "The Myth",
        achievedBy: "5x Specialty Certificates",
        isLink: false
      },
      {
        text: "The Legend",
        achievedBy: "11x AWS Certificates",
        isLink: false
      },
    ]
  }
}
