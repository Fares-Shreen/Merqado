import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../services/auth/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-resetpassword',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './resetpassword.html',
  styleUrl: './resetpassword.scss'
})
export class Resetpassword {
  constructor(private _Auth: Auth, private _Router: Router, private toastr: ToastrService) { }
  emailExistance!: string;
  isLoading!: boolean;
  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z0-9]{8,}$/)]),
  })
  resetPasswordFormSubmit() {
    if (this.resetPasswordForm.valid) {
      this.isLoading = true;
      this._Auth.resetPassword(this.resetPasswordForm.value).subscribe({
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
        },
      })
    }
  }
}
