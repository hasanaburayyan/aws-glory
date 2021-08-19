import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of} from "rxjs";
import { Participant } from "../components/models/participant";
import { catchError } from 'rxjs/operators';
import { ParticipantService } from "../services/participant.service";

@Injectable({
    providedIn: 'root'
})
export class ParticipantResolver implements Resolve<Participant[]> {
    constructor(private participantService: ParticipantService) {

    }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        console.log("RESOLVER!!!!")
        return this.participantService.makeRequestForParticipants().pipe(
            catchError(error => {
                return of('No data');
            })
        )
    }

}