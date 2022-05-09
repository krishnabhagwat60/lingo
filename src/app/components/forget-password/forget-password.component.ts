import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  submitted: boolean = false;
  Msg: string;
  mainpageLoder: boolean = false;

  constructor(private router: Router,private service : ServiceService) { }

  ngOnInit(): void {
  }
  // validation of forget password form
  forgetPasswordForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')])
  })
  get f() { return this.forgetPasswordForm.controls; }

  // forget password api
  forgetPassword() {
    this.submitted = true;
    if (this.forgetPasswordForm.invalid) {
        return;
    }
    this.mainpageLoder = true
    const data={
      email : this.forgetPasswordForm.value.email
    }
    this.service.post('password-forget',data , 0 ).subscribe(res =>{
     
      if(res.result.message === 'Change Password Link Send Your Mail Id.'){
        this.Msg = 'Change password link has been sent in to your registered mail ID.'
        this.mainpageLoder = false
      }
      if(res.result.message === 'Invlid Email Id'){
        this.Msg = 'Invalid Email Id'
        this.mainpageLoder = false
      }
      // this.router.navigate(['/change_password']);
    })
  }
}
