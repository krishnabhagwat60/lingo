import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-accept-course',
  templateUrl: './accept-course.component.html',
  styleUrls: ['./accept-course.component.css']
})
export class AcceptCourseComponent implements OnInit {
  courseData: any;
  id: any;
  mainpageLoder: boolean = false;
  sidebarData: any;
  totalPages: any[];
  buttonColor: any;
  current_page = 1;
  approved: boolean = false;
  buttonShow: boolean = true;
  msgShow: string;
  profileShow: boolean = false;
  dashboardShow: boolean = false;
  ismenu: boolean = false;
  ismenusub: boolean = false;
  ismenuShow: boolean = false;
  subTitle: any;
  user: string;
  coursesName: void;
  titlename: void;
  subtitle: void;
  constructor(private service: ServiceService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");
    })
  }

  ngOnInit(): void {
    // this.getAcceptList();
    this.data();
    // this.getCourseData(1,0);
    this.sidebar();
    this.username();
  }
  // username
  username() {
    this.user = sessionStorage.getItem('username');
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
  showshubmenu() {
    this.ismenuShow = !this.ismenuShow
  }

  showsubmenu() {
    this.ismenu = !this.ismenu
  }

  showsub() {
    this.ismenusub = !this.ismenusub
  }

  dashboardShow1() {
    this.dashboardShow = !this.dashboardShow
  }

  profileShow1() {
    this.profileShow = !this.profileShow
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
      //  console.log(this.sidebarData);
    })
  }

  // view page
  view(id) {
    this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { viewpage: id } });
  }

  data() {
    if (this.id) {
      this.getCourseData(1, 0);
    } else {
      this.getAcceptList(1, 0);
    }
  }
  //  get course api
  getCourseData(page = 1, i) {
    this.current_page = Number(page);
    const data = {
      user_id : sessionStorage.getItem('uid'),
      "course_id": this.id,
      "page": page
    }
    this.buttonColor = i;
    this.service.post('accept-student', data, 1).subscribe(res => {
      this.courseData = res.body.data;
      if (!this.courseData.length) {
        this.msgShow = "No Data Found"
      }
      if (res.body.data === 1 || res.body.data === 0) {
        this.buttonShow = false;
      } else {
        // this.mainpageLoder = true;
      }
      if (res.body.total === 1 || res.body.total === 0) {
        this.buttonShow = false;
      }
      this.totalPages = [];

      for (let i = 0; i < res.body.total; i++) {
        this.totalPages.push(i + 1);
      }
    })
  }

  // pagination
  direction(direction) {
    if (direction == 0) {
      if (this.current_page > 1) {
        this.current_page = this.current_page - 1
        this.getCourseData(this.current_page, 0);
      }

    } else {
      if (this.current_page < this.totalPages.length) {
        this.current_page = this.current_page + 1
        this.getCourseData(this.current_page, 0);
      }
    }
  }
  //  get course api
  getApprove(id, i) {
    const data = {
      "id": id,
      "status": "Accept"
    }
    this.service.post('accept-teacher', data, 1).subscribe(res => {
      this.getAcceptList(1, 0);
      if (res.body.message === 'success') {
        this.approved = true;
      }
    })
  }

  getReject(id) {
    const data = {
      "request_id": id,

    }
    this.service.post('reject_request', data, 1).subscribe(res => {
      this.getAcceptList(1, 0);
    })
  }

  // get list api

  getAcceptList(page = 1, i) {
    this.current_page = Number(page);
    const data = {
      page: page,
      user_id : sessionStorage.getItem('uid')
    }
    this.buttonColor = i;
    this.service.post('all-accept-student-listing', data, 1).subscribe(res => {
      this.courseData = res.body.data;
      this.buttonShow = false;
      if (!this.courseData.length) {
        this.msgShow = "No Data Found"
      }else if(res.message == 'No data Found'){
        this.msgShow = "No Data Found"
      }
      if (res.body.total === 1 || res.body.total === 0) {
        this.buttonShow = false;
      }
      this.totalPages = [];

      for (let i = 0; i < res.body.total; i++) {
        this.totalPages.push(i + 1);
      }
    })
  }
  //sidebar accordion
  toggleAccordian(event, index,name,id) {
     this.coursesName = sessionStorage.setItem('course_name',name)
     sessionStorage.setItem('course-id',id)
   this.router.navigate(['/teacherDashboard/editCourse'], { queryParams: { id: id } });
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
