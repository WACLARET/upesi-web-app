import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url: any = 'https://customer-api.upesimts.com/api/';
  constructor(
    private Http: HttpClient
  ) { }
  getCountries(): Observable<any>  {
    return this.Http.get(this.url + 'Utility/GetCountries');
   }
  getRemittance(): Observable<any>  {
    return this.Http.get(this.url + 'api/Transaction/GetPurposeofRemittance');
   }
  getServices(): Observable<any>  {
    return this.Http.get(this.url + 'Utility/GetServiceTypes');
   }
   getFromCurrencies(id: any): Observable<any>  {
    return this.Http.get(this.url + 'Utility/GetAvailableCurrencies/' + id);
   }
   getUserInfo(id: any): Observable<any>  {
    return this.Http.get('https://sts.upesimts.com/api/users/getprimaryinfo/' + id);
   }
   getToCurrencies(id: any): Observable<any>  {
    return this.Http.get(this.url + 'Utility/GetAvailableCurrencies/' + id);
   }
   public loadToken() {
    const data = JSON.parse(sessionStorage.getItem('oidc.user:https://sts.upesimts.com:portal.customer'));
    const token = data.access_token;
    return token;
  }
  public getTransactionPayload() {
    const data = JSON.parse(localStorage.getItem('payload'));
    return data;
  }
  public loggedInUser() {
    const data = JSON.parse(sessionStorage.getItem('oidc.user:https://sts.upesimts.com:portal.customer'));
    return data;
  }
  getTransactions(payload): Observable<any>  {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.Http.post(this.url + 'transaction/GetUserTransactions', payload, {headers: headers});
   }
   getAuthCountries(): Observable<any>  {
    return this.Http.get(this.url + 'Utility/GetOperationalCountries');
   }
   getBank(id): Observable<any>  {
    return this.Http.get(this.url + 'Beneficiary/GetBeneficiaryBankDetails/' + id);
   }
   getLoc(id): Observable<any>  {
    return this.Http.get(this.url + 'Beneficiary/GetBeneficiaryLocationDetails/' + id);
   }
   getMob(id): Observable<any>  {
    return this.Http.get(this.url + 'Beneficiary/GetBeneficiaryMobileWalletDetails/' + id);
   }
   GetSenderAmount(payload): Observable<any>  {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.Http.post(this.url + 'Transaction/GetSenderAmount', payload, {headers: headers});
   }
   GetReceiverAmount(payload): Observable<any>  {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.Http.post(this.url + 'Transaction/GetReceiverAmount', payload, {headers: headers});
   }
   saveNewBeneficiary(payload): Observable<any>  {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.Http.post(this.url + 'Beneficiary/SaveBeneficiary', payload, {headers: headers});
   }
   allBeneficiaries(payload): Observable<any>  {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.Http.post(this.url + 'Beneficiary/GetBeneficiaries', payload, {headers: headers});
   }
   saveBankDetails(payload): Observable<any>  {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.Http.post(this.url + 'Beneficiary/SaveBeneficiaryBankDetails', payload, {headers: headers});
   }
   saveLocDetails(payload): Observable<any>  {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.Http.post(this.url + 'Beneficiary/SaveBeneficiaryLocationDetails', payload, {headers: headers});
   }
   saveMobDetails(payload): Observable<any>  {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.Http.post(this.url + 'Beneficiary/SaveBeneficiaryMobileWalletDetails', payload, {headers: headers});
   }
   getTotalSentMoney(): Observable<any>  {
    return this.Http.get(this.url + 'Transaction/GetTotalSentAmount');
   }
   getPending(): Observable<any>  {
    return this.Http.get(this.url + 'Transaction/GetTotalPendingTransaction');
   }
   uploadDocs(payload): Observable<any>  {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.Http.post(this.url + 'Utility/UploadDocument', payload, {headers: headers});
   }
   processPay(payload): Observable<any>  {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.Http.post(this.url + 'Transaction/AddCustomerTransaction', payload, {headers: headers});
   }
   payMpesa(payload): Observable<any>  {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.Http.post(this.url + 'Transaction/MakeOnlinePayment', payload, {headers: headers});
   }
   getMobileProviders(id): Observable<any>  {
    return this.Http.get(this.url + 'Utility/GetMobileProviders/' + id);
   }
   getProfileComp(): Observable<any>  {
    return this.Http.get(this.url + 'Utility/GetProfileCompletionPercentage');
   }
   GetFX(payload): Observable<any>  {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.Http.post(this.url + 'transaction/GetTransactionRates', payload, {headers: headers});
   }
   validatePhone(phone) {
    const reg = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    return reg.test(phone);
  }
}
