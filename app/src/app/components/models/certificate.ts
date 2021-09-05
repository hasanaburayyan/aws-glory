import { CertificateData, CertificateService } from "src/app/services/certificate.service";

export interface Certificate {
  certificateName: string,
  id: string,
  level: string,
  order: number
}

export function fromListOfCertificateData(cd: CertificateData[]): Certificate[] {
  let certs: Certificate[] = []
  cd.forEach(cert => {
    certs.push({
      certificateName: cert.certificateName,
      id: cert.id,
      level: cert.level,
      order: cert.order
    });
  })
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