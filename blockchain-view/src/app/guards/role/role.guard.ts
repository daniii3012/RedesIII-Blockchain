import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from "../../services/auth/auth.service";
import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.afAuth.authState
      .pipe(take(1))
      .pipe(map(authState => !!authState))
      .pipe(tap(auth => {
        if (auth) {
          this.auth.afAuth.authState.subscribe(
            auth => {
              if (auth) {
                this.auth.getUserRole(auth.uid).subscribe(
                  userRole => {
                    if (userRole) {
                      if (Object.assign({}, userRole).hasOwnProperty('role')) {
                        if (userRole.role != 'admin') {
                          console.log('Acceso denegado');
                          this.router.navigate(['/vote']);
                        }
                      }
                    }
                  }
                )
              }
            }
          )
        } else {
          console.log('Debes iniciar sesión');
          this.router.navigate(['/login']);
        }

      }));
  }

}
