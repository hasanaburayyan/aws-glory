import { Injectable } from '@angular/core';
import {Participant} from "../components/models/participant";

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor() { }

  getAllParticipants(): Participant[] {
    const p1: Participant = new Participant("Hasan", "Abu-Rayyan")
    const p2: Participant = new Participant("Neil", "Farmer")
    const p3: Participant = new Participant("Colin", "Moran")

    p1.addCompletedCertificate({name: "Cloud Practitioner", level: "Foundational"})

    const participants = [
      p1,
      p2,
      p3
    ]

    return participants
  }
}
