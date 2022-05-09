import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-teacher-support',
  templateUrl: './teacher-support.component.html',
  styleUrls: ['./teacher-support.component.css']
})
export class TeacherSupportComponent implements OnInit {
  supportData: any;
  submitted: boolean = false;
  sidebarData: any;
  showMsg: string;
  profileShow: boolean = false;
  dashboardShow: boolean = false;
  ismenusub: boolean = false;
  ismenu: boolean = false;
  ismenuShow: boolean = false;
  subTitle: any;
  user: string;
  coursesName: void;
  subtitle: void;
  title: void;

  constructor(private service: ServiceService,private router: Router) { }

  ngOnInit(): void {
    this.sidebar();
    this.username();
    // this.addInitialForms();
  }
  username(){
    this.user = sessionStorage.getItem('username');
  }
  getChildData(child) {
    sessionStorage.setItem('subId', child);
    this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { id: sessionStorage.getItem('subId') } });
  }
  // sidebar api
  sidebar() {
    const data ={
      user_id : sessionStorage.getItem('uid')
    }
    this.service.post('teacher_sidebar',data, 1).subscribe(res => {
      this.sidebarData = res.body.result;
    })
  }
  getSubTitle(parent) {
    const data = {
      "title_id": parent,
      user_id: sessionStorage.getItem('uid')
    }
    this.service.post('submenu-listing', data, 1).subscribe(res => {
      this.subTitle = res.body.result
    })
  }
  showshubmenu(){
    this.ismenuShow=!this.ismenuShow
  }

  showsubmenu(){
    this.ismenu=!this.ismenu
  }

  showsub(){
    this.ismenusub=!this.ismenusub
  }

  dashboardShow1(){
    this.dashboardShow=!this.dashboardShow
  }

  profileShow1(){
    this.profileShow=!this.profileShow
  }
    // view page
    view(id){
      this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { viewpage: id } });
    }
  // support validation
  supportForm = new FormGroup({
    subject: new FormControl('',Validators.required),
    message: new FormControl('',Validators.required)
  })
  get f() {return this.supportForm.controls}
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
    //sidebar accordion
    toggleAccordian(event, index,name,id) {
      this.coursesName = sessionStorage.setItem('course_name',name)
      sessionStorage.setItem('course-id',id)
   this.router.navigate(['/teacherDashboard/editCourse'], { queryParams: { id: id } });

      // const element = event.target;
      // element.classList.toggle('active');
      // if (this.sidebarData[index].isActive) {
      //   this.sidebarData[index].isActive = false;
      // } else {
      //   this.sidebarData[index].isActive = true;
      // }
    }
    toggleSubTitle(event, index, data,title) {
      this.title = sessionStorage.setItem('title',title)
      for (let i = 0; i < this.sidebarData.length; i++) {
        const title = this.sidebarData[i].title;
        for (let j = 0; j < title.length; j++) {
          const id = title[j].titleid
          if (data === id) {
            const element = event.target;
            element.classList.toggle('active');
            if (title[j].isActive) {
              title[j].isActive = false;
            } else {
              title[j].isActive = true;
            }
          }
        }
      }
    }
    getChildSData(child,subtitle) {
      this.subtitle = sessionStorage.setItem('subtitle',subtitle)
      sessionStorage.setItem('subId', child);
      this.router.navigate(['/multimedia/contentStyle'], { queryParams: { id: sessionStorage.getItem('subId') } });
    }
}
