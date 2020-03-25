import {Component, OnInit} from '@angular/core';
import {CatalogueService} from './catalogue.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public categories;
  public currentCategorie;
  public prom;

  constructor( private catService:CatalogueService,private router:Router) {
  }
  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    this.catService.getResource("/categories").subscribe(data=>{
      this.categories=data;
    }),err=>{
      console.log(err);
    }
  }

  getProductByCat(c) {
    this.currentCategorie=c;
this.router.navigateByUrl('/products/2/'+c.id);

  }

  onSelectedProducts() {
    this.currentCategorie=undefined;
    this.router.navigateByUrl('/products/1/0');
  }

  onProductsPromo() {
    this.prom=true;
    this.currentCategorie=undefined;
    this.router.navigateByUrl('/products/3/0');

  }

  onProductsDispo() {
    this.currentCategorie=undefined;
    this.router.navigateByUrl('/products/4/0');
  }
}
