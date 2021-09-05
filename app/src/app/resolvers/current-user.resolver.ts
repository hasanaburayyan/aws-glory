import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { environment } from "src/environments/environment";
import { Participant } from "../components/models/participant";
import { CertificateService } from "../services/certificate.service";
import { ParticipantData, ParticipantService } from "../services/participant.service";
export interface SignedInUser {
    email?: string
    firstName?: string
    lastName?: string
    participantData?: Participant
    authenticated: boolean
}

@Injectable({
    providedIn: 'root'
})

export class CurrentUserResolver implements Resolve<SignedInUser> {
    constructor(private participantService: ParticipantService, private certificateService: CertificateService) {

    }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<SignedInUser> {
        let user: SignedInUser = {authenticated: false}
        
        let poolData = {
            UserPoolId: environment.cognitoUserPoolId,
            ClientId: environment.cognitoAppClientId
        };
        let userPool = new CognitoUserPool(poolData);
        let cognitoUser = userPool.getCurrentUser();
        cognitoUser?.getSession((err: any, session: any) => {
            if (err) {
            alert(err.message || JSON.stringify(err));
            }
            let isAuth = session.isValid();
            if (isAuth) {
            cognitoUser?.getUserAttributes((err, userAttributes) => {
                userAttributes?.forEach(attr => {
                let attrName = attr.getName();
                let attrValue = attr.getValue();
                switch (attrName) {
                    case "family_name":
                    user.lastName = attrValue
                    break
                    case "email":
                    user.email = attrValue
                    break
                    case "name":
                    user.firstName = attrValue
                    break
                }
                });
            });
            }
        });

        return this.participantService.makeRequestForParticipants().toPromise().then(data => {
            let participantData = <ParticipantData[]>data;
            participantData.forEach(pd => {
                if (pd.email == user.email) {
                    user.participantData = Participant.fromParticipantData(pd);
                }
            })
            return user
        })
    }
    

}