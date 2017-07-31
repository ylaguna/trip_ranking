import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent }  from './home.component';

import { TripService } from './trip.service';


@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  providers: [ TripService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
