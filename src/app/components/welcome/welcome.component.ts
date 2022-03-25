import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from "../../services/auth/auth-service.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  consentForm = "/assets/text/Dummy_Consent.pdf";

  constructor(private authService: AuthServiceService) {
  }

  ngOnInit(): void {
  }

  onConsent(): void {
    this.authService.setConsentCheck();
  }

}
