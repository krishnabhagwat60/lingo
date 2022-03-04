import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import {Location} from '@angular/common';
import { FrontService } from 'src/app/services/front.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-solution-affiliation',
  templateUrl: './solution-affiliation.component.html',
  styleUrls: ['./solution-affiliation.component.css']
})
export class SolutionAffiliationComponent implements OnInit {
  sidebarData: any;
  id: string;
  affiliationData: any;
  totalQuestion: any;
  totalRightAnswer: any;
  courseNameData: string;
  title: string;
  affiData: any;
  affiliation: boolean = false;
  profileShow: boolean = false;
  dashboardShow: boolean = false;
  ismenusub: boolean = false;
  ismenu: boolean = false;
  ismenuShow: boolean = false;
  subTitle: any;
  authenticate: string;
  courses: boolean = false;
  sidebarData2: any;
  titleid: string;
  subscription: Subscription;
  private _frontService: FrontService;
  public get frontServices(): FrontService {
    if (this._frontService) {
      return this._frontService;
    }
    return (this._frontService = this.injector.get(FrontService));
  }
  constructor(private service: ServiceService,private eventEmitterService: EventEmitterService,private route: ActivatedRoute,private router: Router,private _location: Location,  private injector: Injector) { 
    this.route.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");
      this.titleid = queryParams.get("titleid")
    })
    this.courseNameData= sessionStorage.getItem('course_name')
    if (this.subscription == undefined) {
      this.subscription = this.eventEmitterService.
        invokeMenuList.subscribe(() => {
          debugger
          this.frontServices.vm.courseChanged = false;
          this.studentSideBar();
        });
    }
  }

  ngOnInit(): void {
    this.sidebar();
    this.showAffiliationData();
    this.courseName();
    this.titleName();
    this.get();
    this.authenticateName();
    this.studentSideBar();
  }

  studentSideBar() {
    const data={
      user_id:sessionStorage.getItem('uid')
    }
    this.service.post('student_sidebar',data, 1).subscribe(res => {
      this.sidebarData2 = res.body.result;
      if (this.sidebarData2 != null && this.sidebarData2.length > 0) {
        var filteredData = this.unique(this.sidebarData2, ['course_id']);
        this.sidebarData2 = filteredData;
        this.frontServices.vm.sidebarData = this.sidebarData2;
      }
    })
  }
  unique(arr, keyProps) {
    return Object.values(
      arr.reduce((uniqueMap, entry) => {
        const key = keyProps.map((k) => entry[k]).join('|');
        if (!(key in uniqueMap)) uniqueMap[key] = entry;
        return uniqueMap;
      }, {})
    );
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
  showshubmenu(){
    this.ismenuShow=!this.ismenuShow
  }
  getChildData(child) {
    sessionStorage.setItem('subId', child);
    this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { id: sessionStorage.getItem('subId') } });
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
      this.affiliationData.remove()
      
    }
    courseName() {
      this.courseNameData = sessionStorage.getItem('course_name')
    }
    titleName(){
      this.title = sessionStorage.getItem('title')
    }
    get() {
      const data = {
        "title_id": this.titleid
      }
      this.service.post('exercises-get', data, 1).subscribe(res => {
        this.affiData = res.body.result
        if (this.affiData) {
          this.affiliation = true;
        }
      })
    }
  //sidebar accordion
  toggleAccordian(event, index,id) {
   this.router.navigate(['/teacherDashboard/editCourse'], { queryParams: { id: id } });
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
    this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { id: sessionStorage.getItem('subId') } });
  }
  gotoBack(){
    debugger
    this.router.navigate(['/multimedia/contentStyle']);
  }
}
