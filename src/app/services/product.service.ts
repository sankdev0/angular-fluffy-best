import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products?size=100';

  constructor(private httpClient: HttpClient) { }

  /**
   * Returns an observable. The method maps the JSON data from Spring Data REST to Product array.
   */
  getProductList(): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.products)
    )
  }

}

/**
 * Supporting interface. Unwraps the JSON from Spring Data REST _embedded entry.
 */
interface GetResponse {
  _embedded: {
    products: Product[];
  }
}