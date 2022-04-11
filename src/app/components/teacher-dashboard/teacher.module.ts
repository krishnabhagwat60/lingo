import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcceptCourseComponent } from '../teacher-dashboard/accept-course/accept-course.component';
import { AddNewCourseIntroComponent } from '../teacher-dashboard/add-new-course-intro/add-new-course-intro.component';
import { ReviewComponent } from '../teacher-dashboard/review/review.component';
import { TaskEditorComponent } from '../teacher-dashboard/task-editor/task-editor.component';
import { TeacherDashboardComponent } from '../teacher-dashboard/teacher-dashboard/teacher-dashboard.component';
import { TeacherProfileComponent } from '../teacher-dashboard/teacher-profile/teacher-profile.component';
import { TeacherSupportComponent } from '../teacher-dashboard/teacher-support/teacher-support.component';
import { TeacherWalletComponent } from '../teacher-dashboard/teacher-wallet/teacher-wallet.component';
import { HttpClientModule } from '@angular/common/http';
import { TeacherRoutingModule } from '../teacher-dashboard/teacher-routing.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PlansAndPricingComponent } from './plans-and-pricing/plans-and-pricing.component';
import { CreatCourseDashboardComponent } from './creat-course-dashboard/creat-course-dashboard.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { TeacherCourseDetailComponent } from './teacher-course-detail/teacher-course-detail.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular'
import { PreviousSupportComponent } from './previous-support/previous-support.component';
import { TeacherViewStudentComponent } from './teacher-view-student/teacher-view-student.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { AffiliationResultComponent } from './affiliation-result/affiliation-result.component';
import { ImageDragResultComponent } from './image-drag-result/image-drag-result.component';
import { ImageDragWordComponent } from './image-drag-word/image-drag-word.component';
import { AffiliationRetryComponent } from './affiliation-retry/affiliation-retry.component';
import { QuestionDropdownResultComponent } from './question-dropdown-result/question-dropdown-result.component';
import { PickRightResultComponent } from './pick-right-result/pick-right-result.component';
import { FillTheResultComponent } from './fill-the-result/fill-the-result.component';
import { QuestionRadioResultComponent } from './question-radio-result/question-radio-result.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TagInputModule } from 'ngx-chips';
import { NgSelectModule } from '@ng-select/ng-select';
import { SolutionAffiliationComponent } from './solution-affiliation/solution-affiliation.component';
import { PickWordSolutionComponent } from './pick-word-solution/pick-word-solution.component';
import { FillWordSolutionComponent } from './fill-word-solution/fill-word-solution.component';
import { QuestionDropdownSolutionComponent } from './question-dropdown-solution/question-dropdown-solution.component';
import { QuesRadioSolutionComponent } from './ques-radio-solution/ques-radio-solution.component';
import { TextDragSolutionComponent } from './text-drag-solution/text-drag-solution.component';
import { ImageDragSolutionComponent } from './image-drag-solution/image-drag-solution.component';
import { StudentPipe } from '../teacher-dashboard/student-view/studentPipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { StudentHeaderComponent } from './student-header/student-header.component';
import { ThankYouTeacherComponent } from './thank-you-teacher/thank-you-teacher.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2SearchPipeModule,
        TeacherRoutingModule,
        HttpClientModule,
        CKEditorModule,
        NgMultiSelectDropDownModule.forRoot(),
        TagInputModule,
        NgSelectModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        AcceptCourseComponent,
        AddNewCourseIntroComponent,
        ReviewComponent,
        TaskEditorComponent,
        TeacherDashboardComponent,
        TeacherProfileComponent,
        TeacherSupportComponent,
        TeacherWalletComponent,
        SideNavComponent,
        EditProfileComponent,
        PlansAndPricingComponent,
        CreatCourseDashboardComponent,
        AddCourseComponent,
        TeacherCourseDetailComponent,
        PreviousSupportComponent,
        TeacherViewStudentComponent,
        StudentViewComponent,
        AffiliationResultComponent,
        ImageDragResultComponent,
        ImageDragWordComponent,
        AffiliationRetryComponent,
        QuestionDropdownResultComponent,
        PickRightResultComponent,
        FillTheResultComponent,
        QuestionRadioResultComponent,
        SolutionAffiliationComponent,
        PickWordSolutionComponent,
        FillWordSolutionComponent,
        QuestionDropdownSolutionComponent,
        QuesRadioSolutionComponent,
        TextDragSolutionComponent,
        ImageDragSolutionComponent,
        StudentPipe,
        StudentHeaderComponent,
        ThankYouTeacherComponent,
    ]
})
export class TeacherModule { }
