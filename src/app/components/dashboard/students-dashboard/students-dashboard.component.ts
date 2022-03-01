import { Component, ElementRef, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { FrontService } from 'src/app/services/front.service';
import { ServiceService } from '../../service.service';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-students-dashboard',
  templateUrl: './students-dashboard.component.html',
  styleUrls: ['./students-dashboard.component.css']
})
export class StudentsDashboardComponent implements OnInit {
  @ViewChild('closeBtnText') closeBtnText
  @ViewChild('closeModal') private closeModal: ElementRef;
  term: string;
  courseDetail = [];
  feedbackData: any;
  Id: any;
  level: any;
  course: any;
  searchData: any;
  teacherData: any;
  ErrMsg: string;
  enrollID: any;
  enroll: any;
  mainpageLoder: boolean = true;
  errMsg: string;
  language: any;
  buttonColor: any;
  current_page = 1;
  totalPages: any[];
  buttonShow: boolean = true;
  emptyStars: any;
  durationTime: boolean = true;
  msgShow: string;
  sidebarData: any;
  subTitle: any;
  ismenuShow: boolean = false
  ismenu: boolean = false
  ismenusub: boolean = false
  profileShow: boolean = false
  dashboardShow: boolean = false;
  courseSubdata: any;
  submenu: any;
  subMenu = [];
  user: string;
  // mainpageLoders: boolean = false;
  mainpageLod: boolean = false;
  pages: number;
  index: any;
  coursesName: void;
  questionButton: boolean = false;
  questionButtons: boolean = false;
  amount: any;
  paymentUrl: string;
  images: string;
  searchDataBtn: boolean = false;
  currentItem = 'Television';
  private _frontService: FrontService;
  public get frontServices(): FrontService {
    if (this._frontService) {
      return this._frontService;
    }
    return (this._frontService = this.injector.get(FrontService));
  }
  constructor(private service: ServiceService, private router: Router,
    private injector: Injector,
    private authService: SocialAuthService) {
    this.images = localStorage.getItem('image')
  }
  ngOnInit(): void {
    this.studentCourseDetail(1, 0);
    this.levelData();
    this.courseData();
    this.getTeacher();
    this.languageData();
    this.username();
    if (this.images == "") {
      this.images = 'assets/images/student-profile.jpg';
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login'])
    // this.signOut();
  }

  // username
  username() {
    this.user = sessionStorage.getItem('username');
  }
  // view page
  view(id) {
    this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { viewpage: id } });
  }
  //  view detail id
  viewDetail(id) {
    this.router.navigate(['/dashboard/course_detail_unpaid'], { queryParams: { id: id } });
  }

  // feedback form
  feedbackForm = new FormGroup({
    message: new FormControl('',)
  })

  // get id for feedback
  feedbackId(feedbackId) {
    this.Id = feedbackId
  }


  // get level data
  levelData() {
    const data = {
      "name": "level"
    }
    this.service.post('get-category', data, 1).subscribe(res => {
      this.level = res.body.result;
    })
  }

  // get course dropdown data
  courseData() {
    const data = {
      "name": "course_language"
    }
    this.service.post('get-category', data, 1).subscribe(res => {
      this.course = res.body.result;
    })
  }
  // student course details api
  studentCourseDetail(page = 1, i) {
    this.buttonShow = true;
    this.searchDataBtn = false
    window.scrollTo(0, 0)
    this.pages = page
    this.index = i
    this.current_page = Number(page);
    const data = {
      "id": "1",
      "page": page,
      user_id: sessionStorage.getItem('uid')
    }
    this.buttonColor = i;
    this.service.post('get-course', data, 1).subscribe(res => {
      this.courseDetail = res.body.data;
      this.mainpageLoder = false
      if (i == 1) {
        this.questionButton = true;
      } else if (i == 0) {
        this.questionButton = false;
        this.questionButtons = false
      }
      if (i + 1 == res.body.total_course) {
        this.questionButtons = true
        this.questionButton = true;
      } else if (i = !res.body.total_course) {
        this.questionButtons = false
      }
      if (res.body.total_course === 1 || res.body.total_course === 0 || res.body.data[0].message == 'No Data Found') {
        this.buttonShow = false;
      }
      if (res.body.data) {
        this.mainpageLoder = false;
      }
      this.totalPages = [];
      for (let i = 0; i < res.body.total_course; i++) {
        this.totalPages.push(i + 1);
      }
    })
  }

  direction(direction, i) {
    window.scrollTo(0, 0)
    if (direction == 0) {
      if (this.current_page != 1) {
        var data = this.current_page - 1
        this.studentCourseDetail(data, data - 1)
      }
    } else {
      var data = this.current_page + 1
      this.studentCourseDetail(data, data - 1)
    }
  }

  // validate search form
  searchForm = new FormGroup({
    teacherLanguage: new FormControl('',),
    courseLanguage: new FormControl('',),
    course: new FormControl('',),
    teacher: new FormControl('',),
    level: new FormControl('',),
    rating: new FormControl('',)
  })

  searchform = new FormGroup({
    searchData: new FormControl('')
  })
  resets() {
    this.searchform.reset();
    this.searchForm.reset();
    this.errMsg = ''
    this.studentCourseDetail(this.pages, this.index)
  }
  searchDatas() {
    this.mainpageLoder = true;
    const data =
    {
      "name": this.searchform.value.searchData,
      "teaching_language": '',
      "course_language": '',
      "teacher_id": '',
      "level_id": '',
      "rating": '',
      "page": this.pages,
    }
    // this.buttonColor = i;
    this.service.post('course-filter', data, 1).subscribe(res => {
      this.mainpageLoder = false;
      this.searchDataBtn = true
      this.courseDetail = res.body.data;
      this.totalPages = [];
      for (let i = 0; i < res.body.total_course; i++) {
        this.totalPages.push(i + 1);
      }
      if (res.body.total_course === 1 || res.body.total_course === 0 || res.body.data[0].message == 'No Data Found') {
        this.buttonShow = false;
      }
      if (res.body.data[0].message == 'No Data Found') {
        this.errMsg = 'No Data Found'
      } else {
        this.errMsg = ''
      }
    })
  }
  // search filter api
  search() {
    this.mainpageLoder = true;
    const data =
    {
      "name": this.searchForm.value.course,
      "teaching_language": this.searchForm.value.teacherLanguage,
      "course_language": this.searchForm.value.courseLanguage,
      "teacher_id": this.searchForm.value.teacher,
      "level_id": this.searchForm.value.level,
      "rating": this.searchForm.value.rating,
      "page": 1,
    }
    // this.buttonColor = i;
    this.service.post('course-filter', data, 1).subscribe(res => {
      this.mainpageLoder = false;
      this.searchDataBtn = true
      this.courseDetail = res.body.data;
      this.totalPages = [];
      for (let i = 0; i < res.body.total_course; i++) {
        this.totalPages.push(i + 1);
      }
      if (res.body.total_course === 1 || res.body.total_course === 0 || res.body.data[0].message == 'No Data Found') {
        this.buttonShow = false;
      }
      if (res.body.data[0].message == 'No Data Found') {
        this.errMsg = 'No Data Found'
      } else {
        this.errMsg = ''
      }

    })
  }
  //  get teacher list api
  getTeacher() {
    const data = {
      "id": "1",
      user_id: sessionStorage.getItem('uid')
    }
    this.service.post('get-teacher', data, 1).subscribe(res => {
      this.teacherData = res.body.data;
      if (res.message === 'No Data Found') {
        this.ErrMsg = 'No Data Found'
      }
    })
  }

  // enroll api

  enrollId(data, i) {
    debugger;
    this.msgShow = ''
    this.enrollID = data
    this.enroll = data.id
    localStorage.setItem('enrollId', this.enroll)
    localStorage.setItem('course_name', data.title)
    if (data.field_course_fees == 'Free' || data.field_course_fees == 'free' || data.field_course_fees == '50 cent') {
     // this.submitEnrolls(this.amount)
      this.router.navigateByUrl('/thank-you?url=' + this.enroll);
    } else {
      this.router.navigate(['/dashboard/payment'], { queryParams: { url: this.enroll, id: data.id } })
    }
    
  }

  submitEnroll() {
    $('#enroll').hide();
    // this.tansationApi();
    setTimeout(() => {
      jQuery('#summary').modal('show');
    }, 1);
  }

  submitEnrolls(amount) {
    this.mainpageLod = true;
    this.amount = amount
    const data = {
      "course_id": this.enroll,
      "user_id": sessionStorage.getItem('uid')
    }
    this.service.post('course-enroll', data, 1).subscribe(res => {
      if (res.body.message === 'You Are Already Enroll This Course.') {
        this.msgShow = "You Are Already Enroll This Course"
        this.mainpageLod = false;
      }
      if (res.body.message === "success") {
        this.frontServices.vm.sidebarData =null
        this.mainpageLod = false;
        $('#enroll').hide();
        setTimeout(() => {
          jQuery('#summary').modal('show');
        }, 1);
      }
    }
    )
  }


  // submit on summary page
  confirmPayment() {
    this.router.navigate(['/dashboard/payment'], { queryParams: { url: this.enroll } })
  }

  confirmPayments() {
    this.router.navigate(['/dashboard/wallet']);
  }

  // language api
  languageData() {
    this.service.get('profile-dropdown', 1).subscribe(res => {
      this.language = res.body.language_listing
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
  getChildData(child) {
    sessionStorage.setItem('subId', child);
    this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { id: sessionStorage.getItem('subId') } });
  }
  courseDetails(id) {
    const data = {
      course_id: id
    }
    this.service.post('course-details', data, 1).subscribe(res => {
      this.courseSubdata = res.body.result.subdata;
    })
  }
  // close summary modal
  closeMenu() {
    this.closeModal.nativeElement.click();
  }

}
