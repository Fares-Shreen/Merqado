import { afterNextRender, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../services/flowbite/flowbite';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../../services/auth/auth';
import { CartServices } from '../../../../features/services/cartServices/cart-services';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationServices } from '../../../services/translationServices/translation-services';
import { DarkModeService } from '../../../services/dark-mode.service';




@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  isLogin: boolean = false;
  isDarkMode: boolean = false;
  isEnglish:boolean =true
  constructor(
    private flowbiteService: FlowbiteService,
    public _Auth: Auth,
    public _CartServices: CartServices,
    private _ChangeDetectorRef: ChangeDetectorRef,
    public _TranslationServices: TranslationServices,
    private darkModeService: DarkModeService
  ) {
  }

  ngOnInit(): void {
    this.checkDarkMode();
    this._Auth.userData.subscribe({
      next: res => {
        if (res != null) {
          this.isLogin = true
          this.checkcartCounter();
          this._ChangeDetectorRef.detectChanges();
        }
        else {
          this.isLogin = false
        }
      }
    })

    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
  checkcartCounter() {
    if (localStorage.getItem("userToken")) {
      this._CartServices.getCartProducts().subscribe({
        next: res => {
          this._CartServices.productCartNumber.set(res.numOfCartItems);
        }
      });
    }
  }
  checkDarkMode() {
    if (this.darkModeService.theme.getValue() == "dark") {
      this.isDarkMode = true;
    }
    else if (this.darkModeService.theme.getValue() == "light") {
      this.isDarkMode = false;
    }
  }
  toggleDarkMode(): void {
    this.darkModeService.toggleTheme();
    this.isDarkMode=!this.isDarkMode;
    
  }
  toggleTranslate(){
    this.isEnglish=!this.isEnglish
  }

}
