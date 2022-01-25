import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { ConfirmedValidator } from '../register/confirmed.validator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup = new FormGroup({});
  submitted: boolean;
  Msg: string;
  userId: any;

  constructor(private service: ServiceService, private fb: FormBuilder, private router: Router,private route: ActivatedRoute){
    this.changePasswordForm = fb.group({
      // email: ['', [Validators.required, Validators.email]],
      pwd: ['', Validators.required],
      confirm_password: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('pwd', 'confirm_password')
    })
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['uid'];
    });
  }
  get f() { return this.changePasswordForm.controls; }

  //  change password
  changePassword() {
    this.submitted = true;
    if (this.changePasswordForm.invalid) {
        return;
    }else{
    const data = {
     uid: this.userId,
      "new_pass" : this.changePasswordForm.value.pwd
    }
    this.service.post('save-password', data, 0).subscribe(res => {
      if(res.message === 'Success'){
        this.Msg = 'Password Changed'
        this.router.navigate(['/login'])
      }
    })
  }
}
}
