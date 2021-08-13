import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {ProgressTableComponent} from "./components/progress-table/progress-table.component";
import {MilestoneService} from "./services/milestone.service";
import {MilestoneComponent} from "./components/milestone/milestone.component";
import {ComingSoonComponent} from "./coming-soon/coming-soon.component";

const routes: Routes = [
  { path: 'leaderboards', component: ProgressTableComponent},
  { path: 'milestones', component: MilestoneComponent},
  { path: 'coming-soon', component: ComingSoonComponent},
  { path: '**', component: WelcomeComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
