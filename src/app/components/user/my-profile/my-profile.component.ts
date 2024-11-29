import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent {
  constructor(private cookieService: CookieService, private router: Router) {}

  clickLogout() {
    this.cookieService.delete("token");
    this.router.navigate(['/auth/login']);
  }
}
