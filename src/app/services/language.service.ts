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

  getLanguageList(): Observable<Language[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.languages)
    )
  }

  /**
   * This is a stub for now. Should return the preferred locale and language for the user.
   */
  getUserLanguage(): Language {
    return new Language();
  }

}

interface GetResponse {
  _embedded: {
    languages: Language[];
  }
}