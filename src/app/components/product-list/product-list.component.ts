import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { GetResponseProducts, ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products?: Product[];
  currentCategoryId: number = 1;
  currentCategoryName: string = 'Books';
  previousCategoryId: number = 1;
  searchMode?: boolean;

  // Props for pagination
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  // Inject ProductService and ActivatedRoute into ProductListComponent
  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const theKeyword = this.route.snapshot.paramMap.get('keyword');

    // now search for the products using keyword
    this.productService.searchProducts(theKeyword!).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handleListProducts() {

    // check if categoryId is chosen
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');


    if (hasCategoryId) {
      // get the "id" param string. Convert string to a number.
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    } else {
      // not category id is available ... default to category id 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    //
    // Check if we have a different category than previous to RESET thePageNumber back to 1
    // Note: Angular reuses the currently viewed component
    //
    
    
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, pageNumber=${this.thePageNumber}`);


    // now get the products for the given category id
    this.productService.getProductListPaginate(this.thePageNumber - 1,
        this.thePageSize,
        this.currentCategoryId)
        .subscribe(this.processResult());
    }

    processResult() {
    return (data: GetResponseProducts) => {
    this.products = data._embedded.products;
    this.thePageNumber = data.page.number + 1;
    this.thePageSize = data.page.size;
    this.theTotalElements = data.page.totalElements;
    };
  }

}
