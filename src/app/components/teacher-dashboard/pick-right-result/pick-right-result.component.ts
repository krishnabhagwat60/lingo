import { Component, Injector, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import {Location} from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { FrontService } from 'src/app/services/front.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-pick-right-result',
  templateUrl: './pick-right-result.component.html',
  styleUrls: ['./pick-right-result.component.css']
})
export class PickRightResultComponent implements OnInit {
  sidebarData: any;
  id: string;
  questionDropDown: any;
  pickData: any;
  totalQuestion: any;
  totalRightAnswer: any;
  arrayLength: number;
  replaceData: any;
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
  constructor(private service: ServiceService,private eventEmitterService: EventEmitterService,private route: ActivatedRoute,private _sanitizer: DomSanitizer,private router: Router,private _location: Location,  private injector: Injector) { 
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
    this.showPickData();
    this.courseName();
    this.titleName();
    this.authenticateName();
    this.studentSideBar();
  }

  gotoBack(){
    this.router.navigateByUrl(this.frontServices.navigation.url);
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
  showPickData() { 
    const data1 = {
      title_data: JSON.parse(sessionStorage.getItem('pick_data')),
      type: "pick_up_word"
    }
    this.service.post('show_result', data1, 1).subscribe(res => {
      this.pickData  = res.body.result.data;
     
      this.totalQuestion = res.body.result.total_question
      this.totalRightAnswer = res.body.result.total_right_answer
      this.pickData.forEach((element, index) => {
          element.question = this.findStarWord(element.question,element.value);
      });
    })
  }
  findStarWord(word1,answers) {
    const regexp = /\*([\w\s]+)\*/g;
    const array = [...word1.matchAll(regexp)];
    for( let i = 0; i< array.length; i++){
     var tag =  '<span class="fib" role="textbox" contenteditable = false/> ' + array[i][1] + '<i class="fa fa-check" style="margin-top: 10px; color: #18af14;"></i>' + '</span>'
      // var tag =  '<input type="text" class="answer" value="' + array[i][1] + '"' + ' disabled/><i class="fa fa-check" style="margin-left: -30px;margin-top: 10px; color: #18af14;"></i>'
      this.replaceData = word1.replace(/\*([\w\s]+)\*/, tag)
      word1 = this.replaceData;
    }
    const regexp1 = /\#([\w\s]+)\#/g;
    const array1 = [...word1.matchAll(regexp1)];
    for( let i = 0; i< array1.length; i++){
      var tag = '<span class="fib" role="textbox"  contenteditable = false/> ' + array1[i][1] + '<i class="fa fa-times" style="margin-top: 10px; color: red;"></i>' + '</span>'
      // var tag ='<input type="text" class="answer" value="' + array1[i][1] + '"' + ' disabled/><i class="fa fa-times" style="margin-left: -30px;margin-top: 10px; color: red;"></i>'
      this.replaceData = word1.replace(/\#([\w\s]+)\#/, tag)
      word1 = this.replaceData;
    }
    return this._sanitizer.bypassSecurityTrustHtml(this.replaceData);
  }
  findStarWords(word1,answers) {
    const regexp = /\*([\w\s]+)\*/g;
    const array = [...word1.matchAll(regexp)];
    this.arrayLength = array.length
    for (let i = 0; i < array.length; i++) {
      var tag = ''
         const regexp1 = /\*([\w\s]+)\*/;
         const array1 = [...word1.match(regexp1)];
        var userAnswer =  array1[array1.length -1]
        tag = '<span class="fib" role="textbox" contenteditable = false/> ' + userAnswer + '<i class="fa fa-check" style="margin-top: 10px; color: #18af14;"></i>' + '</span>'
          // tag ='<input type="text" class="answer" value="' + userAnswer + '"' + ' disabled/ style="margin:0px 15px 0px 10px; background-color:#fff!important; height:35px;"><i class="fa fa-check" style="margin-left: -30px;margin-top: 10px; color: #18af14;"></i>'
        this.replaceData = word1.replace(/\*([\w\s]+)\*/, tag)
      }
      const regexp2 = /\#([\w\s]+)\#/;
      if(word1.match(regexp2) != null){
        const array2 = [...word1.match(regexp2)];
        for (let i = 0; i < array2.length; i++) {
          var tag = ''
             const regexp1 = /\*([\w\s]+)\*/;
             const array1 = [...word1.matchAll(regexp1)];
            var userAnswer =  array1[array1.length -1]
        tag = '<span class="fib" role="textbox" contenteditable = false/> ' + userAnswer + '<i class="fa fa-times" style="margin-top: 10px; color: red;"></i>' + '</span>'

              // tag ='<input type="text" class="answer" value="' + userAnswer + '"' + ' disabled/ style="margin:0px 15px 0px 10px; background-color:#fff!important; height:35px;"><i class="fa fa-times" style="margin-left: -30px;margin-top: 10px; color: #18af14;"></i>'
               this.replaceData = word1.replace(/\#([\w\s]+)\#/, tag)
        }
      }
    
    return this._sanitizer.bypassSecurityTrustHtml(this.replaceData);
  }

  courseName() {
    this.courseNameData = sessionStorage.getItem('course_name')
  }
  titleName(){
    this.title = sessionStorage.getItem('pick_title')
  }
  retry(){
    this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { id: this.id } });
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
    goToQuestion(){
      this.router.navigate(['/teacherDashboard/pickTheWordSolution'], { queryParams: { titleid: this.titleid } });
    }
}
