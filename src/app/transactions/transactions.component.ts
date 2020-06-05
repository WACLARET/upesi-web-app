import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  providers: [DataService]
})
export class TransactionsComponent implements OnInit {
  id: any;
  token: any;
  pageSize: any;
  currentPage: any;
  paid_id: any;
  MSISDN: any;
  all_transactions: any;
f_name: any;
l_name: any;
  constructor(
    public dataService: DataService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getToken();
    this.getPagination();
  }

  getToken() {
    const data = this.dataService.loggedInUser();
    this.id = data.profile.sub;
    this.dataService.getUserInfo(data.profile.sub).subscribe( user_info => {
      this.f_name = user_info.firstName;
      this.l_name = user_info.lastName;
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
    SenderPaymentReceived : ''
    };
    this.dataService.getTransactions(payload).subscribe(transactions => {
      this.pageSize = transactions.paginationInfo.pageSize;
      this.currentPage = transactions.paginationInfo.currentPage;
      this.all_transactions = transactions.items;
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
  closePayment() {
    $('#finish').modal('hide');
  }
}
