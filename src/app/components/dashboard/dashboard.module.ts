import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseDetailComponent } from '../dashboard/course-detail/course-detail.component';
import { CourseDetailPaidComponent } from '../dashboard/course-detail-paid/course-detail-paid.component';
import { CourseDetailUnpaidComponent } from '../dashboard/course-detail-unpaid/course-detail-unpaid.component';
import { MyWalletComponent } from '../dashboard/my-wallet/my-wallet.component';
import { MyCourseComponent } from '../dashboard/my-course/my-course.component';
import { StudentDashboardComponent } from '../dashboard/student-dashboard/student-dashboard.component';
import { StudentProfileComponent } from '../dashboard/student-profile/student-profile.component';
import { SubcriptionPlanComponent } from '../dashboard/subcription-plan/subcription-plan.component';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SupportComponent } from './support/support.component';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SupportListComponent } from './support-list/support-list.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TagInputModule } from 'ngx-chips';
import { PaymentComponent } from './payment/payment.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { StudentsDashboardComponent } from './students-dashboard/students-dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DashboardRoutingModule,
        HttpClientModule,
        Ng2SearchPipeModule,
        NgMultiSelectDropDownModule.forRoot(),
        TagInputModule,
        NgxPayPalModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        CourseDetailComponent,
        CourseDetailPaidComponent,
        CourseDetailUnpaidComponent,
        MyWalletComponent,
        MyCourseComponent,
        StudentDashboardComponent,
        StudentProfileComponent,
        SubcriptionPlanComponent,
        SidebarComponent,
        NavbarComponent,
        SupportComponent,
        SupportListComponent,
        PaymentComponent,
        StudentsDashboardComponent,
    ]
})
export class DashboardModule { }
