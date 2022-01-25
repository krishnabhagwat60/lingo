import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-previous-support',
  templateUrl: './previous-support.component.html',
  styleUrls: ['./previous-support.component.css']
})
export class PreviousSupportComponent implements OnInit {
  support: any;
  sidebarData: any;
  ismenuShow: boolean = false;
  ismenu: boolean = false;
  ismenusub: boolean = false;
  dashboardShow: boolean = false;
  profileShow: boolean = false;
  subTitle: any;
  mainpageLoder = true;
  errMsg: string;
  user: string;
  coursesName: void;
  titlename: void;
  subtitle: void;
  constructor(private service: ServiceService,private router: Router) { }

  ngOnInit(): void {
    this.getSupport();
    this.sidebar();
    this.username();
  }
  username(){
    this.user = sessionStorage.getItem('username');
  }
  getChildData(child) {
    sessionStorage.setItem('subId', child);
    this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { id: sessionStorage.getItem('subId') } });
  }
  getSupport() {
    const data ={
      user_id: sessionStorage.getItem('uid')
    }
    this.service.post('Support_listing',data, 1).subscribe(res => {
      this.support = res.body.result;
      this.mainpageLoder = false
    })
  }
  getSubTitle(parent) {
    const data = {
      "title_id": parent,
      user_id: sessionStorage.getItem('uid')
    }
    this.service.post('submenu-listing', data, 1).subscribe(res => {
      // console.log(res);
      this.subTitle = res.body.result
      if(this.subTitle.length === 0){
        this.errMsg = 'Data Not Found'
      }
    })
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
  //sidebar accordion
  toggleAccordian(event, index,name,id) {
    this.coursesName = sessionStorage.setItem('course_name',name)
   this.router.navigate(['/teacherDashboard/editCourse'], { queryParams: { id: id } });
    sessionStorage.setItem('course-id',id)
    const element = event.target;
    element.classList.toggle('active');
    if (this.sidebarData[index].isActive) {
      this.sidebarData[index].isActive = false;
    } else {
      this.sidebarData[index].isActive = true;
    }
  }
  toggleSubTitle(event, index, data,title) {
    this.titlename = sessionStorage.setItem('title', title)
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
