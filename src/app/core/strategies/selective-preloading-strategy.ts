import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Only preload routes that have the preload flag set to true
    if (route.data && route.data['preload']) {
      console.log('Preloading: ' + route.path);
      return load();
    } else {
      return of(null);
    }
  }
}

