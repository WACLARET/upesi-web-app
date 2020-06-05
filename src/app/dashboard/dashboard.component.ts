import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DataService]
})
export class DashboardComponent implements OnInit {
  id: any;
  token: any;
  pageSize: any;
  currentPage: any;
  f_name: any;
  l_name: any;
  edit_fname: any;
  edit_lname: any;
  editDetails: any;
  trans: any;
  currency_code: any;
  MSISDN: any;
  bankdepo: any;
  service: any;
  pending: any;
  locale: any;
  amount: any;
  calc_amount: any;
  completed = false;
  from_currency_id: any;
  to_currency_id: any;
  BeneficiaryID: any;
  services = [];
  finalAmount: any;
  PurposeofRemittance: any;
  R_Amount: any;
  f_Amount: any;
  auth_countries: any;
  FromCountryID: any;
  ToCountryID: any;
  FromCurrencyID: any;
  ServiceTypeID: any;
  beneficiaries: any;
  calculated_send: any;
  calculated_recieve: any;
  total_sent: any;
  tariffAmount: any;
  currency_c: any;
  ToCurrencyID: any;
  all_transactions: any;
  getsender: any;
  terms: any;
  recieverdata: any;
  paid_id: any;
  BeneficiaryBankDetailID: any;
  BeneficiaryLocationID: any;
  BeneficiaryMobileWalletDetailID: any;
  City: any;
  exchangeRate: any;
  State: any;
  fx = false;
  Address: any;
  Amount: any;
  paid: any;
  resources: any;
  prof_complete: any;
  constructor(
    public dataService: DataService,
    private toastr: ToastrService,
    private router: Router
  ) { }
  ngOnInit() {
    this.getToken();
    this.getPagination();
    this.continue();
    this.pullServices();
    this.getActiveCountries();
    this.getTotalSent();
    this.getPending();
    this.getProfileComp();
  }
  continue() {
    if (this.dataService.getTransactionPayload()) {
      $(function() {
        $('#continue').modal({backdrop: false});
    });
    const data = JSON.parse(localStorage.getItem('payload'));
    this.amount = data.Amount;
    this.getsender = data.getsender;
    this.currency_code = data.currency_code;
    }
  }
  getToken() {
    const data = this.dataService.loggedInUser();
    this.id = data.profile.sub;
    this.token = data.access_token;
    this.dataService.getUserInfo(data.profile.sub).subscribe( user_info => {
      this.f_name = user_info.firstName;
      this.l_name = user_info.lastName;
    });
  }
  cancel() {
    localStorage.removeItem('payload');
    this.closeContinue();
  }
  getProfileComp() {
    this.dataService.getProfileComp().subscribe( prof_complete => {
      this.prof_complete = prof_complete;
    });
  }
  getPagination() {
    const payload = {
    id: this.id,
    token: this.token,
    Page : 1,
    Size : 20,
    SearchByReference : false,
    ReferenceNumber : '',
    SenderFirstName : '',
    SenderMiddleName : '',
    SenderLastName : '',
    ReceiverFirstName : '',
    ReceiverMiddleName : '',
    ReceiverLastName : '',
    SenderGender : '',
    ReceiverGender : '',
    ReceiverCountry : '',
    SenderCountry : '',
    ServiceType : '',
    ServiceProvider : '',
    FromDate : '',
    ToDate : '',
    PaidOutBy : '',
    PaidOutFromDate : '',
    PaidOutToDate : '',
    Compliance : false,
    PreApproved : true,
    SenderPaymentReceived : false
    };
    this.dataService.getTransactions(payload).subscribe(transactions => {
      this.pageSize = transactions.paginationInfo.pageSize;
      this.currentPage = transactions.paginationInfo.currentPage;
      this.all_transactions = transactions.items;
    });
  }
  pull_fromCurrency(FromCountryID) {
    this.dataService.getFromCurrencies(FromCountryID).subscribe( from_currency_id => {
      this.from_currency_id = from_currency_id;
    });
  }
  pull_toCurrency(ToCountryID) {
    this.dataService.getToCurrencies(ToCountryID).subscribe( to_currency_id => {
      this.to_currency_id = to_currency_id;
      this.ToCurrencyID = to_currency_id[0].id;
      this.currency_code = '( ' + to_currency_id[0].code + ' )';
      this.currency_c = to_currency_id[0].code;
    });
  }
  pullServices() {
    this.dataService.getServices().subscribe(services => {
      this.services = services;
    });
  }
  getActiveCountries() {
    this.dataService.getAuthCountries().subscribe( auth_countries => {
      this.auth_countries = auth_countries;
    });
  }
  setCompleted(id: any) {
    this.completed = id;
  }
  getSendValue() {
    const payload = {
      FromCountryID: 212,
      FromCurrencyID: 92,
      ToCountryID: this.ToCountryID,
      ToCurrencyID: this.ToCurrencyID,
      Amount: this.Amount,
      ServiceTypeID: this.service
    };
    this.dataService.GetReceiverAmount(payload).subscribe( getsender => {
      const payload_calc = {
        FromCountryID: payload.FromCountryID,
        FromCurrencyID: payload.FromCurrencyID,
        ToCountryID: this.ToCountryID,
        ToCurrencyID: this.ToCurrencyID,
        Amount: this.Amount,
        ServiceTypeID: this.service,
        getsender: getsender,
        currency_code: this.currency_c
    };
    this.calculated_send = getsender;
    const data = JSON.stringify(payload_calc);
    localStorage.setItem('payload', data);
    });

    const pay = {
      FromCountryID: payload.FromCountryID,
      FromCurrencyID: payload.FromCurrencyID,
      ToCountryID: this.ToCountryID,
      ToCurrencyID: this.ToCurrencyID,
      Amount: this.Amount
    };
    this.dataService.GetFX(pay).subscribe( fx_data => {
     this.exchangeRate = fx_data.exchangeRate;
     this.tariffAmount = fx_data.tariffAmount;
     this.f_Amount = pay.Amount;
     this.calc_amount = this.calculated_send;
     this.fx = true;
    });
}
getReceiveValue() {
  const payload = {
    FromCountryID: 212,
    FromCurrencyID: 92,
    ToCountryID: this.ToCountryID,
    ToCurrencyID: this.ToCurrencyID,
    Amount: this.R_Amount,
    ServiceTypeID: this.service
  };
  this.dataService.GetSenderAmount(payload).subscribe( recieverdata => {
    const payload_calc = {
          FromCountryID: payload.FromCountryID,
          FromCurrencyID: payload.FromCurrencyID,
          ToCountryID: this.ToCountryID,
          ToCurrencyID: this.ToCurrencyID,
          Amount: recieverdata,
          ServiceTypeID: this.service,
          getsender: this.R_Amount,
          currency_code: this.currency_c
    };
  this.calculated_recieve = recieverdata;
  const data = JSON.stringify(payload_calc);
  localStorage.setItem('payload', data);
  });

  const pay = {
    FromCountryID: payload.FromCountryID,
    FromCurrencyID: payload.FromCurrencyID,
    ToCountryID: this.ToCountryID,
    ToCurrencyID: this.ToCurrencyID,
    Amount: this.R_Amount
  };
  this.dataService.GetFX(pay).subscribe( fx_data => {
    this.exchangeRate = fx_data.exchangeRate;
     this.tariffAmount = fx_data.tariffAmount;
     this.f_Amount = this.calculated_recieve;
     this.calc_amount = pay.Amount;
     this.fx = true;
  });
}
  Complete() {
    this.router.navigate(['/recepient']);
  }

