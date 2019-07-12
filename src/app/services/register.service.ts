import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { ScandataUtils } from '../utils/scandata.utils';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(
    private http: HttpClient,
    private globaltrunowFunctions: ScandataUtils,
  ) {}

  public businessInfo: any = {
    data: {},
    token: '',
  };

  processPayment(data) {
    return this.http.post(environment.API_ENDPOINT + '/processPayment', data);
  }

  // register
  register(data, token) {
    const httpHeaders = new HttpHeaders({
      'phonenumber-token': token,
    });
    return this.http.post(
      environment.API_ENDPOINT + '/registerLocation',
      data,
      { headers: httpHeaders },
    );
  }

  sendOtp(number) {
    return this.http.post(environment.API_ENDPOINT + '/sendOtp/' + number, {});
    // .catch(this.handleError);
  }

  posTypes() {
    return this.http.get(environment.API_ENDPOINT + '/posTypes');
  }

  validateOtp(code, otpCode) {
    return this.http.post(
      environment.API_ENDPOINT + '/validateOtp/' + code + '/' + otpCode,
      {},
    );
    // .catch(this.handleError);
  }

  packages(category) {
    return this.http.get(environment.API_ENDPOINT + '/packages/' + category);
  }

  // trunow services

  getLastPurchase() {
    return this.http.get(environment.trunowLink + '/lastPurchase');
  }

  getLastRedemption() {
    return this.http.get(environment.trunowLink + '/lastRedemption');
  }

  submitContact(params) {
    return this.http.post(environment.API_ENDPOINT + '/submitContact', params);
    // .catch(this.handleError);
  }
}
