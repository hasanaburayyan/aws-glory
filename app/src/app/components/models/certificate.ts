import { CertificateData, CertificateService } from "src/app/services/certificate.service";

export interface Certificate {
  certificateName: string,
  id: string,
  level: string,
  order: number
}

export function fromListOfCertificateData(cd: CertificateData[]): string[] {
  let certs: string[] = []
  cd.forEach(cert => {
    console.log(`from function: ${cert}`)
    certs.push(cert.toString());
  })
  // console.log(`CERTS TO BE ADDED: ${JSON.stringify(certs)}`)
  return certs;
}

export function fromCertificateData(cd: CertificateData): Certificate {
  return {
    certificateName: cd.certificateName,
    id: cd.id,
    level: cd.level,
    order: cd.order
  }
}