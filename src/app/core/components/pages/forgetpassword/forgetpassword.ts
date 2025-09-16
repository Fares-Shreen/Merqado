import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../services/auth/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './forgetpassword.html',
  styleUrl: './forgetpassword.scss'
})
export class Forgetpassword {
  constructor(private _Auth: Auth, private _Router: Router, private toastr: ToastrService) { }
  emailExistance!: string;
  isLoading!: boolean;
  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),

  })
  forgetPasswordFormSubmit() {
    if (this.forgetPasswordForm.valid) {
      this.isLoading = true;
      this._Auth.forgetPassword(this.forgetPasswordForm.value).subscribe({
        next: res => {
          this._Router.navigate(["/resetcode"])
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
