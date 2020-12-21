import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticateService,
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/user-list']);
  }
   }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
  });
  this.returnUrl = this.route.snapshot.queryParams['user-list'] || '/user-list';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                console.log(data)
                this.router.navigate([this.returnUrl]);
            },
            error => {
                console.log(error)
            });

  }
}
