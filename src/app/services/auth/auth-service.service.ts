import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService implements CanActivate {

  consentCheck: boolean;
  userDataCheck: boolean;
  explanationCheck: boolean;
  studyCheck: boolean;

  constructor(private router: Router) {
    this.consentCheck = false;
    this.userDataCheck = false;
    this.explanationCheck = false;
    this.studyCheck = false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const accessedUrl = state.url
    console.log(`Url to be Accessed: ${accessedUrl}`);
    let accessAllowed = false;
    switch (accessedUrl) {
      case '/form': {
        accessAllowed = this.canViewUserData();
        break;
      }
      case '/explanation': {
        accessAllowed = this.canViewExplanation();
        break;
      }
      case '/study': {
        accessAllowed = this.canViewUserStudy();
        break;
      }
      case '/end': {
        accessAllowed = this.canViewEnd();
        break;
      }
    }

    if (!accessAllowed) {
      this.handleAccessDenied();
      return false;
    } else {
      return true;
    }

  }

  canViewUserData(): boolean {
    return this.consentCheck;
  }

  canViewExplanation(): boolean {
    return this.consentCheck && this.userDataCheck;
  }

  canViewUserStudy(): boolean {
    return this.consentCheck && this.userDataCheck && this.explanationCheck;
  }

  canViewEnd(): boolean {
    return this.consentCheck && this.userDataCheck && this.explanationCheck && this.studyCheck;
  }

  handleAccessDenied(): void {
    this.router.navigate(['/welcome']);
  }

  setConsentCheck(): void {
    this.consentCheck = true;
  }

  setUserDataCheck(): void {
    this.userDataCheck = true;
  }

  setStudyCheck(): void {
    this.studyCheck = true;
  }

  setExplanationCheck(): void {
    this.explanationCheck = true;
  }
}
