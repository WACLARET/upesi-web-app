import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-recepient',
  templateUrl: './recepient.component.html',
  styleUrls: ['./recepient.component.css']
})
export class RecepientComponent implements OnInit {
  amount: any;
  finalAmount: any;
  FromCountryID: any;
  FromCurrencyID: any;
  PurposeofRemittance: any;
  ServiceTypeID: any;
  BeneficiaryID: any;
  SourceofFundID: any;
  ToCountryID: any;
  ToCurrencyID: any;
  auth_countries: any;
  getsender: any;
  terms: any;
  locale: any;
  id: any;
  paid: any;
  token: any;
  beneficiaries: any;
  resources: any;
  f_name: any;
  l_name: any;
  saved_beneficiary: any;
  reveal = false;
  reaveal_ben = false;
  fileToUpload: any;
  // payload data
  CountryID: any;
  BeneficiaryType: any;
  FirstName: any;
  MiddleName: any;
  LastName: any;
  providers: any;
  UserId: any;
  reason = false;
  MobileMoneyProviderID: any;
  MobileMoneyProviderName: any;
  MobileNumber: any;
  bene = [
    {
      'name': 'Company',
      'id': 'Company'
    },
    {
      'name': 'Individual',
      'id': 'Individual'
    }
  ];
  source = [
    {
      'name': 'Salary',
      'id': 1
    },
    {
      'name': 'Bank / Sacco loan',
      'id': 2
    },
    {
      'name': 'Business',
      'id': 3
    }
  ];
BankName: any;
BankBranch: any;
AccountName: any;
AccountNumber: any;
accountNumber: any;
BeneficiaryBankDetailID: any;
BeneficiaryLocationID: any;
BeneficiaryMobileWalletDetailID: any;
response: any;
accountName: any;
bankName: any;
currency_code: any;
bankBranch: any;
paid_id: any;
rem: any;
State: any;
City: any;
Address: any;
  constructor(
    private data: DataService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getToken();
    this.Continue();
    this.getActiveCountries();
    this.getBeneficiaries();
    this.getRemittances();
  }
  getBeneficiaries() {
    const data = {
      UserId: ''
    };
    this.data.allBeneficiaries(data).subscribe( beneficiaries => {
      this.beneficiaries = beneficiaries.items;
      let ress: any[];
      ress = beneficiaries.items;
      ress.map((i) => { i.fullName = i.firstName + ' ' + i.lastName;  i.id = i.id; return i; });
      this.resources = ress;
    });
  }
  GetBenData(id) {
    this.saved_beneficiary = id;
    this.data.getBank(id).subscribe( BeneficiaryBankDetailID => {
      this.BeneficiaryBankDetailID = BeneficiaryBankDetailID.id;
    });
    this.data.getLoc(id).subscribe( BeneficiaryLocationID => {
      this.BeneficiaryLocationID = BeneficiaryLocationID.id;
      this.City = BeneficiaryLocationID.city;
      this.State = BeneficiaryLocationID.state;
      this.Address = BeneficiaryLocationID.address;
    });
    this.data.getMob(id).subscribe( BeneficiaryMobileWalletDetailID => {
      this.BeneficiaryMobileWalletDetailID = BeneficiaryMobileWalletDetailID.id;
    });
  }
  setD() {
    this.reaveal_ben = true;
    this.reason = true;
  }
  getActiveCountries() {
    this.data.getAuthCountries().subscribe( auth_countries => {
      this.auth_countries = auth_countries;
    });
  }
  MobileProviders(id) {
    this.data.getMobileProviders(id).subscribe(providers => {
      this.providers = providers;
    });
  }
  getRemittances() {
    this.data.getRemittance().subscribe( rem => {
      this.rem = rem;
    });
  }
  getToken() {
    const data = this.data.loggedInUser();
    this.id = data.profile.sub;
    this.token = data.access_token;
    this.data.getUserInfo(data.profile.sub).subscribe( user_info => {
      this.f_name = user_info.firstName;
      this.l_name = user_info.lastName;
    });
  }
  saveBeneficiary() {
    const payload = {
      CountryID: this.ToCountryID,
      BeneficiaryType: this.BeneficiaryType,
      FirstName: this.FirstName,
      MiddleName: this.MiddleName,
      LastName: this.LastName,
      UserId: this.UserId
    };
    if (payload.FirstName ) {
      if (payload.MiddleName) {
        if ( payload.LastName) {
          if (payload.BeneficiaryType) {
    this.data.saveNewBeneficiary(payload).subscribe( saved_beneficiary => {
      this.saved_beneficiary = saved_beneficiary;
      if (saved_beneficiary) {
        this.toastr.success('Beneficiary saved succesfully', 'Success!');
        if (this.ServiceTypeID === 1) {
          // bank deposit
          this.reveal = true;
        } else if (this.ServiceTypeID === 2) {
          // cash pickup
          this.reveal = true;
        } else if (this.ServiceTypeID === 3) {
          // mobile money
          this.reveal = true;
        } else if (this.ServiceTypeID === 4) {
          // bill payment
        }
      } else {
        this.toastr.error('Something wrong, try again later', 'Error!');
        this.router.navigate(['/dashboard']);
      }

    });
  } else {
    this.toastr.error('Please choose beneficiary type', 'Validation Error!');
  }
  } else {
   this.toastr.error('Please enter last name', 'Validation Error!');
  }
  } else {
  this.toastr.error('Please enter middle name', 'Validation Error!');
  }
  } else {
    this.toastr.error('Please enter first name', 'Validation Error!');
  }
  }
  Continue() {
    if (this.data.getTransactionPayload()) {
    const data = JSON.parse(localStorage.getItem('payload'));
    this.amount = data.Amount;
    this.finalAmount = data.recieverdata;
    this.FromCountryID = data.FromCountryID;
    this.FromCurrencyID = data.FromCurrencyID;
    this.ServiceTypeID = data.ServiceTypeID;
    this.ToCountryID = data.ToCountryID;
    this.ToCurrencyID = data.ToCurrencyID;
    this.getsender = data.getsender;
    this.currency_code = data.currency_code;
    }
  }

