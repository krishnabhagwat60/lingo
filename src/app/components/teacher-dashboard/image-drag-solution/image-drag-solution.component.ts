import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import {Location} from '@angular/common';
import { FrontService } from 'src/app/services/front.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image-drag-solution',
  templateUrl: './image-drag-solution.component.html',
  styleUrls: ['./image-drag-solution.component.css']
})
export class ImageDragSolutionComponent implements OnInit {
  imageDrag: any;
  id: string;
  sidebarData: any;
  imagesDrag: boolean = false;
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
  subscription: Subscription;
  private _frontService: FrontService;
  public get frontServices(): FrontService {
    if (this._frontService) {
      return this._frontService;
    }
    return (this._frontService = this.injector.get(FrontService));
  }
  constructor(private service: ServiceService, private eventEmitterService: EventEmitterService,private route: ActivatedRoute,private router: Router,private _location: Location,  private injector: Injector) { 
    this.route.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");
      this.titleid = queryParams.get("titleid")

    })
    this.courseNameData= sessionStorage.getItem('course_name')
    if (this.subscription == undefined) {
      this.subscription = this.eventEmitterService.
        invokeMenuList.subscribe(() => {
          
          this.frontServices.vm.courseChanged = false;
          this.studentSideBar();
        });
    }
  }

  ngOnInit( ): void {
    this.affiliationList();
    this.sidebar();
    this.getImageDrag();
    this.courseName();
    this.titleName();
    this.authenticateName();
    this.studentSideBar();
  }

  gotoBack(){
    this.router.navigateByUrl('/multimedia/contentStyle')
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
  getChildData(child) {
    sessionStorage.setItem('subId', child);
    this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { id: sessionStorage.getItem('subId') } });
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
    // get image drag and drop
    getImageDrag() {
      const data = {
        "title_id":this.titleid
      }
      this.service.post('image-dragdrop-get', data, 1).subscribe(res => {
        this.imageDrag = res.body.result.data;
        if (res.body.result) {
          this.imagesDrag = true;
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
  // get multimedia data api
  affiliationList() {
    const data = {
      "subtitle_id": this.id 
    }
    this.service.post('allexercises-get', data, 1).subscribe(res => {
      this.imageDrag = res.body.result[0];

    })
  }
  courseName() {
    this.courseNameData = sessionStorage.getItem('course_name')
  }
  titleName(){
    this.title = sessionStorage.getItem('image_title')
  }
    //sidebar accordion
    toggleAccordian(event, index,name,id) {
      this.coursesName = localStorage.setItem('coursename',name)
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
}
