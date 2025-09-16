import { FormGroup, AbstractControl, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Auth } from '../../../services/auth/auth';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-password',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './update-password.html',
  styleUrl: './update-password.scss'
})
export class UpdatePassword {

  errorMessage!: string;
  isLoading!: boolean;
  updatePasswordForm: FormGroup = new FormGroup({
    currentPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z0-9]{8,}$/)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z0-9]{8,}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
  }, this.passwordConfirmation)

  constructor(private _Auth: Auth, private _Router: Router, private toastr: ToastrService) { }
  emailExistance!: string;
  updatePasswordFormSubmit() {

    if (this.updatePasswordForm.valid) {
      this.isLoading = true;
      this._Auth.updatePassword(this.updatePasswordForm.value).subscribe({
        next: res => {
          localStorage.setItem("userToken", res.token)
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
  passwordConfirmation(passwordDetection: AbstractControl) {
    if (passwordDetection.get("password")?.value === passwordDetection.get("rePassword")?.value) {
      return null
    }
    else {
      passwordDetection.get("rePassword")?.setErrors({ misMatch: true })
    }
    return { misMatch: true }
  }

}
