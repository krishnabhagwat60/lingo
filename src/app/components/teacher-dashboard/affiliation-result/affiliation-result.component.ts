import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-affiliation-result',
  templateUrl: './affiliation-result.component.html' 
  ,
  styleUrls: ['./affiliation-result.component.css']
})
export class AffiliationResultComponent implements OnInit {
  sidebarData: any;
  id: string;
  affiliationData: any;
  totalQuestion: any;
  totalRightAnswer: any;
  courseNameData: string;
  title: string;
  profileShow: boolean = false;
  dashboardShow: boolean = false;
  ismenusub: boolean = false;
  ismenu: boolean = false;
  ismenuShow: boolean = false;
  subTitle: any;
  authenticate: string;
  courses: boolean = false;
  sidebarData2: any;
  coursesName: void;
  titleid: string;
  constructor(private service: ServiceService,private router: ActivatedRoute, private route: Router,private _location: Location) { 
    this.router.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");
      this.titleid = queryParams.get("titleid");
    })
    this.courseNameData= sessionStorage.getItem('course_name')
  }

  ngOnInit(): void {
    this.sidebar();
    this.showAffiliationData();
    this.courseName();
    this.titleName();
    this.authenticateName();
    this.studentSideBar();
  }
  studentSideBar() {
    const data={
      user_id:sessionStorage.getItem('uid')
    }
    this.service.post('student_sidebar',data, 1).subscribe(res => {
      this.sidebarData2 = res.body.result;
    })
  }
  toggleAccordian2(event, index) {
    const element = event.target;
    element.classList.toggle('active');
    if (this.sidebarData2[index].isActive) {
      this.sidebarData2[index].isActive = false;
    } else {
      this.sidebarData2[index].isActive = true;
    }
  }
  toggleSubTitle2(event, index, data) {
    for (let i = 0; i < this.sidebarData2.length; i++) {
      const title = this.sidebarData2[i].title;
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

  authenticateName() {
    this.authenticate = sessionStorage.getItem('student')
    if (this.authenticate) {
      this.courses = true;
    }
  }
  gotoBack(){
    this._location.back();
  }
  getSubTitle(parent) {
    const data = {
      "title_id": parent,
      user_id: sessionStorage.getItem('uid')
    }
    this.service.post('submenu-listing', data, 1).subscribe(res => {
      // console.log(res);
      this.subTitle = res.body.result
    })
  }
  getChildData(child) {
    sessionStorage.setItem('subId', child);
    this.route.navigate(['/teacherDashboard/student-view'], { queryParams: { id: sessionStorage.getItem('subId') } });
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
  // sidebar api
  sidebar() {
    const data ={
      user_id : sessionStorage.getItem('uid')
    }
    this.service.post('teacher_sidebar',data, 1).subscribe(res => {
      this.sidebarData = res.body.result;
      //  console.log(this.sidebarData);
    })
  }
    // affiliation show result api
    showAffiliationData() {
      const data1 = {
        // title_data:  this.service.globaleData,
        title_data: JSON.parse(sessionStorage.getItem('my_data')),
        type: "afiliation"
      }
      this.service.post('show_result', data1, 1).subscribe(res => {
        this.affiliationData  = res.body.result.data;
        this.totalQuestion = res.body.result.total_question
        this.totalRightAnswer = res.body.result.total_right_answer
      })
    }

    // retry functionality
    retry(){
      this.route.navigate(['/teacherDashboard/student-view'], { queryParams: { id: this.id } });
    }
    courseName() {
      this.courseNameData = sessionStorage.getItem('course_name')
    }
    titleName(){
      this.title = sessionStorage.getItem('title')
    }
      //sidebar accordion
  toggleAccordian(event, index,name,id) {
    this.coursesName = localStorage.setItem('coursename',name)
   this.route.navigate(['/teacherDashboard/editCourse'], { queryParams: { id: id } });
    const element = event.target;
    element.classList.toggle('active');
    if (this.sidebarData[index].isActive) {
      this.sidebarData[index].isActive = false;
    } else {
      this.sidebarData[index].isActive = true;
    }
  }
  toggleSubTitle(event, index, data) {
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
  getChildSData(child) {
    sessionStorage.setItem('subId', child);
    this.route.navigate(['/teacherDashboard/student-view'], { queryParams: { id: sessionStorage.getItem('subId') } });
  }
  goToSolution(){
    this.route.navigate(['/teacherDashboard/affiliationSolution'], { queryParams: { titleid: this.titleid } });
  }
}

