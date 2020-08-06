import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import * as maptalks from 'maptalks';

@Component({
  selector: 'app-map-talks',
  templateUrl: './map-talks.component.html',
  styleUrls: ['./map-talks.component.css']
})
export class MapTalksComponent implements OnInit {
  tooltip:any;
  @Input() markerPoint = [{
    location: [76.12622,34.55765],
    name: 'Kargil'
  },
  {
    location: [77.23149,28.65195],
    name: 'New Delhi'
  },
  {
    location: [72.88261,19.07283],
    name: 'Mumbai'
  },
  {
    location: [77.59369,12.97194],
    name: 'Bangalore'
  },
  {
    location: [76.94924,8.4855],
    name: 'Thiruvanthapuram'
  }
  ]

  @Input() equipPoint = [{
    location: [76.03337816837552,33.678426484579035],
    name: 'Equipment A'
  },
  {
    location: [75.79883860108612,24.598056628990236],
    name: 'Equipment B'
  },
  {
    location: [75.37232909444447,14.97960866523303],
    name: 'Equipment C'
  },
  {
    location: [77.4960818204205,8.884290712207331],
    name: 'Equipment D'
  },
  ]

  @Input() layer3Point = [[[76.12622,34.55765],[77.23149,28.65195]],[[77.23149,28.65195],[72.88261,19.07283]],[[72.88261,19.07283],[77.59369,12.97194]],[[77.59369,12.97194,],[76.94924,8.4855]]]
  map:any
  markerLayer:any;
  equipmentLayer:any;
  layer1Line:any;
  layer2Line:any;
  layer3Line:any;
  markers:any=[];
  infoBoxData:any=[];
  infoBoxDatax:any=[];
  googleApiKey = 'AIzaSyACchdVy2lW2Fv0e2StJbivk1x45eCcCv0';
  infoWindow: maptalks.ui.InfoWindow;
  
  constructor() { }
  
  ngOnInit(): void {
    this.map = new maptalks.Map('canvas', {
      center: [72.88261,19.07283],
      zoom: 5,
      pitch : 45,
      attribution: false,
      zoomControl : true,
      scaleControl : true,
      layerSwitcherControl:{
        'position'  : 'top-right',
        'baseTitle' : 'Base Layers',
        'excludeLayers' : ['Layers'],
        'containerClass' : 'maptalks-layer-switcher'
      },
      baseLayer: new maptalks.GroupTileLayer('Base TileLayer',[
        new maptalks.TileLayer('Carto light',{
          'urlTemplate': 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
          'subdomains'  : ['a','b','c','d']
        }),
        new maptalks.TileLayer('Roadmap',{
          'visible' : false,
          'urlTemplate': 'https://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key='+this.googleApiKey,
          'subdomains'  : ['a','b','c','d']
        }),
        new maptalks.TileLayer('Terrain',{
          'visible' : false,
          'urlTemplate': 'https://mt.google.com/vt/lyrs=p&x={x}&y={y}&z={z}&key='+this.googleApiKey,
          'subdomains'  : ['a','b','c','d']
        }),
        new maptalks.TileLayer('Satellite',{
          'visible' : false,
          'urlTemplate': 'https://mt.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&key='+this.googleApiKey,
          'subdomains': ['a','b','c','d']
        })
      ])
    });

    // this.map.on('click',(e)=>{
    //   console.log(e.coordinate);
    // })
    this.renderMap();
    
  }
  
  renderMap(){
    this.addMarkers(this.markerPoint);
    this.addEquipments(this.equipPoint);
    this.connectMarkers(this.layer1Point,this.layer2Point,this.layer3Point);
  }
  
