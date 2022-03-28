import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { StudyComponent } from './components/study/study.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PdfViewerModule} from "ng2-pdf-viewer";
import { AppRoutingModule } from './app-routing.module';
import {MatButtonModule} from "@angular/material/button";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import { EndComponent } from './components/end/end.component';
import {HttpClientModule} from "@angular/common/http";
import { UserdataComponent } from './components/userdata/userdata.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { ExplanationComponent } from './components/explanation/explanation.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    StudyComponent,
    EndComponent,
    UserdataComponent,
    ExplanationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PdfViewerModule,
    MatButtonModule,
    AppRoutingModule,
    MatSnackBarModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
