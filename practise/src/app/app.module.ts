import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MapTalksComponent } from './map-talks/map-talks.component';
import { MapTalksPlainComponent } from './map-talks-plain/map-talks-plain.component';
import { ClrDiagramComponent } from './clr-diagram/clr-diagram.component';
import { CircuitLayerDiagramComponent } from './circuit-layer-diagram/circuit-layer-diagram.component';
import { ClrGraphComponent } from './clr-graph/clr-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    MapTalksComponent,
    MapTalksPlainComponent,
    ClrDiagramComponent,
    CircuitLayerDiagramComponent,
    ClrGraphComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