  addMarkers(value){
    this.markerLayer = new maptalks.VectorLayer('Circuits', {
      enableAltitude : true,
      drawAltitude : {
          lineWidth : 1,
          lineColor : '#000'
        }
    })
    .addTo(this.map);
    
    value.forEach(element => {
      var mrker = new maptalks.Marker(element.location,{
        properties:{
          altitude:80000,
          content:'',
          single:false,
        },
        symbol : [
          {
            // 'markerType'   : 'path',
            // 'markerPath'   : '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="40"><rect x="0" y="0" rx="20" ry="20" width="180" height="40" style="fill:black;stroke:black;" /><circle cx="160" cy="20" r="13" stroke="green" stroke-width="5" fill="#228B22" /><text text-anchor="middle"  fill="#ffffff" font-size="14" font-family="Verdana" font-weight="bold" x="45%" y="20">Ador</text><text text-anchor="middle" fill="#ffffff" font-size="10" font-family="Verdana" x="45%" y="32">sample</text></svg>',
            'markerFile'   : 'assets/img/maptalks/network.svg',
            'markerWidth'  : 28,
            'markerHeight' : 40
          }
        ]
      });
      mrker.on('mouseover',(e)=>{
        if(!this.infoWindow || !this.infoWindow.isVisible()){

          let x = e.target._coordinates.x+'&'+e.target._coordinates.y;
          var options = {
          'autoPan':false,
          'autoOpenOn' : false,  //set to null if not to open window when clicking on map
          'autoCloseOn' : 'mouseout',  //set to null if not to open window when clicking on map
          'single' : true,
          'width'  : 183,
          'height' : 105,
          'custom' : true,
          'dx' : 120,
          'dy' :0,
          'content'   : '<div class="marker-hover"><div class="mk-heading"><strong>Circuit: '+this.infoBoxData[x].name+'</strong></div>'+
          '<div class="mk-body">Longitude: '+ this.infoBoxData[x].location[0] +' Lattitude: '+this.infoBoxData[x].location[1]+'</div></div>'
        };
        this.infoWindow = new maptalks.ui.InfoWindow(options);
        setTimeout(() => {
          this.infoWindow.addTo(this.map).show(e.target._coordinates);
        }, 100);
      }
        //
        // mrker.setInfoWindow({
        //   'title'     : 'Circuit: '+this.infoBoxData[x].name,
        //   'content'   : 'Longitude: '+this.infoBoxData[x].location[0]+' \n Lattitude: '+this.infoBoxData[x].location[1],
        //   'autoPan': true,
        //   'autoOpenOn' : false, 
        //   'autoCloseOn' : 'click'
        // });
  
        // setTimeout(() => {
        //     mrker.openInfoWindow();
        // }, 100);
        //
      });
      mrker.on('mouseout',(e)=>{
        if(this.infoWindow.isVisible()){
          this.infoWindow.hide();
        }
      })

      this.markers.push(mrker);
      this.infoBoxData[element.location[0]+'&'+element.location[1]] = element;
    });
    
    this.markerLayer.addGeometry(this.markers);
    
  }

  addEquipments(value){
    this.equipmentLayer = new maptalks.VectorLayer('Equipments', {
      enableAltitude : true
    })
    .addTo(this.map);

    var markers = [];

    value.forEach(element => {
      var mrker = new maptalks.Marker(element.location,{
        properties:{
          single:false,
          altitude:10,
        },
        symbol : [
          {
            markerType : 'ellipse',
            markerWidth : 20,
            markerHeight : 20,
            markerFill : '#f00',
            markerLineWidth : 1
          }
        ]
      });
      mrker.on('click ',(e)=>{
        let x = e.target._coordinates.x+'&'+e.target._coordinates.y;
        mrker.setInfoWindow({
          'title'     : this.infoBoxDatax[x].name,
          'content'   : 'Longitude: '+this.infoBoxDatax[x].location[0]+' \n Lattitude: '+this.infoBoxDatax[x].location[1],
          'autoPan': true,
          'autoOpenOn' : false, 
          'autoCloseOn' : 'click'
        });
  
        setTimeout(() => {
            mrker.openInfoWindow();
        }, 100);
      })
      markers.push(mrker);
      this.infoBoxDatax[element.location[0]+'&'+element.location[1]] = element;
    });
    
    this.markerLayer.addGeometry(markers);
  }
  
  connectMarkers(layer1Point,layer2Point,layer3Point){
    this.connectLayer1(layer1Point);
    this.connectLayer2(layer2Point);
    this.connectLayer3(layer3Point);
    let x = [...this.layer1Line,...this.layer2Line,...this.layer3Line];
    new maptalks.VectorLayer('vectorLine', x , { enableAltitude : true }).addTo(this.map);
  }

  connectLayer1(layer1Point){
    this.layer1Line = [];
    layer1Point.forEach((element,index) => {
      
      this.layer1Line[index] =  new maptalks.MultiLineString([element], {
        symbol: {
          'lineColor' : '#686569',
          'lineWidth' : 2, 
        },
        properties : {
          'altitude' : 0
        }
      });
      this.layer1Line[index].on('click', (e)=>{
        let start = e.target._geometries[0]._coordinates[0];
        let end = e.target._geometries[0]._coordinates[e.target._geometries[0]._coordinates.length-1];
        let startname;
        let endname;
        this.markerPoint.forEach((element1)=>{
          if(element1.location[0] == start.x && element1.location[1] == start.y){
            startname = element1.name;
          }
          if(element1.location[0] == end.x && element1.location[1] == end.y){
            endname = element1.name;
          }
        });
        console.log(e.coordinate)
        this.openBox(startname,endname,e.coordinate,1,0)
      });
    });
  }

