import { Pipe, PipeTransform } from '@angular/core';
import { products } from '../../../features/interfaces/products';

@Pipe({
  name: 'searchPip'
})
export class SearchPipPipe implements PipeTransform {

  transform(productList:products[], searchedText:string): products[] {
    return productList.filter(product =>{return product.title.toLowerCase().includes(searchedText.toLowerCase())
    })
  }

}
