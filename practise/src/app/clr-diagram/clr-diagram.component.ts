import { Component, OnInit, ElementRef, NgZone } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-clr-diagram',
  templateUrl: './clr-diagram.component.html',
  styleUrls: ['./clr-diagram.component.css']
})
export class ClrDiagramComponent implements OnInit {
  
  nodes = [{
    id:1,
    name:'Equipment',
    type:'star',
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
    id:2,
    name:'Equipment 2',
    type:'apple',
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
    id:3,
    name:'Equipment 3',
    type:'glasses',
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
    id:4,
    name:'Equipment 4',
    type:'star',
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
    id:5,
    name:'Equipment 5',
    type:'apple',
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
    id:6,
    name:'Equipment 6',
    type:'star',
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
    id:7,
    name:'Equipment 7',
    type:'star',
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
    id:8,
    name:'Equipment 8',
    type:'star',
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
    id:9,
    name:'Equipment 9',
    type:'star',
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
    id:10,
    name:'Equipment 10',
    type:'glasses',
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
    id:11,
    name:'Equipment 11',
    type:'apple',
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
    id:12,
    name:'Equipment 12',
    type:'apple',
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

  links = [
    {
      sourceLocation:'Equipment',
      targetLocation:'Equipment 2',
      linetype:'type1'
    },
    {
      sourceLocation:'Equipment 2',
      targetLocation:'Equipment 3',
      linetype:'type2'
    },
    {
      sourceLocation:'Equipment 3',
      targetLocation:'Equipment 4',
      linetype:'type3'
    },
    {
      sourceLocation:'Equipment 4',
      targetLocation:'Equipment 5',
      linetype:'type4'
    },
    {
      sourceLocation:'Equipment 5',
      targetLocation:'Equipment 6',
      linetype:'type5'
    },
    {
      sourceLocation:'Equipment 6',
      targetLocation:'Equipment 7',
      linetype:'type6'
    },
    {
      sourceLocation:'Equipment 7',
      targetLocation:'Equipment 8',
      linetype:'type7'
    },
    {
      sourceLocation:'Equipment 8',
      targetLocation:'Equipment 9',
      linetype:'type8'
    },
    {
      sourceLocation:'Equipment 9',
      targetLocation:'Equipment 10',
      linetype:'type9'
    },
    {
      sourceLocation:'Equipment 10',
      targetLocation:'Equipment 11',
      linetype:'type10'
    },
    {
      sourceLocation:'Equipment 11',
      targetLocation:'Equipment 12',
      linetype:'type11'
    }
  ];

  
  constructor(private elementRef: ElementRef, private zone: NgZone) {
    window["glabalback"] = (e) => {
      zone.run(() => {
        this.onClickingBox(e);
      });
    }
   }
  
   onClickingBox(e){
     console.log(e);
   }

  ngOnInit() {

    
    var logos = {
      star: "M14.615,4.928c0.487-0.986,1.284-0.986,1.771,0l2.249,4.554c0.486,0.986,1.775,1.923,2.864,2.081l5.024,0.73c1.089,0.158,1.335,0.916,0.547,1.684l-3.636,3.544c-0.788,0.769-1.28,2.283-1.095,3.368l0.859,5.004c0.186,1.085-0.459,1.553-1.433,1.041l-4.495-2.363c-0.974-0.512-2.567-0.512-3.541,0l-4.495,2.363c-0.974,0.512-1.618,0.044-1.432-1.041l0.858-5.004c0.186-1.085-0.307-2.6-1.094-3.368L3.93,13.977c-0.788-0.768-0.542-1.525,0.547-1.684l5.026-0.73c1.088-0.158,2.377-1.095,2.864-2.081L14.615,4.928z",
      apple: "M24.32,10.85c-1.743,1.233-2.615,2.719-2.615,4.455c0,2.079,1.078,3.673,3.232,4.786c-0.578,1.677-1.416,3.134-2.514,4.375c-1.097,1.241-2.098,1.862-3.004,1.862c-0.427,0-1.009-0.143-1.748-0.423l-0.354-0.138c-0.725-0.281-1.363-0.423-1.92-0.423c-0.525,0-1.1,0.11-1.725,0.331l-0.445,0.16l-0.56,0.229c-0.441,0.176-0.888,0.264-1.337,0.264c-1.059,0-2.228-0.872-3.507-2.616c-1.843-2.498-2.764-5.221-2.764-8.167c0-2.095,0.574-3.781,1.725-5.061c1.149-1.279,2.673-1.92,4.568-1.92c0.709,0,1.371,0.13,1.988,0.389l0.423,0.172l0.445,0.183c0.396,0.167,0.716,0.251,0.959,0.251c0.312,0,0.659-0.072,1.04-0.217l0.582-0.229l0.435-0.16c0.693-0.251,1.459-0.377,2.297-0.377C21.512,8.576,23.109,9.334,24.32,10.85zM19.615,3.287c0.021,0.267,0.033,0.473,0.033,0.617c0,1.317-0.479,2.473-1.438,3.467s-2.075,1.49-3.347,1.49c-0.038-0.297-0.058-0.51-0.058-0.639c0-1.12,0.445-2.171,1.337-3.153c0.891-0.982,1.922-1.558,3.096-1.725C19.32,3.329,19.447,3.311,19.615,3.287z",
      glasses: "M14.075,9.531c0,0-2.705-1.438-5.158-1.438c-2.453,0-4.862,0.593-4.862,0.593L3.971,9.869c0,0,0.19,0.19,0.528,0.53c0.338,0.336,0.486,3.741,1.838,5.094c1.353,1.354,4.82,1.396,5.963,0.676c1.14-0.718,2.241-3.466,2.241-4.693c0-0.38,0-0.676,0-0.676c0.274-0.275,1.615-0.303,1.917,0c0,0,0,0.296,0,0.676c0,1.227,1.101,3.975,2.241,4.693c1.144,0.72,4.611,0.678,5.963-0.676c1.355-1.353,1.501-4.757,1.839-5.094c0.338-0.34,0.528-0.53,0.528-0.53l-0.084-1.183c0,0-2.408-0.593-4.862-0.593c-2.453,0-5.158,1.438-5.158,1.438C16.319,9.292,14.737,9.32,14.075,9.531z"
    };
    
    var height = (Math.ceil(this.nodes.length/4)*400)+100;
    var width = window.innerWidth-100;
    this.setNodes(width)
    let pos = 90;
    this.setLinks();

    // Create SVG Element
    var svg = d3.select("#foo")
    .append('svg')
    .attr('width',width)
    .attr('height',height)
    .attr("class", "graph-svg");
    
    var x=10,y=10;

    // Bind Node Data
    var nodes = svg.selectAll('rect')
    .data(this.nodes)
    .enter()
    .append('svg')
    .classed('foobar',true)
    .attr('x', function(d,i){
      return d['x'];
    })
    .attr('y',function(d,i){
      return d['y'];
    })
    .attr('width',90)
    .attr('height',90)
    .append("path")
    .attr("d", function(d) {
      return logos[d.type];
    })
    .attr("transform", "scale(3)")

    // Draw Lines 
    var link = svg.selectAll('link')
    .data(this.links)
    .enter()
    .append('line')
    .attr('class','link')
    .attr('x1', function(d,i){
      if(i%4 == 3){
        if(Math.floor(i/4)%2 == 0){
          return d['source'][0]+pos;
        } else{
          return d['source'][0];
        }
      } else {
        if(Math.floor(i/4)%2 == 0){
          return d['source'][0]+pos;
        } else {
          return d['source'][0];
        }
      }
    })
    .attr('y1', function(d,i){
      if(i%4 == 3){
        if(Math.floor(i/4)%2 == 0){
          return d['source'][1]+pos/2;
        } else{
          return d['source'][1]+pos/2;
        }
      } else {
        if(Math.floor(i/4)%2 == 0){
          return d['source'][1]+pos/2;
        } else {
          return d['source'][1]+pos/2;
        }
      }
    })
    .attr('x2', function(d,i){
      if(i%4 == 3){
        if(Math.floor(i/4)%2 == 0){
          return d['target'][0]+pos;
        } else{
          return d['target'][0];
        }
      } else {
        if(Math.floor(i/4)%2 == 0){
          return d['target'][0];
        } else {
        }
        return d['target'][0]+pos;
      }
    })
    .attr('y2', function(d,i){
      if(i%4 == 3){
        if(Math.floor(i/4)%2 == 0){
          return d['target'][1]+pos/2;
        } else{
          return d['target'][1]+pos/2;
        }
      } else {
        if(Math.floor(i/4)%2 == 0){
          return d['target'][1]+pos/2;
        } else {
          return d['target'][1]+pos/2;
        }
      }
    })
    .attr("fill", "none")
    .attr("stroke", "blue")
    .lower;
    
    // Bind Node Display Data 
    var nodeInfo = svg.selectAll('div')
    .data(this.nodes)
    .enter()
    .append('svg')
    .classed('infoDisplay',true)
    .html(function(value){
      let html = '<g id="infoBoxx">'+
      '<rect rx="15" id="svg_2" height="270" width="240" y="0" x="-0.5" stroke-width="2" fill="#000000"/>'+
      '<rect rx="15" id="svg_7" height="100" width="240" y="171" x="0" stroke-width="2" fill="#777676"/>'+
      '<rect id="svg_8" height="20" width="240" y="170.05" x="-0.5" stroke-width="2" fill="#777676"/>'+
      '<text style="cursor: move;" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_12" y="15.05" x="9.5" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">NF Name</text>'+
      '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_13" y="55.05" x="9.5" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">TID</text>'+
      '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_14" y="95.05" x="9.5" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">CLU</text>'+
      '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_15" y="95.05" x="124.5" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">NE Type</text>'+
      '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_16" y="135.05" x="9.5" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">Vendor</text>'+
      '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_17" y="135.05" x="124.5" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">Model</text>'+
      '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_18" y="190.05" x="9.5" stroke-width="0" fill="#c5c1c1">State</text>'+
      '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_19" y="190.05" x="124.5" stroke-width="0" fill="#c5c1c1">Subnet</text>'+
      '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_20" y="230.05" x="9.5" stroke-width="0" fill="#c5c1c1">End</text>'+
      '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_23" y="230.05" x="124.5" stroke-width="0" fill="#c5c1c1">Port</text>'+
      '<rect id="svg_24" height="28" width="27" y="220.05" x="195.5" fill-opacity="null" stroke-opacity="null" stroke-width="2" stroke="null" fill="#000000"/>'+
      '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="13" id="svg_27" y="34.8" x="19.5" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1" style="text-decoration: underline;" onclick="infoClick(\'NF Name\',\''+value.label+'\')">'+value.label+'</text>'+
      '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="13" id="svg_37" y="74.8" x="19.5" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">'+value.label2+'<title>'+value.label2+'</title></text>'+
      '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="13" id="svg_36" y="114.8" x="19.5" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">'+value.label3+'</text>'+
      '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="13" id="svg_39" y="114.8" x="129.5" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">'+value.label4+'</text>'+
      '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="13" id="svg_35" y="154.8" x="19.5" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">'+value.label5+'</text>'+
      '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="13" id="svg_30" y="154.8" x="129.5" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">'+value.label6+'</text>'+
      '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="13" id="svg_34" y="209.8" x="19.5" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">'+value.label7+'</text>'+
      '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="13" id="svg_31" y="209.8" x="129.5" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">'+value.label8+'</text>'+
      '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="13" id="svg_32" y="249.8" x="19.5" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">'+value.label9+'</text>'+
      '<text font-style="normal" font-weight="normal" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="13" id="svg_33" y="249.8" x="129.5" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">'+value.label10+'</text>'+
     '</g>'
      return html;
    })
    .attr('x', function(d,i){
      return d['x']-60;
    })
    .attr('y',function(d,i){
      return d['y']+100;
    })
    .attr('width',240)
    .attr('height',270)
  }
  

  setLinks(){
    this.links.forEach((element,i)=>{
      this.nodes.forEach((element1)=>{
        if(element.sourceLocation == element1.name){
          element['source']=[element1['x'],element1['y']]
        }
        if(element.targetLocation == element1.name){
          element['target']=[element1['x'],element1['y']]
        }
      })
    })

    console.log(this.links)
  }

  setNodes(width){
    let pos = width/4;
    let innerPos = pos/3;
    this.nodes.forEach((element,i)=>{
      if(Math.floor(i/4)%2 == 0){
        element['x'] = (i%4)*pos+innerPos;
        element['y'] = (Math.floor(i/4))*400 +100;
      } else {
        element['x'] = (3-(i%4))*pos+innerPos;
        element['y'] = (Math.floor(i/4))*400 +100;
      }
    })
    return pos;
  }

  infoHTML(value){
    let HTML ='<g>'+
     '<rect rx="15" id="svg_2" height="270" width="240" y="0" x="-0.5" stroke-width="2" fill="#000000"/>'+
     '<rect rx="15" id="svg_7" height="100" width="240" y="171" x="0" stroke-width="2" fill="#777676"/>'+
     '<rect id="svg_8" height="20" width="240" y="170.05" x="-0.5" stroke-width="2" fill="#777676"/>'+
     '<text style="cursor: move;" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_12" y="15.05" x="9.5" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">NF Name</text>'+
     '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_13" y="55.05" x="9.5" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">TID</text>'+
     '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_14" y="95.05" x="9.5" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">CLU</text>'+
     '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_15" y="95.05" x="124.5" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">NE Type</text>'+
     '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_16" y="135.05" x="9.5" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">Vendor</text>'+
     '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_17" y="135.05" x="124.5" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">Model</text>'+
     '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_18" y="190.05" x="9.5" stroke-width="0" fill="#c5c1c1">State</text>'+
     '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_19" y="190.05" x="124.5" stroke-width="0" fill="#c5c1c1">Subnet</text>'+
     '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_20" y="230.05" x="9.5" stroke-width="0" fill="#c5c1c1">End</text>'+
     '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_23" y="230.05" x="124.5" stroke-width="0" fill="#c5c1c1">Port</text>'+
     '<rect id="svg_24" height="28" width="27" y="220.05" x="195.5" fill-opacity="null" stroke-opacity="null" stroke-width="2" stroke="null" fill="#000000"/>'+ 
     '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="13" id="svg_27" y="34.8" x="19.5" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1" style="text-decoration: underline;" onclick="infoClick(\'NF Name\','+value.label+')">>'+value.label+'</text>'+
     '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="13" id="svg_37" y="74.8" x="19.5" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">'+value.label2+'</text>'+
     '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="13" id="svg_36" y="114.8" x="19.5" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">'+value.label3+'</text>'+
     '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="13" id="svg_39" y="114.8" x="129.5" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">'+value.label4+'</text>'+
     '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="13" id="svg_35" y="154.8" x="19.5" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">'+value.label5+'</text>'+
     '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="13" id="svg_30" y="154.8" x="129.5" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">'+value.label6+'</text>'+
     '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="13" id="svg_34" y="209.8" x="19.5" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">'+value.label7+'</text>'+
     '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="13" id="svg_31" y="209.8" x="129.5" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">'+value.label8+'</text>'+
     '<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="13" id="svg_32" y="249.8" x="19.5" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">'+value.label9+'</text>'+
     '<text font-style="normal" font-weight="normal" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="13" id="svg_33" y="249.8" x="129.5" stroke-opacity="null" stroke-width="0" stroke="null" fill="#c5c1c1">'+value.label10+'</text>'+
    '</g>'

   return HTML;
  }
}
