import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sidebarData: any;
  coursesName: void;
  subTitle: any;
  courseid: void;
  name: void;
  studentRating: void;
  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.studentSideBar()
  }
  studentSideBar() {
    const data = {
      user_id: sessionStorage.getItem('uid')
    }
    this.service.post('student_sidebar', data, 1).subscribe(res => {
      this.sidebarData = res.body.result;

    })
  }
  //sidebar accordion
  toggleAccordian(event, index, name, id) {
    this.coursesName = sessionStorage.setItem('course_name', name)
    this.coursesName = sessionStorage.setItem('course_id', id)
    const element = event.target;
    element.classList.toggle('active');
    if (this.sidebarData[index].isActive) {
      this.sidebarData[index].isActive = false;
    } else {
      this.sidebarData.forEach(element => {
        element.isActive = false;
      });
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
  getChildSData(child, id, name, rating) {
    sessionStorage.setItem('subId', child);
    this.courseid = sessionStorage.setItem('course_id', id)
    this.name = sessionStorage.setItem('teacher_name', name)
    this.studentRating = sessionStorage.setItem('student_rating', rating)
    sessionStorage.getItem('course_id')
    sessionStorage.getItem('teacher_name')
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


  /**
     * Porfolio isotope and filter
     */






}
function on(arg0: string, arg1: string, arg2: (e: any) => void, arg3: boolean) {
  throw new Error('Function not implemented.');
}

