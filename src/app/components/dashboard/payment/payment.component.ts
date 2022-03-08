import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { ServiceService } from '../../service.service';

//declare var hljs: any;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements AfterViewInit, OnInit {
  public defaultPrice: string = '9.99';
  public payPalConfig?: IPayPalConfig;

  public showSuccess: boolean = false;
  public showCancel: boolean = false;
  public showError: boolean = false;
  public hljs: any;
  public readonly npmCode = `npm install ngx-paypal --save`;

  public readonly moduleInstallation = `
  import { NgxPayPalModule } from 'ngx-paypal';

  @NgModule({
    imports: [
      NgxPayPalModule,
      ...
    ],
  })
  `;

  public readonly initPaypalCode = `this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: '9.99',
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: '9.99'
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: '9.99',
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };`;

  public readonly htmlCode = `<ngx-paypal [config]="payPalConfig"></ngx-paypal>`;

  public readonly usageCodeTs = `
  import { Component, OnInit } from '@angular/core';
  import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

  @Component({
    templateUrl: './your.component.html',
  })
  export class YourComponent implements OnInit {

    public payPalConfig?: IPayPalConfig;

    ngOnInit(): void {
      this.initConfig();
    }

    private initConfig(): void {
      ${this.initPaypalCode}
    }
  }
  `;

  @ViewChild('priceElem', { static: false }) priceElem?: ElementRef;
  courseDetail: any;
  id: any;
  user: string;
  enrollId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ServiceService
  ) {
    this.user = sessionStorage.getItem('username');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.initConfig(params['url']);
      this.enrollId = params['url'];
      console.log(this.enrollId);
      this.id = params['id'];
    });
    this.studentCourseDetail();
  }

  ngAfterViewInit(): void {
    this.prettify();
  }

  changePrice(): void {
    if (this.priceElem) {
      this.initConfig(this.priceElem.nativeElement.value);
    }
  }

  private initConfig(id: string): void {
    this.payPalConfig = {
      clientId:
        'AW5CAyJNH_DIkmHgGE9RMoOl7j3Z_V9s16m_V54AEoLqW0Kzc2cFST8BhiUBcjAb_KKZf1ZpBTHzAzeo',
      createOrderOnServer: (data) =>
        fetch('https://lingolista.auxesisdevelopment.com/api/paypal_api', {
          method: 'POST',
          body: JSON.stringify({ course_id: id, type: '1' }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((order) => order.order_id),
      advanced: {
        extraQueryParams: [{ name: 'disable-funding', value: 'credit,card' }],
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
        color: 'blue',
        fundingicons: false,
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        // this.router.navigate(['/thank-you'], { queryParams: { url: data.id } })

        location.href = 'thank-you?url=' + data.id;
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        this.router.navigate(['/cancel-payment']);

        console.log('OnCancel', data, actions);
        this.showCancel = true;
      },
      onError: (err) => {
        console.log('OnError', err);
        this.showError = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        this.resetStatus();
      },
      onInit: (data, actions) => {
        console.log('onInit', data, actions);
      },
    };
  }

  private resetStatus(): void {
    this.showError = false;
    this.showSuccess = false;
    this.showCancel = false;
  }

  private prettify(): void {
    this.hljs.initHighlightingOnLoad();
  }

  paymentFun() {
    var paypalButton = document.querySelectorAll('*');
  }
  studentCourseDetail() {
    const data = {
      course_id: this.enrollId,
      user_id: sessionStorage.getItem('uid'),
    };
    this.service.post('course-details', data, 1).subscribe((res) => {
      debugger
      localStorage.setItem('enrollId', this.enrollId),
        (this.courseDetail = res.body.result);
       console.log(this.courseDetail)
    });
  }
}
