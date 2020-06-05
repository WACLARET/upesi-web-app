import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { TokenInterceptor } from './services/interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LandingComponent } from './landing/landing.component';
import { CountriesComponent } from './countries/countries.component';
import { AuthGuard } from './guards/authguard';
import { DataService } from './services/data.service';
import { ProfileComponent } from './profile/profile.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { BeneficiaryBankComponent } from './beneficiary-bank/beneficiary-bank.component';
import { BeneficiaryLocationComponent } from './beneficiary-location/beneficiary-location.component';
import { BeneficiaryMobileWalletsComponent } from './beneficiary-mobile-wallets/beneficiary-mobile-wallets.component';
import { TransformPipe } from './pipes/transform.pipe';
import { AmountPipe } from './pipes/amount.pipe';
import { OnlynumberDirective } from './services/onlynumber.directive';
import { RecepientComponent } from './recepient/recepient.component';
import { PayComponent } from './pay/pay.component';
import { Ng2LoadingSpinnerModule } from 'ng2-loading-spinner';

const appRoutes: Routes = [
  { path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
        permission: {
            only: ['1'],
            redirectTo: '/'
        }
    }
  },
  { path: 'profile',
  component: ProfileComponent,
  canActivate: [AuthGuard],
  data: {
      permission: {
          only: ['1'],
          redirectTo: '/'
      }
  }
},
{ path: 'transactions',
  component: TransactionsComponent,
  canActivate: [AuthGuard],
  data: {
      permission: {
          only: ['1'],
          redirectTo: '/'
      }
  }
},
{ path: 'beneficiaries',
  component: BeneficiariesComponent,
  canActivate: [AuthGuard],
  data: {
      permission: {
          only: ['1'],
          redirectTo: '/'
      }
  }
},
{ path: 'recepient',
  component: RecepientComponent,
  canActivate: [AuthGuard],
  data: {
      permission: {
          only: ['1'],
          redirectTo: '/'
      }
  }
},
{ path: 'pay',
  component: PayComponent,
  canActivate: [AuthGuard],
  data: {
      permission: {
          only: ['1'],
          redirectTo: '/'
      }
  }
},
{ path: 'beneficiary_bank/:id',
  component: BeneficiaryBankComponent,
  canActivate: [AuthGuard],
  data: {
      permission: {
          only: ['1'],
          redirectTo: '/'
      }
  }
},
{ path: 'beneficiary_location/:id',
  component: BeneficiaryLocationComponent,
  canActivate: [AuthGuard],
  data: {
      permission: {
          only: ['1'],
          redirectTo: '/'
      }
  }
},
{ path: 'beneficiary_mobile_wallets/:id',
  component: BeneficiaryMobileWalletsComponent,
  canActivate: [AuthGuard],
  data: {
      permission: {
          only: ['1'],
          redirectTo: '/'
      }
  }
},
  { path: '',
    component: LandingComponent
  },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '404' }
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    FooterComponent,
    NotfoundComponent,
    LandingComponent,
    CountriesComponent,
    ProfileComponent,
    TransactionsComponent,
    BeneficiariesComponent,
    BeneficiaryBankComponent,
    BeneficiaryLocationComponent,
    BeneficiaryMobileWalletsComponent,
    TransformPipe,
    AmountPipe,
    OnlynumberDirective,
    RecepientComponent,
    PayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    BrowserAnimationsModule,
    Ng2LoadingSpinnerModule.forRoot({}),
    RouterModule.forRoot(appRoutes, {
      onSameUrlNavigation: 'reload'
          }),
    ToastrModule.forRoot({
            timeOut: 6000,
            positionClass: 'toast-top-center',
            preventDuplicates: true,
            }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthGuard, DataService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
