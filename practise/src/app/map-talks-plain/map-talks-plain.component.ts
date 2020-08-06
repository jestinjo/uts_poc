import { Component, OnInit, Input, ElementRef, NgZone } from '@angular/core';
import * as maptalks from 'maptalks';
import { TranslationWidth } from '@angular/common';


@Component({
  selector: 'app-map-talks-plain',
  templateUrl: './map-talks-plain.component.html',
  styleUrls: ['./map-talks-plain.component.css']
})
export class MapTalksPlainComponent implements OnInit {
  @Input() markerPoint = [{
    location: [-0.113049, 51.498568],
    name: 'Lambeth',
    label2:'1-AJSDKJAJSDD-ASDASD-ASAD',
    label3:'AJSDH-ASDD-123',
    label4:'VHEHHH',
    label5:'CISCO',
    label6:'RTH',
    label7:'0',
    label8:'-',
    label9:'1',
    label10:'l2-dfhhf',
    label:'1-LLSDJHFJNSSD-SDFSDF-SSDF'
  },
  {
    location: [-0.07890, 51.50020],
    name: 'Butlers Warf',
    label2:'1-AJSDKJAJSDD-ASDASD-ASAD',
    label3:'AJSDH-ASDD-123',
    label4:'VHEHHH',
    label5:'CISCO',
    label6:'RTH',
    label7:'0',
    label8:'-',
    label9:'1',
    label10:'l2-dfhhf',
    label:'1-LLSDJHFJNSSD-SDFSDF-SSDF'
  },
  {
    location: [-0.11836, 51.48199],
    name: 'Kenningtom',
    label2:'1-AJSDKJAJSDD-ASDASD-ASAD',
    label3:'AJSDH-ASDD-123',
    label4:'VHEHHH',
    label5:'CISCO',
    label6:'RTH',
    label7:'0',
    label8:'-',
    label9:'1',
    label10:'l2-dfhhf',
    label:'1-LLSDJHFJNSSD-SDFSDF-SSDF'
  },
  {
    location: [-0.08532, 51.46608],
    name: 'Peckham',
    label2:'1-AJSDKJAJSDD-ASDASD-ASAD',
    label3:'AJSDH-ASDD-123',
    label4:'VHEHHH',
    label5:'CISCO',
    label6:'RTH',
    label7:'0',
    label8:'-',
    label9:'1',
    label10:'l2-dfhhf',
    label:'1-LLSDJHFJNSSD-SDFSDF-SSDF'
  }
  ]

  @Input() layerPoint = [[[-0.113049,51.498568],[-0.07890,51.50020]],[[-0.08532,51.46608],[-0.11836,51.48199]]];
  @Input() dashedPoint = [[[-0.11836,51.48199],[-0.113049,51.498568]],[[-0.07890,51.50020],[-0.08532,51.46608]]];
  map:any
  markerLayer:any;
  layerLine:any;
  dashedLine:any;
  markers:any=[];
  infoBoxData:any;
  infoWindow:maptalks.ui.InfoWindow;
  
  constructor(private elementRef: ElementRef, private zone: NgZone) {
    window["glabalback"] = (e) => {
      zone.run(() => {
        this.goBack(e);
      });
    }
   }
  
  ngOnInit(): void {
    this.map = new maptalks.Map('canvas', {
      center: [-0.113049,51.498568],
      zoom: 14,
      pitch : 45,
      attribution: false,
      zoomControl : true,
      scaleControl : true,
      baseLayer: new maptalks.TileLayer('base', {
        urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        subdomains: ['a','b','c','d'],
        attribution: ''
      })
    });
    this.renderMap();
  }
  
  renderMap(){
    this.addMarkers(this.markerPoint);
    this.connectMarker(this.layerPoint,this.dashedPoint);
  }
  
  addMarkers(value){
    var markerHTML;
    this.infoBoxData={};
    value.forEach(element => {
      markerHTML = '<div class="marker"><div class="marker-text"><div class="marker-location">'+element.name+'</div><div class="marker-address">'+element.label+'</div></div><div class="marker-end"></div><div class="marker-inner"></div></div>'
      var marker = new maptalks.ui.UIMarker(element.location, {
        'single'        : false,
        'content'       : markerHTML,
        enableAltitude : true,
        
      });
      marker.addTo(this.map).show();
      this.infoBoxData[element.location[0]+'&'+element.location[1]] = element;

      //On Click of Marker
      marker.on('click',(e)=>{
        var zoom=this.map.getZoom();
        var center=this.map.getCenter()
        if(center.x.toFixed(6) != e.target._coordinate.x || center.y.toFixed(6) != e.target._coordinate.y){
          this.map.setCenter([e.target._coordinate.x,e.target._coordinate.y]);
          setTimeout(() => {
            if(zoom <= 12){
              this.map.setZoom(14);
              this.openInfoBox(e.target._coordinate.x+'&'+e.target._coordinate.y)
            } else {
              this.map.setZoom(this.map.getZoom()+1);
              this.openInfoBox(e.target._coordinate.x+'&'+e.target._coordinate.y)
            }
          }, 100);
        } else {
          setTimeout(() => {
            this.openInfoBox(e.target._coordinate.x+'&'+e.target._coordinate.y)
          }, 100);
        }
      });
    }); 
  }
  
