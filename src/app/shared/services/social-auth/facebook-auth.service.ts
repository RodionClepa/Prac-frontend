import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacebookAuthService {

  constructor() { }

  loadFacebookSDK() {
    // Load the Facebook SDK
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      (window as any).fbAsyncInit = this.initializeFacebookSDK.bind(this);
    };
    document.head.appendChild(script);
  }

  private initializeFacebookSDK() {
    console.log('Initializing Facebook SDK');
    (window as any).FB.init({
      appId: '1058360645898684',
      cookie: true,
      xfbml: true,
      version: 'v20.0'
    });
  }

  handleFacebookLogin(): Promise<any> {
    return new Promise((resolve, reject) => {
      (window as any).FB.login((response: any) => {
        if (response.authResponse) {
          console.log('FB.login successful', response);
          resolve(response.authResponse);  // Resolve with the login response
        } else {
          console.log('FB.login failed', response);
          reject(response);
        }
      }, { scope: 'email' });
    });
  }

  fetchFacebookUserInfo() {
    return new Promise((resolve, reject) => {
      console.log("fetchFacebookUserInfo");
      (window as any).FB.api('/me', { fields: 'name,email' }, (response: any) => {
        if (response && !response.error) {
          console.log(response);
          resolve(response);
        } else {
          reject(response.error);
        }
      });
    });
  }
}
