import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Participant } from "../components/models/participant";
import { ParticipantData, ParticipantService } from "../services/participant.service";
import { CertificateService } from "../services/certificate.service";

@Injectable({
    providedIn: 'root'
})
export class ParticipantResolver implements Resolve<Participant[]| void> {
    constructor(private participantService: ParticipantService, private certificateService: CertificateService) {

    }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Participant[] | void> {
        return this.participantService.makeRequestForParticipants().toPromise().then(d => {
            let participants: Participant[] = [];
            let participantData = <ParticipantData[]>d;
            participantData.forEach(pd => {
                let participant = Participant.fromParticipantData(pd);
                console.log(`NEW Participant Data: ${JSON.stringify(participant.titles)}`)
                participants.push(participant);

            })
            return participants;
        });
    }

}