import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    if (
      req.url.includes('cart') ||
      req.url.includes('allorders') ||
      req.url.includes('wishlist') 

    ) {
      const token = localStorage.getItem('userToken') || '';
      req = req.clone({
        setHeaders: { token }
      });
    }
  }

  return next(req);
};
