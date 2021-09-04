import * as certService from './certificate-service';

async function getCertificate() {
    let cert = await certService.handler({
        queryStringParameters: {
            certificateId: 'advanced-networking'
        }
    }, {})

    console.log(cert);
}

getCertificate();
