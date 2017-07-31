import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './components/app.component';
import { HomeComponent }  from './components/home.component';
import { VoteComponent }  from './components/vote.component';

import { TripService } from './services/trip.service';


@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    VoteComponent,
  ],
  providers: [ TripService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
