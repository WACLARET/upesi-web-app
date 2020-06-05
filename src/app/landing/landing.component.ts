import { Component, OnInit } from '@angular/core';
import { AppAuthNService, User } from '../services/app-auth-n.service';
import { TestApiService } from '../services/test-api.service';
import { DataService } from '../services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [AppAuthNService, TestApiService, DataService]
})
export class LandingComponent implements OnInit {
  countries = [];
  FromCountryID: any;
  ToCountryID: any;
  FromCurrencyID: any;
  ToCurrencyID: any;
  service: any;
  R_Amount: any;
  f_Amount: any;
  exchangeRate: any;
  tariffAmount: any;
  fx = false;
  calc_amount: any;
  Amount: number;
  services = [];
  currency_c: any;
  trans: any;
  locale: any;
  auth_countries: any;
  currencies = [];
  to_currency_id: any;
  calculated_send: any;
  calculated_recieve: any;
  from_currency_id: any;
  currency_code: any;
  ToC: any;
  FromC: any;
  getsender = [];
  recieverdata = [];
  transmit = [
    {
      'name': 'Send',
      'id': 'Send'
    },
    {
      'name': 'Recieve',
      'id': 'Recieve'
    }
  ];
  constructor(
    public authn: AppAuthNService,
    public apiService: TestApiService,
    private data: DataService,
    private toastr: ToastrService
  ) { }
  messages: string[] = [];
  get currentUserJson(): string {
    return JSON.stringify(this.currentUser, null, 2);
  }
  currentUser: User;
  ngOnInit() {
    this.authn.getUser().then(user => {
      this.currentUser = user;

      if (user) {
        this.addMessage('User Logged In');
      } else {
        this.addMessage('User Not Logged In');
      }
    }).catch(err => this.addError(err));
    this.pullServices();
    this.getActiveCountries();
  }
  getActiveCountries() {
    this.data.getAuthCountries().subscribe( auth_countries => {
      this.auth_countries = auth_countries;
    });
  }
  clearMessages() {
    while (this.messages.length) {
      this.messages.pop();
    }
  }
  addMessage(msg: string) {
    this.messages.push(msg);
  }
  addError(msg: string | any) {
    this.messages.push('Error: ' + msg && msg.message);
  }

  public onLogin() {
    this.clearMessages();
    this.authn.login().catch(err => {
      this.addError(err);
    });
  }

  public onCallAPI() {
    this.clearMessages();
    this.apiService.callApi().then(result => {
      this.addMessage('API Result: ' + JSON.stringify(result));
    }, err => this.addError(err));
  }

  public onRenewToken() {
    this.clearMessages();
    this.authn.renewToken()
      .then(user => {
        this.currentUser = user;
        this.addMessage('Silent Renew Success');
      })
      .catch(err => this.addError(err));
  }

  public onLogout() {
    this.clearMessages();
    this.authn.logout().catch(err => this.addError(err));
  }
  pull_fromCurrency(FromCountryID) {
    this.data.getFromCurrencies(FromCountryID).subscribe( from_currency_id => {
      this.from_currency_id = from_currency_id;
    });
  }
  pull_toCurrency(ToCountryID) {
    this.data.getToCurrencies(ToCountryID).subscribe( to_currency_id => {
      this.to_currency_id = to_currency_id;
      this.ToCurrencyID = to_currency_id[0].id;
      this.currency_code = '( ' + to_currency_id[0].code + ' )';
      this.currency_c = to_currency_id[0].code;
    });
  }
  pullServices() {
    this.data.getServices().subscribe(services => {
      this.services = services;
    });
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
      this.data.GetReceiverAmount(payload).subscribe( getsender => {
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
      this.data.GetFX(pay).subscribe( fx_data => {
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
    this.data.GetSenderAmount(payload).subscribe( recieverdata => {
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
    this.data.GetFX(pay).subscribe( fx_data => {
      this.exchangeRate = fx_data.exchangeRate;
       this.tariffAmount = fx_data.tariffAmount;
       this.f_Amount = this.calculated_recieve;
       this.calc_amount = pay.Amount;
       this.fx = true;
    });
  }
  setTo(id: any) {
    this.ToC = id;
  }
  setFrom(id: any) {
    this.FromC = id;
  }
  checkInt(id) {
      if (id > 0) {
        return true;
      } else {
        return false;
      }
  }
}
