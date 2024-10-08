import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApisService } from './apis.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient, private apis: ApisService) { }

  checkJwt() {
    return this.http.post(this.apis.validateToken(), {}, { responseType: 'text' });
  }
}
