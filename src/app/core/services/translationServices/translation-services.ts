import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationServices {
  constructor(private _TranslateService:TranslateService,@Inject(PLATFORM_ID)Id:object){
    if (isPlatformBrowser(Id)) {
      let defaultLang="en";
      if (localStorage.getItem("lang")!=null) {
        defaultLang=localStorage.getItem("lang")!;
      }
    this._TranslateService.setFallbackLang(defaultLang);
    this._TranslateService.use(defaultLang);
    this.changeDirection(defaultLang)      
    }
  }
  chnageLanguage(lang:string){
    localStorage.setItem("lang",lang)
    this._TranslateService.setFallbackLang(lang);
    this._TranslateService.use(lang);
    this.changeDirection(lang)
  }
  changeDirection(lang:string){
    if (lang==="en") {
      document.dir = "ltr";
    }
    else if (lang==="ar") {
      document.dir="rtl";
    } 
  }
}
