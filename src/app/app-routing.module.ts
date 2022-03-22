import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {StudyComponent} from "./study/study.component";

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'study', component: StudyComponent},
  {path: '', redirectTo: '/welcome', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
