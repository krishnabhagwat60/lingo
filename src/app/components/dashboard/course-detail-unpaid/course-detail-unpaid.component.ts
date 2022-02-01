import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../service.service';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-course-detail-unpaid',
  templateUrl: './course-detail-unpaid.component.html',
  styleUrls: ['./course-detail-unpaid.component.css']
})
export class CourseDetailUnpaidComponent implements OnInit {
  courseData: any;
  courseSubdata: any;
  id: any;
  enrollID: any;
  enroll: any;
  courseId: any;
  msgShow: string;
  sidebarData: any;
  courseid: void;
  name: void;
  rating: void;
  subTitle: any;
  ismenuShow: boolean = false;
  ismenu: boolean = false;
  ismenusub: boolean = false;
  dashboardShow: boolean = false;
  profileShow: boolean = false;
  user: string;
  mainpageLod: boolean = false;
  mainpageLoders: boolean = true;
  coursesName: void;
  courseFaqdata: any;
  fqButton: boolean;
  paymentUrl: any;
  amount: any;
  constructor(private service: ServiceService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router) {
    this.route.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");
    })
  }

  ngOnInit(): void {
    this.courseDetail();
    this.username();
  }
  // username
  username() {
    this.user = sessionStorage.getItem('username');
  }

  // view page
  view(id) {
    this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { viewpage: id } });
  }
  // course detail api
  courseDetail() {
    const data = {
      course_id: this.id,
      user_id: sessionStorage.getItem('uid')
    }
    this.service.post('course-details', data, 1).subscribe(res => {
      this.mainpageLoders = false;
      this.courseData = res.body.result;
      this.courseid = sessionStorage.setItem('course_id', res.body.result.course_id)
      this.name = sessionStorage.setItem('teacher_name', res.body.result.teacher_name)
      this.rating = sessionStorage.setItem('rating', res.body.result.rating)
      this.courseId = res.body.result.course_id;
      this.courseSubdata = res.body.result.subdata;
      this.courseFaqdata = res.body.result.faq;
      if (this.courseFaqdata == '' || this.courseFaqdata == null || this.courseFaqdata == undefined) {
        this.fqButton = false
      } else {
        this.fqButton = true
      }
    })
  }
  getHtml(url) {
    if (url.includes('<figure')) {
      var split = url.split('<figure')
      var prefix = ''
      var suffix = ''
      if (split.length > 0) {
        var removeLink = split[split.length - 1].split('</figure>')
        prefix = split[0]
        if (removeLink.length > 0) {
          suffix = removeLink[removeLink.length - 1]
        }
      }
      var iframeStart = '<iframe' + url.split('<iframe')[1];
      var finalIframe = iframeStart.split('</iframe>')[0] + '</iframe>';
      finalIframe = finalIframe.replace('position: absolute', '');
      finalIframe = prefix + finalIframe + suffix
      return this.sanitizer.bypassSecurityTrustHtml(
        finalIframe.replace(/\\"/g, '"')
      );
    } else {
      return this.sanitizer.bypassSecurityTrustHtml(
        url.replace(/\\"/g, '"')
      );
    }
  }
  //enroll api
  enrollId(data) {
    this.enrollID = this.courseData;
    this.enroll = data.course_id;
    localStorage.setItem('enrollId', this.enroll)
    localStorage.setItem('course_name', data.title)
    if (data.field_course_fees == 'Free' || data.field_course_fees == 'free' || data.field_course_fees == '50 cent') {
      this.submitEnrolls(this.amount)
      this.router.navigate(['/dashboard/wallet']);
    } else {
      this.router.navigate(['/dashboard/payment'], { queryParams: { url: this.enroll, id: data.course_id } })
    }
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
    }
    )
  }
  submitEnroll() {
    $('#enroll').hide();
    this.tansationApi();
    setTimeout(() => {
      jQuery('#summary').modal('show');
    }, 1);
  }

  // paypal api
  tansationApi() {
    const data = {
      course_id: this.enroll,
      token: localStorage.getItem('paypalToken'),
      type: '1'
    }
    this.service.post('paypal_api', data, 1).subscribe(result => {
      this.paymentUrl = result.body.result[1].href
      localStorage.setItem('paymentsUrl', result.body.order_id)
    })
  }
  // submit on summary page
  confirmPayment() {
    this.router.navigate(['/dashboard/payment'], { queryParams: { url: this.enroll } })

  }

  confirmPayments() {
    this.router.navigate(['/dashboard/wallet']);
  }
}