  saveBeneficiaryBank() {
    const payload = {
      BeneficiaryID: this.saved_beneficiary,
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
          this.reason = true;
          this.toastr.success('Data saved successfully', 'Success!');
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

  saveBeneficiaryLoc() {
    const payload = {
      BeneficiaryID: this.saved_beneficiary,
      State: this.State,
      City: this.City,
      Address: this.Address
    };
    if (payload.State) {
    if (payload.City) {
      if (payload.Address) {
      this.data.saveLocDetails(payload).subscribe( response => {
        this.response = response;
        if (response) {
          this.reason = true;
          this.toastr.success('Data saved successfully', 'Success!');
        }
      });
    } else {
      this.toastr.error('Please enter address', 'Validation Error!');
    }
  } else {
    this.toastr.error('Please enter city', 'Validation Error!');
  }
    } else {
      this.toastr.error('Please enter state', 'Validation Error!');
    }
  }

  saveBeneficiaryMobile() {
    const payload = {
      BeneficiaryID: this.saved_beneficiary,
      MobileMoneyProviderID: this.MobileMoneyProviderID,
      MobileNumber: this.MobileNumber
    };
    if (payload.MobileMoneyProviderID ) {
      if (payload.MobileNumber) {
      if (!this.data.validatePhone(payload.MobileNumber)) {
        this.toastr.error('Please use a valid phone number', 'Error!');
        return false;
      }
      this.data.saveMobDetails(payload).subscribe( response => {
        this.response = response;
        if (response) {
          this.reason = true;
          this.toastr.success('Data saved successfully', 'Success!');
        }
      });
    } else {
      this.toastr.error('Please enter mobile number', 'Validation Error!');
    }
    } else {
      this.toastr.error('Please enter mobile number provider', 'Validation Error!');
    }
  }

  getBeneficiaryData() {
    this.data.getBank(this.saved_beneficiary).subscribe( BeneficiaryBankDetailID => {
      this.BeneficiaryBankDetailID = BeneficiaryBankDetailID.id;
    });
    this.data.getLoc(this.saved_beneficiary).subscribe( BeneficiaryLocationID => {
      this.BeneficiaryLocationID = BeneficiaryLocationID.id;
      this.City = BeneficiaryLocationID.city;
      this.State = BeneficiaryLocationID.state;
      this.Address = BeneficiaryLocationID.address;
    });
    this.data.getMob(this.saved_beneficiary).subscribe( BeneficiaryMobileWalletDetailID => {
      this.BeneficiaryMobileWalletDetailID = BeneficiaryMobileWalletDetailID.id;
    });
  }
  countData() {
    if (this.amount >= 500000) {
      return true;
    }
  }
  processPayment() {
    const payload = {
    DocumentUploadID: 1,
    SourceofFundID: 1,
    PurposeofRemittance: this.PurposeofRemittance,
    BeneficiaryID: this.saved_beneficiary,
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
    if (payload.PurposeofRemittance) {
    this.data.processPay(payload).subscribe(paid => {
      this.paid = paid;
      if (paid.hasError === true ) {
      /* this.toastr.error(paid.errorMessage, 'Error'); */
      if (payload.ServiceTypeID === 1) {
        this.router.navigate(['/beneficiary_bank/' + payload.BeneficiaryID]);
        this.toastr.error('Please add beneficiary bank details first in order to proceed.', '');
    // bank
      } else if (payload.ServiceTypeID === 2) {
        this.router.navigate(['/beneficiary_location/' + payload.BeneficiaryID]);
        this.toastr.error('Please add beneficiary location details first in order to proceed.', '');
    // cash
      } else if (payload.ServiceTypeID === 3) {
        this.router.navigate(['/beneficiary_mobile_wallets/' + payload.BeneficiaryID]);
        this.toastr.error('Please add mobile wallet details first in order to proceed.', '');
    // mobile
      } else if (payload.ServiceTypeID === 4) {
        this.toastr.error('Sorry we do not currently process bill payments', '');
    // mobile
      }
      } else if (paid.hasError === false) {
        this.paid_id = paid.id;
        this.toastr.success('You transaction has been successfully saved', 'Success');
        this.router.navigate(['/pay']);
        const payload_data = {
          TransactionID: this.paid_id,
          amount: this.amount,
          getsender: this.getsender,
          currency_code: this.currency_code
        };
        localStorage.removeItem('payload');
        const data = JSON.stringify(payload_data);
        localStorage.setItem('transaction_data', data);
      }
    });

  } else {
    this.toastr.error('Please enter reason for transaction', 'Validation Error!');
  }
}

}
