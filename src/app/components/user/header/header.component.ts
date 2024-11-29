import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ClientService } from '../../../shared/services/client.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userName = "John Doe";

  constructor(private cookieService: CookieService, private router: Router, private clientService: ClientService) {}

  clickLogout() {
    this.cookieService.delete("token");
    this.router.navigate(['/auth/login']);
  }

  ngOnInit() {
    this.clientService.getProfile().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
