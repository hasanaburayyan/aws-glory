import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatLabel} from "@angular/material/form-field";
import { WelcomeComponent } from './components/welcome/welcome.component';
import { FooterComponent } from './components/footer/footer.component';
import { LinksComponent } from './components/links/links.component';
import { TerminalSwitchComponent } from './components/terminal-switch/terminal-switch.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { CardContainerComponent } from './components/card-container/card-container.component';
import { ProgressTableComponent } from './components/progress-table/progress-table.component';
import { MilestoneComponent } from './components/milestone/milestone.component';
import {RouterModule} from "@angular/router";
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent,
    FooterComponent,
    LinksComponent,
    TerminalSwitchComponent,
    ParticipantsComponent,
    CardContainerComponent,
    ProgressTableComponent,
    MilestoneComponent,
    ComingSoonComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
