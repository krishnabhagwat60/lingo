import { Component, Injector, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import { Location } from '@angular/common';
import { FrontService } from 'src/app/services/front.service';

@Component({
  selector: 'app-fill-the-result',
  templateUrl: './fill-the-result.component.html',
  styleUrls: ['./fill-the-result.component.css']
})
export class FillTheResultComponent implements OnInit {
  sidebarData: any;
  id: any;
  fillTheBlanksData: any;
  arrayLength: number;
  replaceData: any;
  fillValue: any;
  fillArr: any;
  fillData: any;
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
  private _frontService: FrontService;
  public get frontServices(): FrontService {
    if (this._frontService) {
      return this._frontService;
    }
    return (this._frontService = this.injector.get(FrontService));
  }

  constructor(private service: ServiceService, private router: ActivatedRoute,
    private _sanitizer: DomSanitizer, private route: Router, private _location: Location,  private injector: Injector) {
    this.router.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");
      this.titleid = queryParams.get("titleid")
    })
    this.courseNameData = sessionStorage.getItem('course_name')
  }

  ngOnInit(): void {
    this.sidebar();
    this.sub();
    this.courseName();
    this.titleName();
    this.authenticateName();
    this.studentSideBar();
  }

  studentSideBar() {
    const data = {
      user_id: sessionStorage.getItem('uid')
    }
    this.service.post('student_sidebar', data, 1).subscribe(res => {
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
  toggleAccordian2(event, index, name) {
    this.coursesName = localStorage.setItem('coursename', name)
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

  getChildData(child) {
    sessionStorage.setItem('subId', child);
    this.route.navigate(['/teacherDashboard/student-view'], { queryParams: { id: sessionStorage.getItem('subId') } });
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
  authenticateName() {
    this.authenticate = sessionStorage.getItem('student')
    if (this.authenticate) {
      this.courses = true;
    }
  }
  // sidebar api
  sidebar() {
    const data = {
      user_id: sessionStorage.getItem('uid')
    }
    this.service.post('teacher_sidebar', data, 1).subscribe(res => {
      this.sidebarData = res.body.result;
      //  console.log(this.sidebarData);
    })
  }
  sub() {
    const data1 = {
      title_data: JSON.parse(sessionStorage.getItem('fill_data')),
      type: "fill_in_the_blank"
    }
    this.service.post('show_result', data1, 1).subscribe(res => {
      this.fillData = res.body.result.data;
      this.totalQuestion = res.body.result.total_question
      this.totalRightAnswer = res.body.result.total_right_answer
      this.fillData.forEach((element, index) => {
        if (element.question.includes('*')) {
          element.question = this.findStarWord(element.question, element.value);
        }
      });
    })
  }


  findStarWord(word1, answers) {
    const regexp = /\*(.*?)\*/gm;
    const array = [...word1.matchAll(regexp)];
    this.arrayLength = array.length
    for (let i = 0; i < answers.length; i++) {
      const regexp1 = /\*(.*?)\*/;
      const array1 = [...word1.match(regexp1)];
      var rightAnswer = answers[i]
      var userAnswer = array1[array1.length - 1]
      var newData = userAnswer.split("/")
      if (newData.length > 0) {
        var isAnswerFound = false;
        for (let i = 0; i < newData.length; i++) {
          var element = newData[i].toLowerCase();
          if (element == rightAnswer) {
            isAnswerFound = true;
            // rightAnswer = element
            break;
          }
        }
        var tag = ''
        // <span class="input" role="textbox" contenteditable = false/>rightAnswer</span>
        if (isAnswerFound) {
          tag = '<span class="fib" role="textbox" contenteditable = false/> ' + rightAnswer + '<i class="fa fa-check" style="margin-top: 10px; color: #18af14;"></i>' + '</span>'
        } else {
          tag = '<span class="fib" role="textbox" contenteditable = false/>' + rightAnswer + '<i class="fa fa-times" style="margin-top: 10px; color: red;"></i>' + '</span>'

        }
      } else {
        var tag = ''
        if (userAnswer === rightAnswer) {
          tag = '<span class="fib" role="textbox" contenteditable = false/> ' + rightAnswer + '<i class="fa fa-check" style="margin-top: 10px; color: #18af14;"></i>' + '</span>'
        } else {
          tag = '<span class="fib" role="textbox" contenteditable = false/>' + rightAnswer + '<i class="fa fa-times" style="margin-top: 10px; color: red;"></i>' + '</span>'

        }
      }
      this.replaceData = word1.replace(/\*(.*?)\*/, tag)
      word1 = this.replaceData;
    }
    return this._sanitizer.bypassSecurityTrustHtml(this.replaceData);
  }
  retry() {
    this.route.navigate(['/teacherDashboard/student-view'], { queryParams: { id: this.id } });
  }
  courseName() {
    this.courseNameData = sessionStorage.getItem('course_name')
  }
  titleName() {
    this.title = sessionStorage.getItem('fill_title')
  }
  //sidebar accordion
  toggleAccordian(event, index, id) {
    const element = event.target;
    this.route.navigate(['/teacherDashboard/editCourse'], { queryParams: { id: id } });
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
  goToQuestion() {

    this.route.navigate(['/teacherDashboard/fillWordSolution'], { queryParams: { titleid: this.titleid } });

  }
  gotoBack() {
    this._location.back();
  }
}
