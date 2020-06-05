import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-beneficiary-mobile-wallets',
  templateUrl: './beneficiary-mobile-wallets.component.html',
  styleUrls: ['./beneficiary-mobile-wallets.component.css']
})
export class BeneficiaryMobileWalletsComponent implements OnInit, OnDestroy {
private routeSub: any;
id: any;
f_name: any;
l_name: any;
getId: any;
ToCountryID: any;
mobdetails = false;
provider_id: any;
MobileMoneyProviderID: any;
MobileMoneyProviderName: any;
mobileNumber: any;
MobileNumber: any;
auth_countries: any;
active: any;
response: any;
providers = [];
  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getActiveCountries();
    this.routeSub = this.route.params.subscribe(params => {
      this.getId = params['id'];
  });
  this.getToken();
  this.getData();
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
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
  getToken() {
    const data = this.data.loggedInUser();
    this.id = data.profile.sub;
    this.data.getUserInfo(data.profile.sub).subscribe( user_info => {
      this.f_name = user_info.firstName;
      this.l_name = user_info.lastName;
    });
  }

  saveBeneficiaryMobile() {
    const payload = {
      BeneficiaryID: this.getId,
      MobileMoneyProviderID: this.MobileMoneyProviderID,
      MobileNumber: this.MobileNumber
    };
    if (payload.MobileMoneyProviderID ) {
      if (payload.MobileNumber) {
      if (!this.data.validatePhone(payload.MobileNumber)) {
        this.toastr.error('Please enter your phone number in the format +254712345678', '');
        return false;
      }
    this.data.saveMobDetails(payload).subscribe( response => {
      this.response = response;
      if (response) {
        this.toastr.success('Details saved successfully', '');
        setTimeout(function () {
          location.reload();
      }, 1000);
      }
    });
  } else {
    this.toastr.error('Please enter mobile number', 'Validation Error!');
  }
  } else {
    this.toastr.error('Please enter mobile number provider', 'Validation Error!');
  }
  }
  getData() {
    this.data.getMob(this.getId).subscribe( response => {
      if (response !== null) {
        this.mobdetails = true;
        this.MobileMoneyProviderName = response.mobileMoneyProviderName;
        this.mobileNumber = response.mobileNumber;
        this.active = response.active;
      }
    });
  }

}
