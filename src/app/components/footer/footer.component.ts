import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  message: boolean = false;
  submitted: boolean = false;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
  }
  subscribeForm = new FormGroup({
    email: new FormControl ('',[Validators.required,Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')])
  })
  get f() { return this.subscribeForm.controls; }
  //  subscribe
  subscribe(){
    this.submitted = true;
    if (this.subscribeForm.invalid) {
        return;
    }
    const data ={
      "email" :this.subscribeForm.value.email
    }
    this.service.post('add_newsletters_subscribe',data,0).subscribe(res => {
      if(res.result == 'success'){
        this.message = true;
        this.subscribeForm.reset();
      }
    })
  }
}
