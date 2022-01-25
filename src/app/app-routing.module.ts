import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TermConditionComponent } from './components/term-condition/term-condition.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { FaqComponent } from './components/faq/faq.component';
import { ImageCroppingComponent } from './components/image-cropping/image-cropping.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { CancelPaymentComponent } from './components/cancel-payment/cancel-payment.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'image', component: ImageCroppingComponent
  },
  {
    path: 'forget_password',
    component: ForgetPasswordComponent
  },
  {
    path: 'change_password',
    component: ChangePasswordComponent
  },
  {
    path: 'term_condition',
    component: TermConditionComponent
  },
  {
    path: 'privacy_policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'thank-you',
    component: ThankYouComponent
  },
  {
    path: 'cancel-payment',
    component: CancelPaymentComponent
  },
  {
    path: 'image',
    loadChildren: () => import('./components/image-cropper/image-cropper.module').then(m => m.ImageCropperModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../app/components/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'teacherDashboard',
    loadChildren: () => import('../app/components/teacher-dashboard/teacher.module').then(m => m.TeacherModule),
  },
  {
    path: 'multimedia',
    loadChildren: () => import('../app/multimedia/multimedia.module').then(m => m.MultimediaModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
