import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  termsData: any;
  banner: any;
  question: any;
  loding: boolean = true;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.getBanner();
    this.getQuestion();
  }
    // get question api
    getQuestion() {
      const data = {
        "id": "1"
      }
      this.service.post('get-questions', data, 0).subscribe(res => {
        this.question = res.data;
      })
    }
    // get banner api
    getBanner(){
      const data = {
        "id" : "1"
      }
      this.service.post('get-banner', data, 0).subscribe(res => {
       this.banner = res.data[0];
       this.loding = false;

      
     })
    }

}