  processPayment() {
    const payload = {
    DocumentUploadID: 1,
    SourceofFundID: 1,
    PurposeofRemittance: this.PurposeofRemittance,
    BeneficiaryID: this.BeneficiaryID,
    ServiceTypeID: this.ServiceTypeID,
    BeneficiaryBankDetailID: this.BeneficiaryBankDetailID,
    BeneficiaryLocationID: this.BeneficiaryLocationID,
    BeneficiaryMobileWalletDetailID: this.BeneficiaryMobileWalletDetailID,
    FromCountryID: this.FromCountryID,
    FromCurrencyID: this.FromCurrencyID,
    ToCountryID: this.ToCountryID,
    ToCurrencyID: this.ToCurrencyID,
    Amount: this.amount,
    City: this.City,
    State: this.State,
    Address: this.Address
    };
    this.dataService.processPay(payload).subscribe(paid => {
      this.paid = paid;
      if (paid.hasError === true ) {
      this.toastr.error(paid.errorMessage, 'Error');
      } else if (paid.hasError === false) {
        this.paid_id = paid.id;
        this.toastr.success('You transaction has been successfully saved', 'Success');
        this.closeContinue();
        this.openFinish();
        localStorage.removeItem('payload');
      }
    });
  }
  finishPayment() {
    const payload = {
      TransactionID: this.paid_id,
      MSISDN: this.MSISDN
    };
    this.dataService.payMpesa(payload).subscribe( mpesa => {
        this.toastr.success('Mpesa STK push sent successfully, please make payment on your phone', '');
        this.closePayment();
    });
  }
  gather(id) {
    this.paid_id = id;
  }
  closeContinue() {
    $('#continue').modal('hide');
  }
  closeModal() {
    $('#newtrans').modal('hide');
  }
  closePayment() {
    $('#finish').modal('hide');
  }
  openModal() {
    $('#continue').modal('show');
  }
  CancelTrans() {
    localStorage.removeItem('payload');
    this.toastr.success('Your transaction has been successfully cancelled', 'Success');
    this.loadModal();
  }
  loadModal() {
    $('#newtrans').modal('show');
  }
  openFinish() {
    $('#finish').modal('show');
  }
  getTotalSent() {
    this.dataService.getTotalSentMoney().subscribe(total_sent => {
      this.total_sent = total_sent;
    });
  }
  getPending() {
    this.dataService.getPending().subscribe(pending => {
      this.pending = pending;
    });
  }
  checkInt(id) {
    if (id > 0) {
      return true;
    } else {
      return false;
    }
}
}
