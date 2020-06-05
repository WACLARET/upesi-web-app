import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-beneficiary-location',
  templateUrl: './beneficiary-location.component.html',
  styleUrls: ['./beneficiary-location.component.css'],
  providers: [DataService]
})
export class BeneficiaryLocationComponent implements OnInit, OnDestroy {
private routeSub: any;
city: any;
address: any;
state: any;
id: any;
f_name: any;
l_name: any;
getId: any;
locdetails = false;
response: any;
State: any;
City: any;
Address: any;
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

  saveBeneficiaryLoc() {
    const payload = {
      BeneficiaryID: this.getId,
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
        this.toastr.success('Details saved successfully', '');
        setTimeout(function () {
          location.reload();
      }, 1000);
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
  getData() {
    this.data.getLoc(this.getId).subscribe( response => {
      if (response !== null) {
        this.locdetails = true;
        this.city = response.city;
        this.address = response.address;
        this.state = response.state;
      }
    });
  }
  deleteLocation(id) {
    console.log(id);
  }
}
