import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly store: Store,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
