import { Component, OnInit } from '@angular/core';
import { UserOrderServices } from '../../servises/userOrdersServices/user-order-services';

import { ordersDetails } from '../../interfaces/userOrders';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-orders',
  imports: [TranslatePipe],
  templateUrl: './orders.html',
  styleUrl: './orders.scss'
})
export class Orders implements OnInit {
  constructor(private _UserOrderServices: UserOrderServices) { }
  orderDetails: ordersDetails[]=[];
  ngOnInit(): void {
    this.getUserOrders()
  }
getUserOrders() {
  if (typeof window !== 'undefined') {
    const userId = localStorage.getItem("userId")||null;
    if (userId) {
      this._UserOrderServices.usersOrders(userId).subscribe({
        next: res => {
          
          this.orderDetails = res;
        },
        error: err => console.error("Error fetching orders:", err)
      });
    }
  }
}
}