import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import * as $ from 'jquery';
declare var $: any;
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SocialAuthService } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginFail') loginFail;
  errMessage: boolean = false;
  submitted: boolean = false;
  ErrMsg: string;
  passType: string = 'password';
  show: boolean;
  getCourse: any;
  social: any;
  safeSrc: SafeResourceUrl;
  ischeckboxTrue: boolean = false;
  isChecked: boolean = false;
  mainpageLoder: boolean = false;
  errMsg: string;
  msg: string;
  role: string;
  userName: string;
  email: string;

  constructor(
    private service: ServiceService,
    private router: Router,
    private authService: SocialAuthService,
    private sanitizer: DomSanitizer
  ) {
    this.show = false;
  }

  ngOnInit(): void {
    $('.toggle-password').click(function () {
      $(this).toggleClass('fa-eye fa-eye-slash');
      var input = $($(this).attr('toggle'));
      if (input.attr('type') == 'password') {
        input.attr('type', 'text');
      } else {
        input.attr('type', 'password');
      }
      $;
    });
    this.setPassword();
    if (sessionStorage.getItem('loginmsg')) {
      this.msg = 'Thank you for joining Lingolista';
      setTimeout(() => {
        this.msg = '';
        sessionStorage.removeItem('loginmsg');
      }, 100000);
    }
    this.authService.authState.subscribe((user) => {
      if (user != null) {
        this.userName = user.name;
        this.email = user.email;
        this.socialLogin();
      }
    });
  }
  rememberMe() {
    this.isChecked = !this.isChecked;
    if (this.isChecked == true) {
      localStorage.setItem('setEmail', this.loginForm.value.email);
      localStorage.setItem('setPassword', this.loginForm.value.pwd);
    }
    if (this.isChecked == false) {
      localStorage.setItem('setEmail', '');
      localStorage.setItem('setPassword', '');
    }
  }
  // show and hide password
  password() {
    this.show = !this.show;
  }

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(25),
      Validators.pattern(/[!^\w\s]$/),
    ]),
    pwd: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.mainpageLoder = true;
    const data = {
      name: this.loginForm.value.email,
      pass: this.loginForm.value.pwd,
    };
    this.service.post('user/login', data, 0).subscribe((res) => {
      this.mainpageLoder = false;
      if (res.mesaage == 'Username/Password is Incorrect') {
        this.ErrMsg = 'Username/Password is Incorrect';
      }
      if (res.message == 'Login Successfully') {
        this.ErrMsg = '';
        this.errMsg = 'Login Successfully';
      }
      if (res.current_user) {
        sessionStorage.setItem('token', res.current_user.csrf_token);
        sessionStorage.setItem('username', res.current_user.name);
        sessionStorage.setItem('uid', res.current_user.uid);
        sessionStorage.setItem('basic_key', res.current_user.basic_auth_token);
        sessionStorage.setItem('wallet', res.current_user.wallet);
        localStorage.setItem('image', res.current_user.image_link);
        localStorage.setItem('images', res.current_user.image_link);
        console.log('dashboard', res.current_user.dashboard);
        setTimeout(() => {
          if (
            res.current_user.subscription &&
            res.current_user.dashboard === 'dashboard'
          ) {
            this.router.navigate(['/teacherDashboard/teachersDashboard']);
          } else if (
            res.current_user.subscription &&
            res.current_user.dashboard === 'create dashboard'
          ) {
            this.router.navigate(['/teacherDashboard/plansAndPricing']);
          } else if (
            !res.current_user.subscription &&
            res.current_user.dashboard === 'dashboard'
          ) {
            this.router.navigate(['teacherDashboard/creatCourseDashboard']);
          } else {
            this.router.navigate(['teacherDashboard/creatCourseDashboard']);
          }
          if (res.current_user.roles[1] === 'student') {
            sessionStorage.setItem('student', res.current_user.roles[1]);
            this.router.navigate(['dashboard/studentDashboard']);
          }
        }, 100);
      }
    });
  }
  // get teacher course api
  getTeacherCourse(page = 1) {
    const data = {
      id: '1',
      page: 1,
    };
    this.service.post('get-teacher-course', data, 1).subscribe((res) => {
      this.getCourse = res.body.data;
      // console.log(this.getCourse);
    });
  }

  // social login
  socialLogin() {
    const data = {
      username: this.userName,
      email: this.email,
      role: sessionStorage.getItem('userRoles'),
    };
    this.service.post('social-signup', data, 0).subscribe((res) => {
      if (res.current_user) {
        if (res.current_user.dashboard === 'dashboard') {
          this.router.navigate(['teacherDashboard/teachersDashboard']);
        }
        if (res.current_user.dashboard === 'create dashboard') {
          this.router.navigate(['teacherDashboard/creatCourseDashboard']);
        }
        if (res.current_user.roles[1] === 'student') {
          sessionStorage.setItem('student', res.current_user.roles[1]);
          this.router.navigate(['dashboard/studentDashboard']);
        }
        sessionStorage.setItem('token', res.current_user.csrf_token);
        sessionStorage.setItem('basic_key', res.current_user.basic_auth_token);
        sessionStorage.setItem('username', res.current_user.name);
        sessionStorage.setItem('uid', res.current_user.uid);
        localStorage.setItem('image', res.current_user.image_link);
        localStorage.setItem('images', res.current_user.image_link);
      }
    });
  }
  signInWithGoogle(): void {
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (socialusers) => {
        this.role = sessionStorage.getItem('userRoles');
        (this.userName = socialusers.email), (this.email = socialusers.email);
        setTimeout(() => {
          this.socialLogin();
        }, 100);
      },
      (err) => {
        if (err.error == 'idpiframe_initialization_failed') {
          $('#invitesuccess').modal('show');
        }
      }
    );
  }
  // signInWithFB(): void {
  //    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  //   this.authService.authState.subscribe(user => {
  //      if(user != null){
  //       this.userName  = user.name
  //       this.email = user.email
  //         this.socialLogin();
  //      }
  //   })
  // this.authService.authState.subscribe((user) => {
  //   if(user != null){
  //     this.userName  = user.name
  //     this.email = user.email
  //      this.socialLogin();
  //   }
  //       });
  // }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    window['FB'].login(
      (response) => {
        if (response.authResponse) {
          window['FB'].api(
            '/me',
            {
              fields: 'last_name, first_name, email',
            },
            (userInfo) => {}
          );
        } else {
        }
      },
      { scope: 'email' }
    );
  }
  // set password
  setPassword() {
    this.loginForm.controls.email.setValue(localStorage.getItem('setEmail'));
    this.loginForm.controls.pwd.setValue(localStorage.getItem('setPassword'));
  }
}
