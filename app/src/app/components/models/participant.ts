import { CertificateService } from "src/app/services/certificate.service";
import { ParticipantData } from "src/app/services/participant.service";
import {Certificate, fromListOfCertificateData} from "./certificate";

export class Participant {
  private _firstName: string;
  private _lastName: string;
  private _unresolvedCompletedCertificates: string[];
  private _unresolvedInProgressCertificates: string[];
  
  private _completedCertificates: Certificate[];
  private _inProgressCertificates: Certificate[];

  constructor(firstName: string, lastName: string, completedCerts: string[], inProgressCerts: string[]) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._completedCertificates = [];
    this._inProgressCertificates = [];
    this._unresolvedCompletedCertificates = completedCerts;
    this._unresolvedInProgressCertificates = inProgressCerts;
  }

  static fromParticipantData(pd: ParticipantData): Participant {
    let participant = new Participant(pd.firstName, pd.lastName, fromListOfCertificateData(pd.completedCertificates), fromListOfCertificateData(pd.inProgressCertificates));
    return participant;
  }

  static async fromListOfParticipantData(pd: ParticipantData[]): Promise<Participant[]> {
    let participants: Participant[] = [];
    pd.forEach(async p => {
      participants.push(await this.fromParticipantData(p));
    });
    return participants;
  }

  public set firstName(name: string) {
    this._firstName = name;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public set lastName(name: string) {
    this._lastName = name;
  }

  public get lastName(): string {
    return this._lastName;
  }
  public get unresolvedInProgressCertificates(): string[] {
    return this._unresolvedInProgressCertificates;
  }
  public set unresolvedInProgressCertificates(value: string[]) {
    this._unresolvedInProgressCertificates = value;
  }
  public set completedCertificates(certificates: Certificate[]) {
    this._completedCertificates = certificates;
  }

  public get completedCertificates(): Certificate[] {
    return this._completedCertificates;
  }
  public get unresolvedCompletedCertificates(): string[] {
    return this._unresolvedCompletedCertificates;
  }
  public set unresolvedCompletedCertificates(value: string[]) {
    this._unresolvedCompletedCertificates = value;
  }
  public set inProgressCertificates(certificates: Certificate[]) {
    this._inProgressCertificates = certificates;
  }

  public get inProgressCertificates(): Certificate[] {
    return this._inProgressCertificates;
  }

  public addInProgressCertificate(certificate: Certificate) {
    this._inProgressCertificates.push(certificate);
  }

  public addCompletedCertificate(certificate: Certificate) {
    this._completedCertificates.push(certificate);
    this.removeInProgressCertificate(certificate);
  }

  public removeInProgressCertificate(certificate: Certificate) {
    this._inProgressCertificates = this._inProgressCertificates.filter(cert => cert.certificateName !== certificate.certificateName);
  }

  public removeCompletedCertificate(certificate: Certificate) {
    this._completedCertificates = this._inProgressCertificates.filter(cert => cert.certificateName !== certificate.certificateName);
  }

  public hasCertificateByName(certName: string): boolean {
    let has: boolean = false;
    this._completedCertificates.forEach(c => {
      if (c.certificateName == certName) {has = true}
    });
    return has
  }

  public hasCertificate(cert: Certificate): boolean {
    let has: boolean = false;
    this._completedCertificates.forEach(c => {
      if (c.certificateName == cert.certificateName && c.level == cert.level) {has = true}
    });
    return has
  }
}
