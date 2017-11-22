import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {DexieService} from './services/dexie.service';
import {WorkingDayService} from './services/workingday.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [DexieService, WorkingDayService],
  bootstrap: [AppComponent]
})
export class AppModule { }
