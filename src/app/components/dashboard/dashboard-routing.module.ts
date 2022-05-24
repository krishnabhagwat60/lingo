import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseDetailComponent } from '../dashboard/course-detail/course-detail.component';
import { CourseDetailPaidComponent } from '../dashboard/course-detail-paid/course-detail-paid.component';
import { CourseDetailUnpaidComponent } from '../dashboard/course-detail-unpaid/course-detail-unpaid.component';
import { MyWalletComponent } from '../dashboard/my-wallet/my-wallet.component';
import { MyCourseComponent } from '../dashboard/my-course/my-course.component';
import { StudentDashboardComponent } from '../dashboard/student-dashboard/student-dashboard.component';
import { StudentProfileComponent } from '../dashboard/student-profile/student-profile.component';
import { SubcriptionPlanComponent } from '../dashboard/subcription-plan/subcription-plan.component';
import { SupportComponent } from './support/support.component'
import { SupportListComponent } from './support-list/support-list.component';
import { PaymentComponent } from './payment/payment.component';
import { StudentsDashboardComponent } from './students-dashboard/students-dashboard.component';
import { StudentViewComponent } from '../teacher-dashboard/student-view/student-view.component';

const routes: Routes = [
  {
    path: 'support_list',
    component: SupportListComponent,
    data: {
      title: 'SupportListComponent'
    }
  },

  {
    path: 'course_detail',
    component: CourseDetailComponent,
    data: {
      title: 'CourseDetailComponent'
    }
  },

  {
    path: 'course_detail_paid',
    component: CourseDetailPaidComponent,
    data: {
      title: 'CourseDetailPaidComponent'
    }
  },
  {
    path: 'course_detail_unpaid',
    component: CourseDetailUnpaidComponent,
    data: {
      title: 'CourseDetailUnpaidComponent'
    }
  },
  {
    path: 'wallet',
    component: MyWalletComponent,
    data: {
      title: 'MyWalletComponent'
    }
  },
  {
    path: 'myCourse',
    component: MyCourseComponent,
    data: {
      title: 'MyCourseComponent'
    }
  },
  {
    path: 'studentDashboard',
    component: StudentsDashboardComponent,
    data: {
      title: 'StudentsDashboardComponent'
    }
  },
  {
    path: 'studentDashboards',
    component: StudentDashboardComponent,
    data: {
      title: 'StudentDashboardComponent'
    }
  },
  {
    path: 'StudentViewComponent',
    component: StudentViewComponent,
    data: {
      title: 'StudentViewComponent'
    }
  },
  {
    path: 'studentProfile',
    component: StudentProfileComponent,
    data: {
      title: 'StudentProfileComponent'
    }
  },
  {
    path: 'payment',
    component: PaymentComponent,
    data: {
      title: 'PaymentComponent'
    }
  },
  {
    path: 'subscriptionPlan',
    component: SubcriptionPlanComponent,
    data: {
      title: 'SubcriptionPlanComponent'
    }
  },
  {
    path: 'support',
    component: SupportComponent,
    data: {
      title: 'SupportComponent'
    }
  },
]
  ;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
}

export const routedComponents = [];
