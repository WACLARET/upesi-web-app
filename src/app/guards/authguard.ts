import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataService } from '../services/data.service';

@Injectable()
export class AuthGuard implements CanActivate {
constructor(private dataService: DataService, private router: Router) { }
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  if (this.dataService.loggedInUser()) {
    const stringdata = '1';
      const userRole: string = stringdata;
      const permission = route.data['permission'];

      let canActivate: boolean;

      if (!permission) { throw new Error('Permissions is not setup!'); }
      if (!permission.only.length) { throw new Error('Roles are not setup!'); }

      canActivate = permission.only.includes(userRole);

      if (!canActivate) { this.router.navigate([permission.redirectTo]); }

      return canActivate;
    return true;
  } else {
    this.router.navigate(['/']);
    return false;
  }
 }
}
