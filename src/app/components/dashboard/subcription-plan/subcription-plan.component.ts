import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiceService } from '../../service.service';
declare var jQuery: any;
import $ from 'jquery';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-subcription-plan',
  templateUrl: './subcription-plan.component.html',
  styleUrls: ['./subcription-plan.component.css'],
})
export class SubcriptionPlanComponent implements OnInit {
  subscriptionData: any;
  enrollID: any;
  enroll: any;
  mainpageLoder: boolean = true;
  buttonColor: any;
  current_page = 1;
  totalPages: any[];
  errMsg: string;
  buttonShow: boolean = true;
  sidebarData: any;
  subTitle: any;
  ismenuShow: boolean = false;
  ismenu: boolean = false;
  ismenusub: boolean = false;
  dashboardShow: boolean = false;
  profileShow: boolean = false;
  button: boolean = false;
  user: string;
  coursesName: void;
  newdate: string;
  butn: boolean = false;
  timestamp: number;
  amount: any;
  constructor(
    private service: ServiceService,
    private router: Router,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getSubscription(1, 0);
    this.username();
    const current = new Date();
    this.timestamp = current.getTime();
  }
  // username
  username() {
    this.user = sessionStorage.getItem('username');
  }

  // view page
  view(id) {
    this.router.navigate(['/teacherDashboard/student-view'], {
      queryParams: { viewpage: id },
    });
  }

  // get subscription plan api
  getSubscription(page = 1, i) {
    const data = {
      page: page,
      user_id: sessionStorage.getItem('uid'),
    };
    this.service.post('Student-plan', data, 1).subscribe((res) => {
      this.subscriptionData = res.body.result;
      if (res.body.result) {
        if (res.body.total_plan === 1 || res.body.total_plan === 0) {
          this.buttonShow = false;
        }
        if (res.body.result.course_fee == 'Free') {
          $('re-sub').disabled();
        }
        if (this.subscriptionData.length === 0) {
          this.errMsg = 'Data Not Found';
        }
        if (res.body.result) {
          this.totalPages = [];
          for (let i = 0; i < res.body.total_plan; i++) {
            this.totalPages.push(i + 1);
          }
        }

      }
      this.mainpageLoder = false;

    });
  }

  // pagination
  direction(direction) {
    if (direction == 0) {
      if (this.current_page > 1) {
        this.current_page = this.current_page - 1;
        this.getSubscription(this.current_page, 0);
      }
    } else {
      if (this.current_page < this.totalPages.length) {
        this.current_page = this.current_page + 1;
        this.getSubscription(this.current_page, 0);
      }
    }
  }

  // re subscribe plan api
  resubscribeId(data) {
    sessionStorage.setItem('course_name', data.title);
    this.enrollID = data;
    this.enroll = data.id;
    var enroll = data.course_id;
    if (
      data.course_fee == 'Free' ||
      data.course_fee == 'free' ||
      data.course_fee == '50 cent'
    ) {
      this.submitEnroll();
      this.router.navigate(['/dashboard/wallet']);
    } else {
      this.submitEnroll();
      this.router.navigate(['/dashboard/payment'], {
        queryParams: { url: enroll, id: data.id },
      });
    }
  }
  submitEnrolls(amount) {
    this.amount = amount;
    const data = {
      course_id: this.enroll,
      user_id: sessionStorage.getItem('uid'),
    };
    this.service.post('course-enroll', data, 1).subscribe((res) => {
      if (res.body.message === 'You Are Already Enroll This Course.') {
      }
      if (res.body.message === 'success') {
        $('#enroll').hide();
        setTimeout(() => {
          jQuery('#summary').modal('show');
        }, 1);
      }
    });
  }
  submitEnroll() {
    const data = {
      id: this.enroll,
      user_id: sessionStorage.getItem('uid'),
    };
    this.service.post('course-resubscribe', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        jQuery('#enroll').modal('hide');

        setTimeout(() => {
          jQuery('#summary').modal('show');
        }, 100);
      }
    });
  }

  // submit on summary page
  confirmPayment() {
    jQuery('#summary').modal('hide');
    setTimeout(() => {
      this.router.navigate(['/dashboard/wallet']);
    }, 1000);
  }
}
