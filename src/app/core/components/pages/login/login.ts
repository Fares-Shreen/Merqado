import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../services/auth/auth';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink,TranslatePipe],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  constructor(private _Auth: Auth, private _Router: Router, private toastr: ToastrService) { }
  emailExistance!: string;
  isLoading!: boolean;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z0-9]{8,}$/)]),
  })
  loginFormSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this._Auth.login(this.loginForm.value).subscribe({
        next: res => {
          localStorage.setItem("userToken", res.token);
          this._Router.navigate(["/home"])
          this._Auth.decodedData();
          this.isLoading = false;
          this.toastr.success(res.message, '', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
            progressBar: true,
          })

        }
      })
    }
  }
}