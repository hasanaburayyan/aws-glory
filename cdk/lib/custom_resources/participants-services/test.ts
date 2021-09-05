import {handler} from './participant-service';
import axios, {AxiosResponse, AxiosRequestConfig} from 'axios';

let req = {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin"
    },
    "referrer": "http://localhost:4200/dashboard",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "{\"participant\":{\"_firstName\":\"Hasan\",\"_lastName\":\"Abu-Rayyan\",\"_email\":\"hasanaburayyan21@gmail.com\",\"_username\":\"HasHas\",\"_completedCertificates\":[{\"certificateName\":\"Cloud Practitioner\",\"id\":\"cloud-practitioner\",\"level\":\"Foundational\",\"order\":1}],\"_inProgressCertificates\":[{}],\"_titles\":[{\"name\":\"Officially Certified\",\"prerequisite\":[\"1x Foundation Certificate\"],\"id\":\"officially-certified\"}]}}",
    "method": "POST",
    "mode": "cors",
    "credentials": "omit"
  }

handler(req, {}).then(x => {
  console.log(x);
})