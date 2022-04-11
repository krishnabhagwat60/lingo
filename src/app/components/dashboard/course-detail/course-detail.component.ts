import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../service.service';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  @Input() rating: number;
  @Input() itemId: number;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('closeFeedback') closeFeedback;
  id: any;
  courseData: any;
  courseSubdata: any;
  enrollID: any;
  enroll: any;
  courseId: any;
  sidebarData: any;
  courseid: void;
  name: void;
  ratings: void;
  showmsg: string;
  inputName: string;
  msgShow: string;
  subTitle: any;
  ismenuShow: boolean = false;
  ismenu: boolean = false;
  ismenusub: boolean = false;
  dashboardShow: boolean = false;
  profileShow: boolean = false;
  user: string;
  coursesName: void;
  courseFaqdata: any;
  courseDesData: any;
  fqButton: boolean;
  feedbackId: any;
  expandedIndex:number;
  expandedIndexTitle:number;
  constructor(private service: ServiceService, private sanitizer: DomSanitizer,
    private route: ActivatedRoute, private router: Router) {
    this.route.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");
    })
  }

  ngOnInit(): void {
    this.inputName = this.itemId + '_rating';
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
  toggleShow(index) {
    this.expandedIndex = index === this.expandedIndex ? -1 : index;
  }
  toggleShowTitle(index){
    this.expandedIndexTitle = index === this.expandedIndexTitle ? -1 : index;
  }
  //  course detail api
  courseDetail() {
    const data = {
      course_id: this.id,
      user_id: sessionStorage.getItem('uid')
    }
    this.service.post('course-details', data, 1).subscribe(res => {
      this.courseData = res.body.result;
      this.ratings = sessionStorage.setItem('rating', res.body.result.rating)
      this.courseSubdata = res.body.result.subdata;
      this.courseFaqdata = res.body.result.faq;
      this.courseId = res.body.result.course_id;
      if (this.courseFaqdata == '' || this.courseFaqdata == null || this.courseFaqdata == undefined) {
        this.fqButton = false
      } else {
        this.fqButton = true
      }
    })
  }
  enrollId(data) {
    this.enrollID = this.courseData;
    this.enroll = data.course_id
    this.enrollID = this.courseData;
    // this.enroll = data.id
    localStorage.setItem('enrollId', this.enroll)
    localStorage.setItem('course_name', data.title)
    if (data.field_course_fees == 'Free' || data.field_course_fees == 'free' || data.field_course_fees == '50 cent') {
      this.submitEnroll()
      this.router.navigate(['/dashboard/wallet']);
    }
    else {
      this.router.navigate(['/dashboard/payment'], { queryParams: { url: this.enroll, id: data.course_id } })
    }
  }

  submitEnroll() {
    const data = {
      "course_id": this.enroll,
      user_id: sessionStorage.getItem('uid')
    }
    this.service.post('course-enroll', data, 1).subscribe(res => {
      if (res.body.message === 'You Are Already Enroll This Course.') {
        this.msgShow = "You Are Already Enroll This Course"
      }
    })
  }

  // submit on summay page
  confirmPayments() {
    jQuery('#summary').modal('hide');
    setTimeout(() => {
      this.router.navigate(['/dashboard/wallet']);
    }, 1000);
  }
  feedBackForm = new FormGroup({
    feedback: new FormControl('')
  })

  getFeedbackId(id) {
    this.feedbackId = id
  }
  feedbackData() {
    const data = {
      "course_id": this.feedbackId,
      "rating": this.rating,
      "message": this.feedBackForm.value.feedback,
      user_id: sessionStorage.getItem('uid')
    }
    this.service.post('add-feedback', data, 1).subscribe(res => {
      if (res.body.meaasge === 'Your Are Already Gived Feedback For This Course') {
        this.showmsg = 'You Are Already Given Feedback For This Course'
      }
      // if(res.body.result.message === 'success'){}
      else {
        this.closeFeedback.nativeElement.click();
        this.feedBackForm.reset();
        this.courseDetail();
      }
    })
  }
  onClick(rating: number): void {
    this.rating = rating;
    this.ratingClick.emit({
      itemId: this.itemId,
      rating: rating
    });
  }
  clearData() {
    this.feedBackForm.reset();

  }
}
