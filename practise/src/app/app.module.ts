import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MapTalksComponent } from './map-talks/map-talks.component';
import { MapTalksPlainComponent } from './map-talks-plain/map-talks-plain.component';
import { ClrDiagramComponent } from './clr-diagram/clr-diagram.component';

@NgModule({
  declarations: [
    AppComponent,
    MapTalksComponent,
    MapTalksPlainComponent,
    ClrDiagramComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
