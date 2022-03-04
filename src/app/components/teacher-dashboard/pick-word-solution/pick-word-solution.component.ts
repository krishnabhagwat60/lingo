import { Component, Injector, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import {Location} from '@angular/common';
import { FrontService } from 'src/app/services/front.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-pick-word-solution',
  templateUrl: './pick-word-solution.component.html',
  styleUrls: ['./pick-word-solution.component.css']
})
export class PickWordSolutionComponent implements OnInit {
  fillData: any;
  totalQuestion: any;
  totalRightAnswer: any;
  replaceData: any;
  arrayLength: number;
  sidebarData: any;
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
  user: string;
  coursesName: void;
  titleid: any;
  subscription: Subscription;
  private _frontService: FrontService;
  public get frontServices(): FrontService {
    if (this._frontService) {
      return this._frontService;
    }
    return (this._frontService = this.injector.get(FrontService));
  }
  constructor(private service: ServiceService,private eventEmitterService: EventEmitterService,private route:ActivatedRoute,private _sanitizer: DomSanitizer,private router: Router,private _location: Location,  private injector: Injector) {
    this.courseNameData= sessionStorage.getItem('course_name')
    this.route.queryParamMap.subscribe(queryParams => {
      this.titleid = queryParams.get("titleid")
    })
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
    this.editFillBlanks();
    this.courseName();
    this.titleName();
    this.authenticateName();
    this.studentSideBar();
    this.username();
  }

  gotoBack(){
    this._location.back();
  }
  username(){
    this.user = sessionStorage.getItem('username');
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
  
  // sub() {
  //   const data1 = {
  //     title_data: JSON.parse(sessionStorage.getItem('pick_data')),
  //     type: "pick_up_word"
  //   }
  //   this.service.post('show_result', data1, 1).subscribe(res => { 
  //     this.fillData  = res.body.result.data;
  //       this.totalQuestion = res.body.result.total_question
  //       this.totalRightAnswer = res.body.result.total_right_answer 
  //       this.fillData.forEach((element, index) => {
  //         if (element.question.includes('*')) {
  //           element.question = this.findStarWord(element.question,index);
  //         }
  //       });
  //   })
  // }

  findStarWord(word1, index) {
    const regexp = /\*(.*?)\*/gm;
    const array = [...word1.matchAll(regexp)];
    this.arrayLength = array.length
    for (let i = 0; i < index.length; i++) {
      const regexp1 = /\*(.*?)\*/;
      const array1 = [...word1.match(regexp1)];
      var rightAnswer = index[i]
      var userAnswer =  array1[array1.length -1]
      var tag = ''
      tag = '<span class="fib" role="textbox" contenteditable = false/> ' + rightAnswer + '' + '<i class="fa fa-check" style="margin-top: 10px; color: #18af14;"></i>' + '</span>'
      // tag ='<input type="text" class="answer" value="' + rightAnswer + '"' + ' disabled/><i class="fa fa-check" style="margin-left: -30px;margin-top: 10px; color: #18af14;"></i>'
      this.replaceData = word1.replace(/\*(.*?)\*/, tag)
      word1 = this.replaceData;
    }
    return this._sanitizer.bypassSecurityTrustHtml(this.replaceData);
  }
courseName() {
  this.courseNameData = sessionStorage.getItem('course_name')
}
titleName(){
  this.title = sessionStorage.getItem('pick_title')
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

  editFillBlanks() {
    debugger
    // this.resetPickModalData();
    const data = {
      // "subtitle_id": localStorage.getItem('subId')
      p_id: this.titleid,
      "type": "pick_up_word"
    }
    this.service.post('paragraph-get', data, 1).subscribe(res => {
      this.fillData  = res.body.result.pick_up_right_word;
      this.totalQuestion = res.body.result.total_question
      this.totalRightAnswer = res.body.result.total_right_answer 
      this.fillData.forEach((element, index) => {
        if (element.question.includes('*')) {
          element.question = this.findStarWord(element.question,element.right_answer);
        }
      });
  })
  }
}
