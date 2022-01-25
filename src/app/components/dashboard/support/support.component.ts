import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  supportData: any;
  submitted: boolean = false;
  showMsg: string;
  sidebarData: any;
  subTitle: any;
  profileShow: boolean = false;
  dashboardShow: boolean = false;
  ismenusub: boolean = false;
  ismenu: boolean = false;
  ismenuShow: boolean =false;
  user: string;
  coursesName: void;

  constructor(private service: ServiceService,private router: Router,private authService:SocialAuthService) { }

  ngOnInit(): void {
    this.username();
  }
    // username
    username(){
      this.user = sessionStorage.getItem('username');
    }
    // view page
    view(id) {
      this.router.navigate(['/exercise//teacherDashboard/student-view'], { queryParams: { viewpage: id } });
    }
  // support validation
  supportForm = new FormGroup({
    subject: new FormControl('',Validators.required),
    message: new FormControl('',Validators.required)
  })
  get f() { return this.supportForm.controls; }
  supportSend() {
    this.submitted = true;
    if (this.supportForm.invalid) {
        return;
    }
    const data = {
      "subject": this.supportForm.value.subject,
      "message": this.supportForm.value.message,
      user_id: sessionStorage.getItem('uid')
    }
    this.service.post('student-support', data, 1).subscribe(res => {
      this.supportData = res;
      if(res.body.message === 'success'){
        this.showMsg = 'Submit Successfully'
      }
      this.supportForm.reset();
      this.submitted = false;
    })
  }
  // logout
  logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('question_title');
    sessionStorage.removeItem('radio_title');
    sessionStorage.removeItem('title');
    sessionStorage.removeItem('course_name');
    sessionStorage.removeItem('student');
    this.signOut()
  }
  signOut(): void {
    this.authService.signOut();
  }
}
