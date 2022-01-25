import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-support-list',
  templateUrl: './support-list.component.html',
  styleUrls: ['./support-list.component.css']
})
export class SupportListComponent implements OnInit {
  support: any;
  sidebarData: any;
  subTitle: any;
  profileShow: boolean = false;
  dashboardShow: boolean = false;
  ismenusub: boolean = false;
  ismenu: boolean = false;
  ismenuShow: boolean = false;
  errMsg: string;
  user: string;
  mainpageLoder = true;
  coursesName: void;
  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getSupport();
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
  getSupport() {
    const data = {
      user_id: sessionStorage.getItem('uid')
    }
    this.service.post('Support_listing', data, 1).subscribe(res => {
      this.support = res.body.result;
      this.mainpageLoder = false;
    })
  }
}