  connectLayer2(layer2Point){
    this.layer2Line = [];
    layer2Point.forEach((element,index) => {
      this.layer2Line[index] =  new maptalks.MultiLineString([element], {
        symbol: {
          'lineColor' : '#bd38cf',
          'lineWidth' : 2
        },
        properties : {
          'altitude' : 30000
        }
      });

      this.layer2Line[index].on('click', (e)=>{
        let start = e.target._geometries[0]._coordinates[0];
        let end = e.target._geometries[0]._coordinates[e.target._geometries[0]._coordinates.length-1];
        let startname;
        let endname;
        this.markerPoint.forEach((element1)=>{
          if(element1.location[0] == start.x && element1.location[1] == start.y){
            startname = element1.name;
          }
          if(element1.location[0] == end.x && element1.location[1] == end.y){
            endname = element1.name;
          }
        });
        this.openBox(startname,endname,e.coordinate,2,0)
      });
    });
  }

  connectLayer3(layer3Point){
    this.layer3Line = [];
    layer3Point.forEach((element,index) => {
      this.layer3Line[index] = new maptalks.MultiLineString([element],{
        symbol: {
          'lineColor' : '#4287f5',
          'lineWidth' : 2
        },
        properties : {
          'altitude' : 60000
        }  
      })
      this.layer3Line[index].on('click', (e)=>{
        let start = e.target._geometries[0]._coordinates[0];
        let end = e.target._geometries[0]._coordinates[e.target._geometries[0]._coordinates.length-1];
        let startname;
        let endname;
        this.markerPoint.forEach((element1)=>{
          if(element1.location[0] == start.x && element1.location[1] == start.y){
            startname = element1.name;
          }
          if(element1.location[0] == end.x && element1.location[1] == end.y){
            endname = element1.name;
          }
        });
        this.openBox(startname,endname,e.coordinate,3,0)
      });
    });
  }
  
  
  ngAfterViewInit(){
  }
  
  clear(){
    delete this.map;
    delete this.markerLayer;
    delete this.layer1Line;
    delete this.layer2Line;
    delete this.layer3Line;
    this.markers=[];
    
  }

  openBox(startname,endname,center,layer,index){
    var options = {
      'title'     : 'Layer '+layer,
      'content'   : startname+' - '+endname,
      single : true,
      autoCloseOn :'click',
      autoOpenOn :false,
      width:200,
      height:20
    };

    this.tooltip = new maptalks.ui.InfoWindow(options)

    setTimeout(() => {
      this.tooltip.addTo(this.map).show(center)
    }, 300);
  }
  
  @Input() layer1Point = [[[76.12622,34.55765],[76.03337816837552,33.678426484579035],[76.68086801114532,32.7485924454252],[76.27012266202269,31.69205723057442],[77.18076622564149,30.11867099535951],[77.23149,28.65195]],
  [[77.23149,28.65195],[75.69056960466901,26.561908363316746],[75.79883860108612,24.598056628990236],[74.07835509593042,23.29254188441294],[73.80646131676747,20.20171366211727],[72.88261,19.07283]],
  [[72.88261,19.07283],[73.43198675239034,17.97694076224812],[75.16681988062908,16.92619168473746],[75.37232909444447,14.97960866523303],[77.40948505333222,14.042499386489084],[77.59369,12.97194]],
  [[77.59369,12.97194,],[77.16539667498716,12.1053853244957],[77.8195309479695,11.304302171105036],[76.93876796643667,10.779295550372552],[77.4960818204205,8.884290712207331],[76.94924,8.4855]]]

  @Input() layer2Point = [[[76.12622,34.55765],[76.68086801114532,32.7485924454252],[76.27012266202269,31.69205723057442],[77.23149,28.65195]],
  [[77.23149,28.65195],[75.69056960466901,26.561908363316746],[74.07835509593042,23.29254188441294],[72.88261,19.07283]],
  [[72.88261,19.07283],[75.16681988062908,16.92619168473746],[77.40948505333222,14.042499386489084],[77.59369,12.97194]],
  [[77.59369,12.97194,],[76.93876796643667,10.779295550372552],[77.4960818204205,8.884290712207331],[76.94924,8.4855]]]

  // @Input() layer2Point = [[[76.12622,34.55765],[77.23149,28.65195]],[[77.23149,28.65195],[72.88261,19.07283]],[[72.88261,19.07283],[77.59369,12.97194]],[[77.59369,12.97194,],[76.94924,8.4855]]]

  openInfoBox(x){
    
  }

}
