import { afterNextRender, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  theme:BehaviorSubject<string> =new BehaviorSubject<string>("");
  constructor() {
    afterNextRender(() => {
      const savedTheme = localStorage.getItem("selectedTheme");

      if (savedTheme) {
        
        this.theme.next(savedTheme) ;
      } else {

        this.theme.next(window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light") 
      }

      this.applyTheme();
    });
  }

  toggleTheme(): void {
    this.theme.next(this.theme.getValue() === "light" ? "dark" : "light")
    localStorage.setItem("selectedTheme", this.theme.getValue());
    this.applyTheme();
  }

  applyTheme(): void {
    if (this.theme.getValue() === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
}
