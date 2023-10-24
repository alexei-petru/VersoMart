import { Component } from '@angular/core';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  authState$ = this.authService.authState$;

  constructor(private authService: AuthService) {}
}
