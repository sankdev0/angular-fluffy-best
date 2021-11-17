import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from '../common/language';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private baseUrl = 'http://localhost:8080/api/languages';

  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable<Language[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.languages)
    )
  }

}

interface GetResponse {
  _embedded: {
    languages: Language[];
  }
}