import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../catalogue.service';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 public products;
  public editPhoto;
  public currentProduct: any;
  private selectedFile ;
  public progress: number;
  private currentFileUpload: any;
  private err: any;
  public title;

  constructor(public catService : CatalogueService,
              private route:ActivatedRoute,private router:Router) {

  }

  ngOnInit(): void {
    let p1=this.route.snapshot.params.p1;
    if(p1==1){
      this.getProducts('/products/search/selectedProducts')
    }
    this.router.events.subscribe(val=>{
      if(val instanceof NavigationEnd){
        let url=val.url;
        console.log(url);
        let p1=this.route.snapshot.params.p1;
        if(p1==1){
          this.getProducts('/products/search/selectedProducts')
          this.title="Selection";
        }
        else if (p1==2){
          let p2=this.route.snapshot.params.p2;
          this.title="Catégorie "+p2;
          this.getProducts('/categories/'+ p2+'/products');
        }
        else if (p1==3){
          this.title="Promotion"
          this.getProducts('/products/search/promotion');
        }
        else if (p1==4){
          this.title="Disponible";
          this.getProducts('/products/search/dispo');
        }else if (p1==5){
          this.title="Recherche";
          this.getProducts('/products/search/dispo');
        }
        console.log(this.route.snapshot.params.p1)
      }
    })


  }

  private getProducts(url) {
    this.catService.getResource(url).subscribe(data=>{
      this.products=data;
    }),err=>{
      console.log(err)
    }
  }

  onEditPhoto(p) {
    this.currentProduct=p ;
    this.editPhoto=true ;
  }

  onSelectedFile(event) {
    this.selectedFile=event.target.files ;
  }

  uploadPhoto() {
    this.progress= 0 ;
    this.currentFileUpload=this.selectedFile.item(0);
    this.catService.uploadDonnes(this.currentFileUpload,this.currentProduct.id).subscribe(event=>{
      if(event.type===HttpEventType.UploadProgress){
        this.progress=Math.round(100*event.loaded/event.total);
      } else if (event instanceof HttpResponse){
        this.getProducts('/products/search/selectedProducts')
        console.log(this.progress);
        alert("Good Job")
      }},err=>{
      alert("problem chargement");
    })
  }
}
