import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-teacher-wallet',
  templateUrl: './teacher-wallet.component.html',
  styleUrls: ['./teacher-wallet.component.css']
})
export class TeacherWalletComponent implements OnInit {
  walletData: any;
  historyData: any;
  currentCardIndex = 0;
  errMsg: string;
  sidebarData: any;
  buttonColor: any;
  totalPages: any[];
  current_page = 1;
  buttonShow: boolean = true;
  profileShow: boolean = false;
  dashboardShow: boolean = false;
  ismenusub: boolean = false;
  ismenu: boolean = false;
  ismenuShow: boolean = false;
  subTitle: any;
  user: string;
  coursesName: void;
  title: void;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getWallet();
    this.getHistory(1, 0);
    this.sidebar();
    this.username();
    // this.addInitialForms();
  }
  username() {
    this.user = sessionStorage.getItem('username');
  }
  getChildData(child) {
    sessionStorage.setItem('subId', child);
    this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { id: sessionStorage.getItem('subId') } });
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
  // sidebar api
  sidebar() {
    const data = {
      user_id: sessionStorage.getItem('uid')
    }
    this.service.post('teacher_sidebar', data, 1).subscribe(res => {
      this.sidebarData = res.body.result;
    })
  }
  // view page
  view(id) {
    this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { viewpage: id } });
  }
  // get wallet api
  getWallet() {
    const data = {
      user_id: sessionStorage.getItem('uid')
    }
    this.service.post('wallet', data, 1).subscribe(res => {
      this.walletData = res.body.result;
    })
  }

  addAmountForm = new FormGroup({
    amount: new FormControl('',)
  })
  // add amount api
  addAmount() {
    const data = {
      amount: this.addAmountForm.value.amount
    }
    this.service.post('amount-add', data, 1).subscribe(res => {
      this.getWallet();
    })
  }

  addWallet = new FormGroup({
    withdraw: new FormControl('',)
  })
  // withdraw money
  withdrawAmount() {
    const data = {
      amount: this.addWallet.value.withdraw
    }
    this.service.post('amount-withdraw', data, 1).subscribe(res => {
      if (res.body.result === 'Reedeem Balance Is Low') {
        this.errMsg = 'Redeem Balance Is Low'
      }

    })
  }

  // history transaction api
  getHistory(page = 1, i) {
    this.current_page = Number(page);
    const data = {
      page: page,
      user_id: sessionStorage.getItem('uid')
    }
    this.buttonColor = i;
    this.service.post('transaction', data, 1).subscribe(res => {
      this.historyData = res.body.result;
      if (res.body.total === 1 || res.body.total === 0) {
        this.buttonShow = false;
      }
      if (res.body.result.message == 'No Transaction Yet.') {
        this.errMsg = 'No Transaction Yet.'
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
        this.getHistory(this.current_page, 0);
      }

    } else {
      if (this.current_page < this.totalPages.length) {
        this.current_page = this.current_page + 1
        this.getHistory(this.current_page, 0);
      }
    }
  }
  //sidebar accordion
  toggleAccordian(event, index, name, id) {
    this.coursesName = sessionStorage.setItem('course_name', name)
    sessionStorage.setItem('course-id', id)
    this.router.navigate(['/teacherDashboard/editCourse'], { queryParams: { id: id } });
    const element = event.target;
    element.classList.toggle('active');
    if (this.sidebarData[index].isActive) {
      this.sidebarData[index].isActive = false;
    } else {
      this.sidebarData[index].isActive = true;
    }
  }
  getIndex(activeIndex){
    debugger
    this.currentCardIndex = activeIndex;
  }
  prev() {
    console.log('prev')
    this.currentCardIndex = this.currentCardIndex--;
    if (this.currentCardIndex != 0) {

      this.currentCardIndex = this.currentCardIndex - 1;
    }
    else {
      this.currentCardIndex =2;
    }
    console.log(this.currentCardIndex)

  }
  next() {
    console.log('next')
    if (this.currentCardIndex >= 0 && this.currentCardIndex < 2) {

      this.currentCardIndex = this.currentCardIndex + 1;
    }
    else {
      this.currentCardIndex = 0;
    }
    console.log(this.currentCardIndex)
  }
  toggleSubTitle(event, index, data, title) {
    this.title = sessionStorage.setItem('title', title)
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
    this.router.navigate(['/multimedia/contentStyle'], { queryParams: { id: sessionStorage.getItem('subId') } });
  }
}
