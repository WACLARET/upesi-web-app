import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.css'],
  providers: [DataService]
})
export class BeneficiariesComponent implements OnInit {
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
  beneficiaries = [];
  auth_countries: any;
  f_name: any;
  l_name: any;
  saved_beneficiary: any;
  // payload data
  CountryID: any;
  BeneficiaryType: any;
  FirstName: any;
  MiddleName: any;
  LastName: any;
  UserId: any;
  id: any;
  constructor(
    private data: DataService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getActiveCountries();
    this.getBeneficiaries();
  }
  getActiveCountries() {
    this.data.getAuthCountries().subscribe( auth_countries => {
      this.auth_countries = auth_countries;
    });
  }
  getToken() {
    const data = this.data.loggedInUser();
    this.UserId = data.profile.sub;
    this.data.getUserInfo(data.profile.sub).subscribe( user_info => {
      this.f_name = user_info.firstName;
      this.l_name = user_info.lastName;
    });
  }
  saveBeneficiary() {
    const payload = {
      CountryID: this.CountryID,
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
      this.Complete();
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
Complete() {
  this.toastr.success('Success creating beneficiary', 'Success!');
      setTimeout(function () {
          location.reload();
      }, 500);
  }
  deleteBeneficiary(id) {
    console.log(id);
  }

  getBeneficiaries() {
    const data = {
      UserId: ''
    };
    this.data.allBeneficiaries(data).subscribe( beneficiaries => {
      this.beneficiaries = beneficiaries.items;
    });
  }

}
