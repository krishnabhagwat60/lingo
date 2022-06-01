import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { ConfirmedValidator } from './confirmed.validator';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('loginFail') loginFail;
  registerForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  ErrMsg: string;
  isDisabled: boolean = true;
  errMsg: string;
  mainpageLoder: boolean = false;
  isDisableds: boolean = false;
  loginMsg: string;
  role: string;
  userName: string;
  email: string;
  social = true;
  errrMsg: string;
  socialErr: string;
  constructor(private fb: FormBuilder, private service: ServiceService, private authService: SocialAuthService, private router: Router) {
    this.registerForm = fb.group({
      remember: ['', Validators.required],
      username: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/[!^\w\s]$/)]],
      email: ['', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]],
      pwd: ['', [Validators.required, Validators.minLength(3)]],
      checkbox: ['', Validators.required],
      confirm_password: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('pwd', 'confirm_password')
    })
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {

      if (user != null) {
        this.userName = user.name
        this.email = user.email
        this.socialLogin();
      }
    });
  }

  // checkbox checked unchecked 
  updateStatus($event) {
    $event.target.checked === true ? this.isDisabled = false : this.isDisabled = true;
  }
  get f() { return this.registerForm.controls; }
  validateData() {
    if (this.registerForm.value.remember) {
      this.ErrMsg = ''
    }
    this.social = false
  }
  register() {
    this.ErrMsg = ''
    if (this.registerForm.value.remember == '') {
      this.ErrMsg = " Please select user role";
      this.submitted = false;
    }
    if (this.registerForm.value.checkbox == '' || this.registerForm.value.remember == false) {
      this.errMsg = " Please check the checkbox";
      this.submitted = false;
    }
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.mainpageLoder = true;
    const data = {
      "username": this.registerForm.value.username,
      "password": this.registerForm.value.pwd,
      "email": this.registerForm.value.email,
      "role": this.registerForm.controls['remember'].value
    }
    this.service.post('create-entry', data, 0).subscribe(res => {
      this.mainpageLoder = false;

      if (res[0].message == 'This Username Already Register') {
        this.ErrMsg = "This Username Already Register";
      }
      if (res[0].message == 'This Email Id Already Register') {
        this.ErrMsg = "This Email Id Already Register";
      }
      if (res[0].message == 'Successfully Register') {
        this.errrMsg = "Successfully Register";
        this.loginMsg = "Thank you for joining Lingolista"
        sessionStorage.setItem('loginmsg', this.loginMsg)
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      }
    })

  }


  // social login
  socialLogin() {
    const data = {
      "username": this.userName,
      "email": this.email,
      "role": this.registerForm.controls['remember'].value
    }
    this.service.post('social-signup', data, 0).subscribe(res => {
      sessionStorage.setItem('userRoles', res.current_user.roles[1])
      sessionStorage.setItem('token', res.current_user.csrf_token);
      sessionStorage.setItem('username', res.current_user.name);
      sessionStorage.setItem('uid', res.current_user.uid);
      sessionStorage.setItem('basic_key', res.current_user.basic_auth_token);
      sessionStorage.setItem('wallet', res.current_user.wallet);
     
      if(res.message == 'This Email Is Already Register For Other Role'){
        this.socialErr = 'This Email Is Already Register For Other Role'
      }else{
        // setTimeout(() => {
          if (res.current_user.dashboard === 'dashboard') {
            this.router.navigate(['teacherDashboard/teachersDashboard']);
          }else if (res.current_user.dashboard === 'create dashboard') {
            this.router.navigate(['teacherDashboard/creatCourseDashboard']);
          }
         else if (res.current_user.roles[1] === 'student') {
            sessionStorage.setItem('student', res.current_user.roles[1])
            this.router.navigate(['dashboard/studentDashboard']);
          }
        // }, 100);
      }
   
    })

  }
  signInWithGoogle(): void {
    if (this.registerForm.value.remember == '') {
      this.ErrMsg = " Please select user role";
      this.submitted = false;
    }else{
      // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(socialusers => {
        this.role = this.registerForm.value.remember
        this.userName = socialusers.email,
          this.email = socialusers.email
        setTimeout(() => {
          this.socialLogin();
        }, 100);
      },
      err => {
        if(err.error == 'idpiframe_initialization_failed'){
          $('#invitesuccess').modal('show'); 
        }
     }
     );
    }
  }

  signInWithFB(): void {
    if (this.registerForm.value.remember == '') {
      this.ErrMsg = " Please select user role";
      this.submitted = false;
    }else{
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    window['FB'].login((response) => {
      if (response.authResponse) {

        window['FB'].api('/me', {
          fields: 'last_name, first_name, email'
          
        }, (userInfo) => {
        });
      } else {
      }
    }, { scope: 'email' });

  }
  }

  signOut(): void {
    this.authService.signOut();
  }
}
