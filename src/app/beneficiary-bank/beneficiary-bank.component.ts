import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-beneficiary-bank',
  templateUrl: './beneficiary-bank.component.html',
  styleUrls: ['./beneficiary-bank.component.css'],
  providers: [DataService]
})
export class BeneficiaryBankComponent implements OnInit, OnDestroy {
private routeSub: any;
id: any;
getId: any;
f_name: any;
bankdetails = false;
l_name: any;
BankName: any;
BankBranch: any;
AccountName: any;
AccountNumber: any;
accountNumber: any;

response: any;
accountName: any;
bankName: any;
bankBranch: any;
  constructor(
    public data: DataService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getToken();
    this.routeSub = this.route.params.subscribe(params => {
        this.getId = params['id'];
    });
    this.getData();
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
  getToken() {
    const data = this.data.loggedInUser();
    this.id = data.profile.sub;
    this.data.getUserInfo(data.profile.sub).subscribe( user_info => {
      this.f_name = user_info.firstName;
      this.l_name = user_info.lastName;
    });
  }

  saveBeneficiaryBank() {
    const payload = {
      BeneficiaryID: this.getId,
      BankName: this.BankName,
      BankBranch: this.BankBranch,
      AccountName: this.AccountName,
      AccountNumber: this.AccountNumber
    };
    if (payload.BankName) {
      if ( payload.BankBranch) {
        if (payload.AccountName) {
          if (payload.AccountNumber) {
    this.data.saveBankDetails(payload).subscribe( response => {
      this.response = response;
      if (response) {
        this.toastr.success('Details saved successfully', '');
        setTimeout(function () {
          location.reload();
      }, 1000);
      }
    });
  } else {
    this.toastr.error('Please enter account number', 'Validation Error!');
}
} else {
  this.toastr.error('Please enter account name', 'Validation Error!');
}
} else {
this.toastr.error('Please enter bank branch', 'Validation Error!');
}
} else {
    this.toastr.error('Please enter bank name', 'Validation Error!');
}
  }
  getData() {
    this.data.getBank(this.getId).subscribe( response => {
      if (response !== null) {
        this.bankdetails = true;
        this.accountName = response.accountName;
        this.accountNumber = response.accountNumber;
        this.bankName = response.bankName;
        this.bankBranch = response.bankBranch;
      }
    });
  }

}
