import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-term-condition',
  templateUrl: './term-condition.component.html',
  styleUrls: ['./term-condition.component.css']
})
export class TermConditionComponent implements OnInit {
  termsData: any;
  banner: any;
  loding: boolean = true;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.termConditionData();
    this.getBanner();
  }
  // get term & condition
  termConditionData() {
    const data = {
      "id": "9"
    }
    this.service.post('privacy-policy', data, 0).subscribe(res => {
      this.termsData = res;
    })
  }
    // get banner api
    getBanner(){
      const data = {
        "id" : "1"
      }
      this.service.post('get-banner', data, 0).subscribe(res => {
       this.banner = res.data[0];
       this.loding = false
     })
    }
}