  connectMarker(layerPoint,dashedPoint){
    this.connectLayer(layerPoint,dashedPoint);
    new maptalks.VectorLayer('vectorLine', [this.layerLine,this.dashedLine]).addTo(this.map);
  }

  connectLayer(layerPoint,dashedPoint){
    this.layerLine = new maptalks.MultiLineString(layerPoint, {
      symbol: {
        'lineColor' : '#000',
        'lineWidth' : 2, 
      }
    });
    
    this.dashedLine = new maptalks.MultiLineString(dashedPoint, {
      symbol: {
        'lineColor' : '#000',
        'lineWidth' : 2, 
        'lineDasharray' : [5],
      }
    });
  }

  ngAfterViewInit(){
  }
  
  clear(){
    delete this.map;
    delete this.markerLayer;
    delete this.layerLine;
    this.markers=[]; 
  }



  openInfoBox(id){
    this.map.setPitch(45);
    this.map.setBearing(0);
    this.map.setFov(36.86989764584402);
    var content = '<div class="map-info-box"><div class="info-box-label" onclick="infoClick(\'NF Name\','+''+')"><div class="info-box-header">NF Name</div>'+
    '<div class="info-box-value info-box-under">'+this.infoBoxData[id].label+'</div></div><div class="info-box-label"><div class="info-box-header">TID</div>'+
    '<div class="info-box-value info-box-under">'+this.infoBoxData[id].label2+'</div></div><div class="info-box-label half">'+
    '<div class="info-box-header">CLU</div><div class="info-box-value">'+this.infoBoxData[id].label3+'</div></div>'+
    '<div class="info-box-label half"><div class="info-box-header">NE Type</div><div class="info-box-value info-box-under">'+
    this.infoBoxData[id].label4+'</div></div><div class="info-box-label half"><div class="info-box-header">Vendor</div><div class="info-box-value">'+
    this.infoBoxData[id].label5+'</div></div><div class="info-box-label half"><div class="info-box-header">Model</div><div class="info-box-value">'+
    this.infoBoxData[id].label6+'</div></div><div class="info-box-sub"><div class="info-box-label half"><div class="info-box-header">State</div><div class="info-box-value">'+
    this.infoBoxData[id].label7+'</div></div><div class="info-box-label half"><div class="info-box-header">Subnet</div><div class="info-box-value">'+
    this.infoBoxData[id].label8+'</div></div><div class="info-box-label half"><div class="info-box-header">End</div><div class="info-box-value">'+this.infoBoxData[id].label9+
    '</div></div><div class="info-box-label half"><div class="info-box-header">Port</div><div class="info-box-value">'+this.infoBoxData[id].label10+'</div></div></div></div>'+
    '<div class="signal-img" onclick="netWorkClick()"><img class="net-img"src="assets/img/maptalks/network.svg"></div>'

    var dxdyx = this.getDxDy(this.map.getZoom());
    var options = {
      autoPan:false,
      single : true,
      autoCloseOn :'click',
      autoOpenOn :false,
      width  : 240,
      height : 270,
      custom : true,
      dx : dxdyx.dx,
      dy : dxdyx.dy,
      content : content
    };

    var cordinate = {
      x:this.infoBoxData[id].location[0].toFixed(3),
      y:this.infoBoxData[id].location[1].toFixed(3)
    }
    this.infoWindow = new maptalks.ui.InfoWindow(options);
    this.infoWindow.addTo(this.map).show(cordinate);
    document.addEventListener('infoBoxEvent',(event)=>{
      console.log(event['detail'])
    });

    this.map.on('zoomend', (e)=>{
        if(this.infoWindow.isVisible()){
          this.map.setPitch(45);
          this.map.setBearing(0);
          this.map.setFov(36.86989764584402);
          this.infoWindow.hide();
          var dxdy = this.getDxDy(e.to);
          this.infoWindow.setOptions({
              dx:dxdy.dx,
              dy:dxdy.dy
            }); 
        this.infoWindow.show();
      }
    })
  }

  getDxDy(zoom){
      if(zoom < 16){
        return({
          dx:200,
          dy:150
        }); 
    } else if(zoom == 16){
      return({
        dx:200,
        dy:160
      });
    } else if(zoom == 17 ){
      return({
        dx:200,
        dy:180
      });
    } else if(zoom == 18){
      return({
        dx:200,
        dy:220
      });
    } else if(zoom == 19){
      return({
        dx:200,
        dy:280
      });
    } else if(zoom == 20){
      return({
        dx:200,
        dy:380
      });
    }
  }

  goBack(e){
    console.log(e)
  }
}
