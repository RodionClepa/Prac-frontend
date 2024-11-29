import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ClientService } from '../../../shared/services/client.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent {
  constructor(private cookieService: CookieService, private router: Router, private clientService: ClientService) {}

  clickLogout() {
    this.cookieService.delete("token");
    this.router.navigate(['/auth/login']);
  }

  username = "";
  email = "";
  methodAuth = "";

  ngOnInit() {
    this.clientService.getProfile().subscribe({
      next: (response: any) => {
        console.log(response);
        this.username = response.username;
        this.email = response.username;
        this.methodAuth = response.authMethod;
        this.getData();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  transactions: any = [];

  getData() {
    this.clientService.getTransaction().subscribe({
      next: (response: any) => {
        console.log(response);
        this.transactions = response.content;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
