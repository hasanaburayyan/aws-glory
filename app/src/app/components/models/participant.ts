import { ParticipantData } from "src/app/services/participant.service";
import {Certificate} from "./certificate";

export class Participant {
  private _firstName: string;
  private _lastName: string;
  private _completedCertificates: Certificate[];
  private _inProgressCertificates: Certificate[];

  constructor(firstName: string, lastName: string, completedCerts?: Certificate[], inProgressCerts?: Certificate[]) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._completedCertificates = completedCerts? completedCerts : [];
    this._inProgressCertificates = inProgressCerts? inProgressCerts : [];
  }

  static fromParticipantData(pd: ParticipantData): Participant {
    let participant = new Participant(pd.firstName, pd.lastName);
    return participant;
  }

  static fromListOfParticipantData(pd: ParticipantData[]): Participant[] {
    let participants: Participant[] = [];
    pd.forEach(p => {
      participants.push(this.fromParticipantData(p));
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

  public set completedCertificates(certificates: Certificate[]) {
    this._completedCertificates = certificates;
  }

  public get completedCertificates(): Certificate[] {
    return this._completedCertificates;
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
    this._inProgressCertificates = this._inProgressCertificates.filter(cert => cert.name !== certificate.name);
  }

  public removeCompletedCertificate(certificate: Certificate) {
    this._completedCertificates = this._inProgressCertificates.filter(cert => cert.name !== certificate.name);
  }

  public hasCertificateByName(certName: string): boolean {
    let has: boolean = false;
    this._completedCertificates.forEach(c => {
      if (c.name == certName) {has = true}
    });
    return has
  }

  public hasCertificate(cert: Certificate): boolean {
    let has: boolean = false;
    this._completedCertificates.forEach(c => {
      if (c.name == cert.name && c.level == cert.level) {has = true}
    });
    return has
  }
}
