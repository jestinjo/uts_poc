import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-circuit-layer-diagram',
  templateUrl: './circuit-layer-diagram.component.html',
  styleUrls: ['./circuit-layer-diagram.component.css']
})
export class CircuitLayerDiagramComponent implements OnInit {

  @Input() circuitId:any
  @Input() nodes=[];
  @Input() links = []


  constructor() { }

  ngOnInit(): void {
  }

  refreshCLR(){
    // Refresh CLR
    alert('Refresh CLR');
  }

  exportAsPDF(){
    // Export As PDF 
    alert('Export As PDF');
  }

  expandCLR(){
    // Expand CLR
    alert('Expand CLR');
  }
}
