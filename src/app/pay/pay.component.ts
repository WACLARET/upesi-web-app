import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ANIMATION_TYPES } from 'ng2-loading-spinner';
import { INg2LoadingSpinnerConfig } from 'ng2-loading-spinner';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
show = false;
loadingConfig: INg2LoadingSpinnerConfig = {
      animationType  : ANIMATION_TYPES.dualCircle,
      backdropColor  : 'rgba(0, 0, 0, 0)',
      spinnerColor   : '#31B454',
      spinnerPosition: 'center',
      backdropBorderRadius: '0px',
      spinnerSize: 'md',
      spinnerFontSize: '2rem'
  };
id: any;
token: any;
f_name: any;
l_name: any;
MSISDN: any;
currency_code: any;
locale: any;
amount: any;
getsender: any;
  constructor(
    private data: DataService,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  showLoading() {
    this.show = true;
    setTimeout(() => {
        this.show = false;
    }, 3000);
}
  ngOnInit() {
    this.getToken();
  }
  getToken() {
    const data = this.data.loggedInUser();
    this.id = data.profile.sub;
    this.token = data.access_token;
    this.data.getUserInfo(data.profile.sub).subscribe( user_info => {
      this.f_name = user_info.firstName;
      this.l_name = user_info.lastName;
    });
      const getdata = JSON.parse(localStorage.getItem('transaction_data'));
      this.amount = getdata.amount;
      this.getsender = getdata.getsender;
      this.currency_code = getdata.currency_code;
  }

  finishPayment() {
    const data = JSON.parse(localStorage.getItem('transaction_data'));
    if (this.MSISDN) {
    if (!this.data.validatePhone(this.MSISDN)) {
      this.toastr.error('Please enter your phone number in the format +254712345678', 'Error!');
      return false;
    }
    const spliced = this.MSISDN.slice(1);
    const payload = {
      TransactionID: data.TransactionID,
      MSISDN: spliced
    };
    this.data.payMpesa(payload).subscribe( mpesa => {
        this.toastr.success('Dear customer, Kindly unlock your phone and enter your pin to complete the transfer', '');
        this.router.navigate(['/dashboard']);
    });
  } else {
    this.toastr.error('Please enter your mpesa number', '');
  }
}
}
