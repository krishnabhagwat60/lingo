import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.component.html',
  styleUrls: ['./my-wallet.component.css']
})
export class MyWalletComponent implements OnInit {
  walletData: any;
  historyData: [];
  errMsg: string;
  totalPages: any[];
  buttonColor: any;
  current_page = 1;
  buttonShow: boolean = true;
  ErrMsg: string;
  sidebarData: any;
  subTitle: any;
  ismenuShow: boolean = false;
  ismenu: boolean = false;
  ismenusub: boolean = false;
  dashboardShow: boolean = false;
  profileShow: boolean = false;
  user: string;
  coursesName: void;
  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getWallet();
    this.getHistory(1, 0);
    this.username();
  }
  // username
  username() {
    this.user = sessionStorage.getItem('username');
  }
  showshubmenu() {
    this.ismenuShow = !this.ismenuShow
  }
  getChildData(child) {
    sessionStorage.setItem('subId', child);
    this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { id: sessionStorage.getItem('subId') } });
  }
  // view page
  view(id) {
    this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { viewpage: id } });
  }

  // get wallet api
  getWallet() {
    this.service.get('wallet', 1).subscribe(res => {
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
      this.addAmountForm.reset();
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
      this.getWallet();

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
      if (this.historyData.length === 0) {
        this.buttonShow = false;
      }
      // console.log(res)
      if (res.body.result.message === 'No Transaction Yet.') {
        this.ErrMsg = 'No Transaction Yet'
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

}
