import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {ProgressTableComponent} from "./components/progress-table/progress-table.component";
import {MilestoneService} from "./services/milestone.service";
import { AuthService } from './services/auth.service';
import {MilestoneComponent} from "./components/milestone/milestone.component";
import {ComingSoonComponent} from "./coming-soon/coming-soon.component";
import {SignUpComponent} from "./components/auth/sign-up/sign-up.component";
import {SignInComponent} from "./components/auth/sign-in/sign-in.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import { ParticipantsComponent } from './components/participants/participants.component';
import { ParticipantResolver } from './resolvers/participants.resolver';
import { CertificateResolver } from './resolvers/certificates.resolver';
import { CurrentUserResolver } from './resolvers/current-user.resolver';

const routes: Routes = [
  { path: 'leaderboards', resolve: {participants: ParticipantResolver, certificates: CertificateResolver, currentUser: CurrentUserResolver}, component: ProgressTableComponent},
  { path: 'milestones', component: MilestoneComponent},
  { path: 'coming-soon', component: ComingSoonComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'signin', component: SignInComponent},
  { path: 'dashboard', resolve: {participants: ParticipantResolver, certificates: CertificateResolver, currentUser: CurrentUserResolver}, component: DashboardComponent},
  { path: '**', resolve: {participants: ParticipantResolver, certificates: CertificateResolver, currentUser: CurrentUserResolver}, component: WelcomeComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }
