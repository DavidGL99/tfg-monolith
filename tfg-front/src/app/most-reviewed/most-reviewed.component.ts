import { Component } from '@angular/core';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-most-reviewed',
  templateUrl: './most-reviewed.component.html',
  styleUrls: ['./most-reviewed.component.css']
})
export class MostReviewedComponent {

  constructor(private reviewService : ReviewService){}

  products : any[] = []

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getProducts();
  }

  getProducts() : void {
    this.reviewService.getMostReviewed().subscribe(res=>{
      console.log(res);
      this.products = res
    }
     );
  }
}
