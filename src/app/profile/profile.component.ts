import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [DataService]
})
export class ProfileComponent implements OnInit {
  l_name: any;
  f_name: any;
  id: any;
  new_image: any;
  email: any;
  phone: any;
  username: any;
  // edit
  edit_fname: any;
  edit_lname: any;
  edit_email: any;
  edit_phone: any;
  auth_countries: any;
  // KYC
  DOB: any;
  Occupation: any;
  Address: any;
  Nationality: any;
  CountryID: any;
  fileToUpload: any;
  // profile pic
  profile_pic: any;
  constructor(
    public dataService: DataService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getToken();
    this.getActiveCountries();
  }
  getActiveCountries() {
    this.dataService.getAuthCountries().subscribe( auth_countries => {
      this.auth_countries = auth_countries;
    });
  }
  getToken() {
    const data = this.dataService.loggedInUser();
    this.id = data.profile.sub;
    this.dataService.getUserInfo(data.profile.sub).subscribe( user_info => {
      this.f_name = user_info.firstName;
      this.l_name = user_info.lastName;
      this.email = user_info.email;
      this.phone = user_info.phoneNumber;
      this.username = user_info.userName;
    });
  }
  uploadProfile() {
    const data = {
      file: this.profile_pic
    };
    if (data.file) {
      localStorage.setItem('profile_pic', JSON.stringify(data));
      this.toastr.success('You profile pic has been uploaded, it will update in a couple of minutes', '');
    } else {
      this.toastr.error('Please upload your profile pic first', '');
    }
  }
  editDetails() {
    const data = {
      edit_fname: this.edit_fname,
      edit_lname: this.edit_lname,
      edit_email: this.edit_email,
      edit_phone: this.edit_phone
    };

    console.log(data);
  }

  uploadCompliance() {
    const data = {
      DOB: this.DOB,
      Occupation: this.Occupation,
      Address: this.Address,
      Nationality: this.Nationality,
      CountryID: this.CountryID
    };
    if (data.DOB) {
      if (data.Occupation) {
        if (data.Address) {
          if (data.CountryID) {
            if (this.fileToUpload) {
            localStorage.setItem('compliance', JSON.stringify(data));
            this.toastr.success('Compliance information uploaded successfully', '');
          } else {
            this.toastr.error('Please upload your national id', 'Error');
          }
          } else {
            this.toastr.error('Your country is required', 'Error');
          }
        } else {
          this.toastr.error('Your address is required', 'Error');
        }
      } else {
        this.toastr.error('Your occupation is required', 'Error');
      }
    } else {
      this.toastr.error('Your date of birth is required', 'Error');
    }
  }

}
