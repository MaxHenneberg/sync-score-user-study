import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {StudyComponent} from "./components/study/study.component";
import {EndComponent} from "./components/end/end.component";

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'study', component: StudyComponent},
  {path: 'end', component: EndComponent},
  {path: '', redirectTo: '/welcome', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
