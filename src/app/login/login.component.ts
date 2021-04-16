import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly spinner: NgxSpinnerService,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.spinner.show();
    this.authService.login(
      {
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value
      }
    )
      .pipe(
        finalize(() => this.spinner.hide())
      )
      .subscribe({
        next: () => {
          const url = this.route.snapshot.queryParamMap.get('redirect');
          if (!!url) {
            this.router.navigateByUrl(url);
          };
        }
      });
  }

}
