import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../../services/auth/auth-service.service";

@Component({
  selector: 'app-explanation',
  templateUrl: './explanation.component.html',
  styleUrls: ['./explanation.component.css']
})
export class ExplanationComponent implements OnInit {

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
  }

  onAck(): void {
    this.authService.setExplanationCheck();
  }

}
