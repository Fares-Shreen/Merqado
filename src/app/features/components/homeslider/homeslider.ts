import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
 

@Component({
  selector: 'app-homeslider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './homeslider.html',
  styleUrl: './homeslider.scss'
})
export class Homeslider {
  customOptions: OwlOptions = {
     loop: true,
     mouseDrag: true,
     touchDrag: true,
     pullDrag: false,
     dots: false,
     navSpeed: 700,
     rtl:true,
     navText: ['prev', 'next'],
     autoplay:true,
     autoplayTimeout:5000,
     responsive: {
       0: {
         items: 1
       },
     },
     nav: true
   }
}
