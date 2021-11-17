import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { LanguageListComponent } from './components/language-list/language-list.component';
import { LanguageService } from './services/language.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    LanguageListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ProductService,
    LanguageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
