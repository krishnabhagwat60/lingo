import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-task-editor',
  templateUrl: './task-editor.component.html',
  styleUrls: ['./task-editor.component.css']
})
export class TaskEditorComponent implements OnInit {
  sidebarData: any;
  coursesName: void;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.sidebar();
  }
  sidebar() {
    const data = {
      user_id: sessionStorage.getItem('uid')
    }
    debugger
    this.service.post('teacher_sidebar', data, 1).subscribe(res => {
      this.sidebarData = res.body.result;
    })
  }
  toggleAccordian(event, index, name, id) {
    this.coursesName = sessionStorage.setItem('course_name', name)
    sessionStorage.setItem('course_id', id)
    setTimeout(() => {
      this.router.navigate(['/teacherDashboard/editCourse']);
    }, 100);
    const element = event.target;
    element.classList.toggle('active');
    if (this.sidebarData[index].isActive) {
      this.sidebarData[index].isActive = false;
      debugger
    } else {
      this.sidebarData[index].isActive = true;
    }
  }
}
