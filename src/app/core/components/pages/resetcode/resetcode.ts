import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../services/auth/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-resetcode',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './resetcode.html',
  styleUrl: './resetcode.scss'
})
export class Resetcode {
  constructor(private _Auth: Auth, private _Router: Router, private toastr: ToastrService) { }
  emailExistance!: string;
  isLoading!: boolean;
  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9][0-9]{3,6}$/)]),

  })
  resetCodeFormSubmit() {
    if (this.resetCodeForm.valid) {
      this.isLoading = true;
      this._Auth.resetCode(this.resetCodeForm.value).subscribe({
        next: res => {
          this._Router.navigate(["/resetpassword"])
          this.isLoading = false;
          this.toastr.success("success", '', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
            progressBar: true,
          })
        }
      })
    }
  }
}
