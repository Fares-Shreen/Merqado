
import { Component } from '@angular/core';
import { Auth } from '../../../services/auth/auth';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';



@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  errorMessage!: string;
  isLoading!: boolean;
  registrationForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(12)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z0-9]{8,}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, this.passwordConfirmation)

  constructor(private _Auth: Auth, private _Router: Router, private toastr: ToastrService) { }
  emailExistance!: string;
  registrationFormSubmit() {

    if (this.registrationForm.valid) {
      this.isLoading = true;
      this._Auth.register(this.registrationForm.value).subscribe({
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
