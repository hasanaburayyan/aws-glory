import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { CertificateData, CertificateService } from "../services/certificate.service";
import { Certificate, fromCertificateData } from "../components/models/certificate";

@Injectable({
    providedIn: 'root'
})
export class CertificateResolver implements Resolve<Certificate[]| void> {
    constructor(private certificateService: CertificateService) {

    }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Certificate[] | void> {
        return this.certificateService.getAllCertificates().toPromise().then(data => {
            let certs: Certificate[] = [];
            let certificateData = <CertificateData[]>data;

            certificateData.forEach(cd => {
                certs.push(fromCertificateData(cd));
            });

            return certs;
        })
    }

}