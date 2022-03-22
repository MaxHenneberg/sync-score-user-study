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

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    StudyComponent,
    EndComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PdfViewerModule,
    MatButtonModule,
    AppRoutingModule,
    MatSnackBarModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
