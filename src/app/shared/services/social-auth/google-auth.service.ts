import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  clientId = '836785604044-fr4j1nd40egsacsod14gnjvahbi306r7.apps.googleusercontent.com';

  constructor() { }

  loadGoogleSignInScript(handleGoogleCredentialResponse: (response: any) => void) {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log("loadgoogle");

      // Initialize Google Sign-In
      (window as any).google.accounts.id.initialize({
        client_id: this.clientId,
        callback: handleGoogleCredentialResponse,
        auto_prompt: false,
        ux_mode: 'popup',
        context: 'signin',
        prompt_parent_id: '',
        prompt: 'none'
      });

      const signInButton = document.getElementById('g_id_signin');
      if (signInButton) {
        (window as any).google.accounts.id.renderButton(
          signInButton,
          {
            theme: 'filled_blue',
            size: 'large',
            shape: 'rectangular',
            type: 'standard',
            text: 'signin_with', 
            logo_alignment: 'left', 
            width: "250",
          }
        );
      }
    };
    document.head.appendChild(script);
  }

  decodeJwtResponse(token: string) {
    let base64Url = token.split('.')[1]
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload)
  }
}
