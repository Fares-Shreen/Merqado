import { Routes } from '@angular/router';
import { Home } from './features/components/home/home';
import { NotFound } from './core/components/pages/notFound/not-found/not-found';
import { guardGuard } from './core/guard/guard-guard';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home, title: 'Merqado' },
  { path: 'products', loadComponent: () => import('./features/components/products/products').then(c => c.Products) },
  { path: 'productDetails/:productId', loadComponent: () => import('./features/components/productdetails/productdetails').then(c => c.Productdetails) },
  { path: 'cart', loadComponent: () => import('./features/components/cart/cart').then(c => c.Cart),canActivate:[guardGuard] },
  { path: 'wishlist', loadComponent: () => import('./features/components/wishlist/wishlist').then(c => c.Wishlist),canActivate:[guardGuard]},
  { path: 'allorders', loadComponent: () => import('./features/components/orders/orders').then(c => c.Orders),canActivate:[guardGuard] },
  { path: 'categories', loadComponent: () => import('./features/components/categories/categories').then(c => c.Categories) },
  { path: 'brands', loadComponent: () => import('./features/components/brands/brands').then(c => c.Brands) },
  { path: 'register', loadComponent: () => import('./core/components/pages/register/register').then(c => c.Register) },
  { path: 'login', loadComponent: () => import('./core/components/pages/login/login').then(c => c.Login) },
  { path: 'resetcode', loadComponent: () => import('./core/components/pages/resetcode/resetcode').then(c => c.Resetcode) },
  { path: 'resetpassword', loadComponent: () => import('./core/components/pages/resetpassword/resetpassword').then(c => c.Resetpassword) },
  { path: 'forgetpassword', loadComponent: () => import('./core/components/pages/forgetpassword/forgetpassword').then(c => c.Forgetpassword) },
  { path: 'cashorders/:cartId', loadComponent: () => import('./features/components/cashOrders/check-orders/check-orders').then(c => c.CheckOrders),canActivate:[guardGuard] },
  { path: 'updatePassword', loadComponent: () => import('./core/components/pages/update-password/update-password').then(c => c.UpdatePassword),canActivate:[guardGuard] },
  { path: '**', component: NotFound, title: 'Not Found' },
];
