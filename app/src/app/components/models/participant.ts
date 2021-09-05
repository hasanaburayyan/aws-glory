import { CertificateData, CertificateService } from "src/app/services/certificate.service";
import { ParticipantData, TitleData } from "src/app/services/participant.service";
import {Certificate, fromCertificateData, fromListOfCertificateData} from "./certificate";

export class Participant {
  private _firstName: string;
  private _lastName: string;
  private _email: string
  private _username: string;
  
  private _completedCertificates: Certificate[];
  private _inProgressCertificates: Certificate[];
  private _titles: TitleData[];

  constructor(firstName: string, lastName: string, email: string, username: string,  completedCerts: CertificateData[], inProgressCerts: CertificateData[], titles: TitleData[]) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._username = username;
    this._completedCertificates = fromListOfCertificateData(completedCerts);
    this._inProgressCertificates = fromListOfCertificateData(inProgressCerts);
    this._titles = titles;
  }

  static fromParticipantData(pd: ParticipantData): Participant {
    let participant = new Participant(pd.firstName, pd.lastName, pd.email, pd.username, pd.completedCertificates, pd.inProgressCertificates, pd.titles);
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

  public set username(name: string) {
    this._username = name;
  }

  public get username(): string {
    return this._username;
  }

  public set lastName(name: string) {
    this._lastName = name;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public set email(email: string) {
    this._email = email;
  }

  public get email(): string {
    return this._email;
  }

  public get titles(): TitleData[] {
    return this._titles;
  }

  public set titles(titles: TitleData[]) {
    this._titles = titles;
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
