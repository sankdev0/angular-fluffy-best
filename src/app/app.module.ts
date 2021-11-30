import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { LanguageListComponent } from './components/language-list/language-list.component';
import { LanguageService } from './services/language.service';

import { Routes, RouterModule} from '@angular/router';

// The Order of routes is important
const routes: Routes = [
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    LanguageListComponent
  ],
  imports: [
    // Configure the router in the application module
    RouterModule.forRoot(routes),
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
