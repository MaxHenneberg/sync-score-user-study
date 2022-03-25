import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {StudyComponent} from "./components/study/study.component";
import {EndComponent} from "./components/end/end.component";
import {UserdataComponent} from "./components/userdata/userdata.component";
import {AuthServiceService} from "./services/auth/auth-service.service";
import {ExplanationComponent} from "./components/explanation/explanation.component";

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'form', component: UserdataComponent, canActivate: [AuthServiceService]},
  {path: 'explanation', component: ExplanationComponent, canActivate: [AuthServiceService]},
  {path: 'study', component: StudyComponent, canActivate: [AuthServiceService]},
  {path: 'end', component: EndComponent, canActivate: [AuthServiceService]},
  {path: '', redirectTo: '/welcome', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
