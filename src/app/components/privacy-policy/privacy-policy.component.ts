import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  privacyData: any;
  banner: any;
  loding: boolean = true;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.privacyPolicyData();
    this.getBanner();
  }
  // get privacy policy
  privacyPolicyData() {
    const data = {
      "id": "2"
    }
    this.service.post('privacy-policy', data, 0).subscribe(res => {
      this.privacyData = res;
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
