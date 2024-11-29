import { HttpClient, HttpParams } from '@angular/common/http';
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

  getTypes() {
    return this.http.get(this.apis.getTypes());
  }

  postTransaction(transaction: any) {
    return this.http.post(this.apis.postTransaction(), transaction);
  }

  getTransaction() {
    return this.http.get(this.apis.getTransaction(),{
      params: new HttpParams().set("page", 0).set("size", 200).set("sort", 'date,desc')
    });
  }

  getProfile() {
    return this.http.get(this.apis.getMe());
  }
}
