import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import * as dagre from 'dagre';
import { LiteralExpr } from '@angular/compiler';

@Component({
  selector: 'app-clr-graph',
  templateUrl: './clr-graph.component.html',
  styleUrls: ['./clr-graph.component.css']
})
export class ClrGraphComponent implements OnInit {
  @Input() nodes = [];
  @Input() links = [];
  
  lineoffset = {
    point:[66,-2],
    equipment:[84,18]
  }

  fields=[
    'neName',
    'TID',
    'CLLI',
    'neType',
    'vendor',
    'model',
    'shelf0',
    'shelf1',
    'slot0',
    'slot1',
    'subSlot0',
    'subSlot1',
    'port0',
    'port1'
  ]
  width: number;
  height: number;

  constructor() { }
  
  ngOnInit(): void {
  // Prepare Data
  var detailsBox = this.detailsBox
  var lineStyle = this.lineStyle;
  var logos = this.logoos;
  var offset = {
    point:0,
    equipment:12,
    graph:0,
    line:33
  }
  
  var lineBox = this.lineBox;
  this.width = this.nodes.length*300+50;
  this.height = 2000;


  this.setNodesAndLinks()
  // this.setLinks()
  
  //Create SVG Element
  var svg = d3.select("#clr-graph")
  .append('svg')
  .attr('width',this.width)
  .attr('height',this.height)
  .attr("class", "graph-svg");
  
// Bind Node Data 
var nodes = svg.selectAll('node')
.data(this.nodes)
.enter()
.append('g')
.classed('node',true)
.append('svg')
.attr('x', function(d){
  return d['x'];
})
.attr('y',function(d){
  return d['y']+offset[d.type];
})
.attr('width',90)
.attr('height',90)
.classed('node-icon',true)
.html(function(d){
  return logos[d.type]
})


const curve = d3.line().curve(d3.curveNatural);
const line = d3.line().context(null);
  // Link Nodes 
  var link = svg.selectAll('link')
  .data(this.links)
  .enter() 
  .append('g')
  .classed('link',true)
  .attr('class', function(d){
    return 'link '+d['linetype']
  })
  .append('path')
  .attr('id',(d,i)=>{
    return 'line'+i
  })
  .attr('d', function(d){
    if(d['linetype'] == 'Cable'){
      var linearScalex = d3.scaleLinear()
      .domain([1, 7])
      .range([d['source'][0],d['target'][0]]);
      var linearScaley = d3.scaleLinear()
        .domain([1, 7])
        .range([d['source'][1],d['target'][1]]);
      let x = 3;
      return curve([[linearScalex(1),linearScaley(1)+offset['line']],[linearScalex(2),linearScaley(2)+offset['line']+x],[linearScalex(3),linearScaley(3)+offset['line']],[linearScalex(4),linearScaley(4)+offset['line']-x],[linearScalex(5),linearScaley(5)+offset['line']],[linearScalex(6),linearScaley(6)+offset['line']+x],[linearScalex(7),linearScaley(7)+offset['line']]]);
    } else {
      return curve([[d['source'][0],d['source'][1]+offset['line']],[d['target'][0],d['target'][1]+offset['line']]])
    }
  })
  .attr("fill", "none")
  .attr("stroke", function(d){
    return lineStyle[d.linetype]['stroke']
  })
  .attr("stroke-dasharray", function(d){
    return lineStyle[d['linetype']]['stroke-dasharray']
  })
  .attr("stroke-width",function(d){
    if(d['linetype'] == 'Cable'){
      return 2;
    } else {
      return 3;
    }
  })

  d3.selectAll('.Cable').append('path')
      .attr('d',function(d){
        var linearScalex = d3.scaleLinear()
        .domain([1, 7])
        .range([d['source'][0],d['target'][0]]);
        var linearScaley = d3.scaleLinear()
        .domain([1, 7])
        .range([d['source'][1],d['target'][1]]);
        let x = 3;
        return curve([[linearScalex(1),linearScaley(1)+offset['line']],[linearScalex(2),linearScaley(2)+offset['line']-x],[linearScalex(3),linearScaley(3)+offset['line']],[linearScalex(4),linearScaley(4)+offset['line']+x],[linearScalex(5),linearScaley(5)+offset['line']],[linearScalex(6),linearScaley(6)+offset['line']-x],[linearScalex(7),linearScaley(7)+offset['line']]])
      })
      .attr("fill", "none")
      .attr("stroke",'green')
      .attr("stroke-width",2)


      // Bind Node Details 
var infoDetails = svg.selectAll('.node')
.append('svg')
.classed('infoDisplay',true)
.html(detailsBox)
.attr('x', function(d){
  return d['x']-70;
})
.attr('y',function(d){
  return d['y']+70; 
})
.attr('width',260)
.attr('height',300)

this.fields.forEach(element => {
  
  infoDetails.select('#'+element)
  .text(function(d){
    return d[element];
  })

  if(element == 'neName' || element == 'TID' || element == 'CLLI'){
    infoDetails.select('#'+element)
    .attr('style','cursor:pointer')
    .on('click',this.clickInfoBox.bind(this,element));
  }
    
  infoDetails.select('#'+element)
  .append('title')
  .text(function(d){
    return d[element];
  });
});
 


  // .append('line')
  // .attr('x1', function(d,i){
  //   return d['source'][0]
  // })
  // .attr('y1', function(d,i){
  //   return d['source'][1]+offset['line']
  // })
  // .attr('x2', function(d,i){
  //   return d['target'][0];
  // })
  // .attr('y2', function(d,i){
  //   return d['target'][1]+offset['line'];
  // })
  
  
  // Add Text To Line
  d3.selectAll('.link')
  .insert('text')
  .append('textPath')
  .attr('xlink:href',function(d,i){
    return '#line'+i;
  })
  .attr('startOffset','50%')
  .attr('text-anchor','middle')
  // .attr('x',function(d){
  //   return ((d['source'][0]+d['target'][0])/2)-(d['linetype'].length*4)
  // })
  // .attr('y',function(d){
  //   return d['source'][1]+55  
  // })
  .text(function(d){
    return d['linetype'];
  })
  
  // Add Line Info Box
  // var infoIconBox = svg.selectAll('.link')
  // .append('g')
  // .classed('link-graphs',true)
  // .append('svg')
  // .classed('info-links',true)
  // .html( function(d){
  //   if(d['display'] == 'Yes'){
  //     return lineBox[d['linetype']]
  //   } else {
  //     return '';
  //   }
  // })
  // .attr('x',function(d){
  //   return d['source'][0];
  // })
  // .attr('y',function(d){
  //   return 40
  // })
  // .attr('width',210)
  // .attr('height',130)

  // this.lineBoxField.forEach((element)=>{
    
  //   infoIconBox.select('#'+element)
  //   .text(function(d){
  //     return d[element];
  //   })

  //   if(element == 'circuitName' || element == 'segmentName' || element == 'cableName'){
  //     infoIconBox.select('#'+element)
  //     .attr('style','cursor:pointer')
  //     .on('click',this.clickInfoBox.bind(this,element));
  //   }
      
  //   infoIconBox.select('#'+element)
  //   .append('title')
  //   .text(function(d){
  //     return d[element];
  //   });
    
  // })

  // Bind Left Graph Icon 
  var leftGraphIcon = d3.selectAll('.link-graphs')
  .append('svg')
  .classed('left-graph',true)
  .attr('x', function(d){
    return d['source'][0]+5;
  })
  .attr('y',function(d){
    return d['source'][1]+5;
  })
  .html(logos['graph'])
  .attr('style','cursor:pointer;')
  .on('click', this.graphClick.bind(this,'source'))

  // Bind Right Graph Icon 
  var rightGraphIcon = d3.selectAll('.link-graphs')
  .append('svg')
  .classed('right-graph',true)
  .attr('x', function(d){
    return d['target'][0]-22;
  })
  .attr('y',function(d){
    return d['target'][1]+5;
  })
  .html(logos['graph'])
  .attr('style','cursor:pointer;')
  .on('click', this.graphClick.bind(this,'target'))
  
  }

clickInfoBox(field,data){
console.log(field,data[field],data)
}

graphClick(position,data){
  if(position == 'target'){
    alert(data[position+'Location'] +' -Reciever')
  } else {
    alert(data[position+'Location']+' -Transmitter')
  }
}

setNodes(){
  let x = 100,y=200,width=300
  this.nodes.forEach((element,i)=>{
      element['x'] = i*width+x;
      element['y'] = y
    })
  }
  
  setLinks(){
    this.links.forEach((element,i)=>{
      this.nodes.forEach((element1)=>{
        if(element.sourceLocation == element1.name){
          element['source']=[element1['x']+this.lineoffset[element1.type][0],element1['y']]
        }
        if(element.targetLocation == element1.name){
          element['target']=[element1['x']+this.lineoffset[element1.type][1],element1['y']]
        }
      })
    })
  }

  equipSize = {
    point:{
      width:220,
      height:360
    },
    equipment:{
      width:220,
      height:360
    }
  }

  edgeofset = {
    point:{
      source:10,
      target:10
    },
    equipment:{
      source:10,
      target:10
    }
  }

  setNodesAndLinks(){
    var g = new dagre.graphlib.Graph();
    var nodeoff ={}
    g.setGraph({
      rankdir:'LR',
      ranksep:400,
      nodesep:100,
      marginx:50,
      marginy:10,
    });
    g.setDefaultEdgeLabel(function() { return {}; });

    this.nodes.forEach((element)=>{
      g.setNode(element.name,{
        ...element,
        width:this.equipSize[element.type].width,
        height:this.equipSize[element.type].height
      })
    })

    this.links.forEach((element)=>{
      g.setEdge(element.sourceLocation,element.targetLocation);
    })

    dagre.layout(g);
    
    let x=0,y=0
    g.nodes().forEach((v,i) => {
      let coord = g.node(v)
      if(x<coord.x){
        x = coord.x
      }

      if(x<coord.y){
      y = coord.y
      }
      this.nodes[i] = coord;
      // console.log("Node " + v + ": " + JSON.stringify(g.node(v)));
 });

      this.width = x+300;
      this.height = y+1000;



 g.edges().forEach((e,i)=> {
   let edge = g.edge(e)
   let x = 0
   this.links[i]['points'] = [edge.points]
    });

    this.links.forEach((element,i)=>{
      this.nodes.forEach((element1)=>{
        if(element.sourceLocation == element1.name){
          element['source']=[element1['x']+this.lineoffset[element1.type][0],element1['y']]
        }
        if(element.targetLocation == element1.name){
          element['target']=[element1['x']+this.lineoffset[element1.type][1],element1['y']]
        }
      })
    })
  }
  
  
  
lineStyle={
  Patch:{
    'stroke':'orange',
    'stroke-dasharray':'0', 
  },
  Circuit:{
    'stroke':'blue',
    'stroke-dasharray':'5 2', 
  },
  Segment:{
    'stroke':'yellow',
    'stroke-dasharray':'0', 
  },
  Cable:{
    'stroke':'red',
    'stroke-dasharray':'0', 
  }
}

logos ={
  point:'M 0.00,0.00 C 0.00,0.00 108.00,0.00 108.00,0.00 108.00,0.00 108.00,108.00 108.00,108.00 108.00,108.00 0.00,108.00 0.00,108.00 0.00,108.00 0.00,0.00 0.00,0.00 Z',
  equipment:'M 0.00,0.00 C 0.00,0.00 108.00,0.00 108.00,0.00 108.00,0.00 108.00,70.00 108.00,70.00 108.00,70.00 0.00,70.00 0.00,70.00 0.00,70.00 0.00,0.00 0.00,0.00 Z',
  graph:'M 0.00,0.00 C 0.00,0.00 24.00,0.00 24.00,0.00 24.00,0.00 24.00,24.00 24.00,24.00 24.00,24.00 0.00,24.00 0.00,24.00 0.00,24.00 0.00,0.00 0.00,0.00 Z'
}
  
logoos = {
  point:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="108" height="108" viewBox="0 0 180 180"><image id="Image_20" data-name="Image 20" width="108" height="108" xlink:href="data:image/png;base64,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ESBAgACBCQIKwISUzEiAAAECBDYLKACbQR1HgAABAgQmCCgAE1IyIwECBAgQ2CygAGwGdRwBAgQIEJggoABMSMmMBAgQIEBgs4ACsBnUcQQIECBAYIKAAjAhJTMSIECAAIHNAgrAZlDHESBAgACBCQIKwISUzEiAAAECBDYLKACbQR1HgAABAgQmCCgAE1IyIwECBAgQ2CygAGwGdRwBAgQIEJggoABMSMmMBAgQIEBgs4ACsBnUcQQIECBAYIKAAjAhJTMSIECAAIHNAgrAZlDHESBAgACBCQIKwISUzEiAAAECBDYLKACbQR1HgAABAgQmCCgAE1IyIwECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNoJfA5P9HX4/V5PgAABAgROChz7e/jXya29mwABAgQIEDgjoACccfdWAgQIECBwVEABOMrv5QQIECBA4IyAAnDG3VsJECBAgMBRAQXgKL+XEyBAgACBMwIKwBl3byVAgAABAkcFFICj/F5OgAABAgTOCCgAZ9y9lQABAgQIHBVQAI7yezkBAgQIEDgjoACccfdWAgQIECBwVEABOMrv5QQIECBA4IyAAnDG3VsJECBAgMBRAQXgKL+XEyBAgACBMwIKwBl3byVAgAABAkcFFICj/F5OgAABAgTOCCgAZ9y9lQABAgQIHBVQAI7yezkBAgQIEDgjoACccfdWAgQIECBwVEABOMrv5QQIECBA4IyAAnDG3VsJECBAgMBRAQXgKL+XEyBAgACBMwIKwBl3byVAgAABAkcFFICj/F5OgAABAgTOCCgAZ9y9lQABAgQIHBVQAI7yezkBAgQIEDgjoACccfdWAgQIECBwVEABOMrv5QQIECBA4IyAAnDG3VsJECBAgMBRAQXgKL+XEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAYKrA53vwr6nDm5sAAQIECBBYE/i19pinCBAgQIAAgckCCsDk9MxOgAABAgQWBRSARTiPESBAgACByQIKwOT0zE6AAAECBBYFFIBFOI8RIECAAIHJAgrA5PTMToAAAQIEFgUUgEU4jxEgQIAAgckCCsDk9MxOgAABAgQWBRSARTiPESBAgACByQIKwOT0zE6AAAECBBYFFIBFOI8RIECAAIHJAgrA5PTMToAAAQIEFgUUgEU4jxEgQIAAgckCCsDk9MxOgAABAgQWBRSARTiPESBAgACByQIKwOT0zE6AAAECBBYFFIBFOI8RIECAAIHJAgrA5PTMToAAAQIEFgUUgEU4jxEgQIAAgckCCsDk9MxOgAABAgQWBRSARTiPESBAgACByQIKwOT0zE6AAAECBBYFFIBFOI8RIECAAIHJAgrA5PTMToAAAQIEFgUUgEU4jxEgQIAAgckCCsDk9MxOgAABAgQWBRSARTiPESBAgACByQIKwOT0zE6AAAECBBYFFIBFOI8RIECAAIHJAgrA5PTMToAAAQIEFgUUgEU4jxEgQIAAgckCCsDk9MxOgAABAgQWBRSARTiPESBAgACByQIKwOT0zE6AAAECBBYFFIBFOI8RIECAAIHJAgrA5PTMToAAAQIEFgUUgEU4jxEgQIAAgckCCsDk9MxOgAABAgQWBRSARTiPESBAgACByQK/Jw//g9k/P3j2J49+/eThHzxr3x/g/YtHT+X7L0a84n899T1fgWeJV4G4P79+AXj9FtwgQIAAAQL3CigA92ZrMwIECBAg8CqgALzSuEGAAAECBO4VUADuzdZmBAgQIEDgVUABeKVxgwABAgQI3CugANybrc0IECBAgMCrgALwSuMGAQIECBC4V0ABuDdbmxEgQIAAgVcBBeCVxg0CBAgQIHCvgAJwb7Y2I0CAAAECrwIKwCuNGwQIECBA4F4BBeDebG1GgAABAgReBRSAVxo3CBAgQIDAvQIKwL3Z2owAAQIECLwKKACvNG4QIECAAIF7BRSAe7O1GQECBAgQeBVQAF5p3CBAgAABAvcKKAD3ZmszAgQIECDwKqAAvNK4QYAAAQIE7hVQAO7N1mYECBAgQOBVQAF4pXGDAAECBAjcK6AA3JutzQgQIECAwKuAAvBK4wYBAgQIELhXQAG4N1ubESBAgACBVwEF4JXGDQIECBAgcK+AAnBvtjYjQIAAAQKvAgrAK40bBAgQIEDgXgEF4N5sbUaAAAECBF4FFIBXGjcIECBAgMC9Ap/v1b7uXc9mBAgQIECAwJOAXwCeVFwjQIAAAQKXCygAlwdsPQIECBAg8CSgADypuEaAAAECBC4XUAAuD9h6BAgQIEDgSUABeFJxjQABAgQIXC6gAFwesPUIECBAgMCTgALwpOIaAQIECBC4XEABuDxg6xEgQIAAgScBBeBJxTUCBAgQIHC5gAJwecDWI0CAAAECTwIKwJOKawQIECBA4HIBBeDygK1HgAABAgSeBBSAJxXXCBAgQIDA5QIKwOUBW48AAQIECDwJKABPKq4RIECAAIHLBRSAywO2HgECBAgQeBJQAJ5UXCNAgAABApcLKACXB2w9AgQIECDwJKAAPKm4RoAAAQIELhdQAC4P2HoECBAgQOBJQAF4UnGNAAECBAhcLqAAXB6w9QgQIECAwJOAAvCk4hoBAgQIELhcQAG4PGDrESBAgACBJwEF4EnFNQIECBAgcLmAAnB5wNYjQIAAAQJPAgrAk4prBAgQIEDgcgEF4PKArUeAAAECBJ4EFIAnFdcIECBAgMDlAgrA5QFbjwABAgQIPAkoAE8qrhEgQIAAgcsFFIDLA7YeAQIECBB4ElAAnlRcI0CAAAEClwsoAJcHbD0CBAgQIPAkoAA8qbhGgAABAgQuF1AALg/YegQIECBA4ElAAXhScY0AAQIECFwuoABcHrD1CBAgQIDAk4AC8KTiGgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAj8g8DnH+5X3/6qfoHzCRAgQIBAY4Fjfw//aoxiNAIECBAgQKBIQAEognUsAQIECBDoLKAAdE7HbAQIECBAoEhAASiCdSwBAgQIEOgsoAB0TsdsBAgQIECgSEABKIJ1LAECBAgQ6CygAHROx2wECBAgQKBIQAEognUsAQIECBDoLKAAdE7HbAQIECBAoEhAASiCdSwBAgQIEOgsoAB0TsdsBAgQIECgSEABKIJ1LAECBAgQ6CygAHROx2wECBAgQKBIQAEognUsAQIECBDoLKAAdE7HbAQIECBAoEhAASiCdSwBAgQIEOgsoAB0TsdsBAgQIECgSEABKIJ1LAECBAgQ6CygAHROx2wECBAgQKBIQAEognUsAQIECBDoLKAAdE7HbAQIECBAoEhAASiCdSwBAgQIEOgsoAB0TsdsBAgQIECgSEABKIJ1LAECBAgQ6CygAHROx2wECBAgQKBIQAEognUsAQIECBDoLKAAdE7HbAQIECBAoEhAASiCdSwBAgQIEOgsoAB0TsdsBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQaCvw+Z7sq+10BiNAgAABAgRKBH6VnOpQAgQIECBAoLWAAtA6HsMRIECAAIEaAQWgxtWpBAgQIECgtYAC0DoewxEgQIAAgRoBBaDG1akECBAgQKC1gALQOh7DESBAgACBGgEFoMbVqQQIECBAoLWAAtA6HsMRIECAAIEaAQWgxtWpBAgQIECgtYAC0DoewxEgQIAAgRoBBaDG1akECBAgQKC1gALQOh7DESBAgACBGgEFoMbVqQQIECBAoLWAAtA6HsMRIECAAIEaAQWgxtWpBAgQIECgtYAC0DoewxEgQIAAgRoBBaDG1akECBAgQKC1gALQOh7DESBAgACBGgEFoMbVqQQIECBAoLWAAtA6HsMRIECAAIEaAQWgxtWpBAgQIECgtYAC0DoewxEgQIAAgRoBBaDG1akECBAgQKC1gALQOh7DESBAgACBGgEFoMbVqQQIECBAoLWAAtA6HsMRIECAAIEaAQWgxtWpBAgQIECgtYAC0DoewxEgQIAAgRoBBaDG1akECBAgQKC1gALQOh7DESBAgACBGgEFoMbVqQQIECBAoLWAAtA6HsMRIECAAIEaAQWgxtWpBAgQIECgtYAC0DoewxEgQIAAgRoBBaDG1akECBAgQKC1gALQOh7DESBAgACBGgEFoMbVqQQIECBAoLWAAtA6HsMRIECAAIEaAQWgxtWpBAgQIECgtcDv1tPVDfepO/pvT/7627t1N+1bZ/vXk0/l+9cZEv771PecYJu8Y9yfX78AJH/udidAgACBWAEFIDZ6ixMgQIBAsoACkJy+3QkQIEAgVkABiI3e4gQIECCQLKAAJKdvdwIECBCIFVAAYqO3OAECBAgkCygAyenbnQABAgRiBRSA2OgtToAAAQLJAgpAcvp2J0CAAIFYAQUgNnqLEyBAgECygAKQnL7dCRAgQCBWQAGIjd7iBAgQIJAsoAAkp293AgQIEIgVUABio7c4AQIECCQLKADJ6dudAAECBGIFFIDY6C1OgAABAskCCkBy+nYnQIAAgVgBBSA2eosTIECAQLKAApCcvt0JECBAIFZAAYiN3uIECBAgkCygACSnb3cCBAgQiBVQAGKjtzgBAgQIJAsoAMnp250AAQIEYgUUgNjoLU6AAAECyQIKQHL6didAgACBWAEFIDZ6ixMgQIBAsoACkJy+3QkQIEAgVkABiI3e4gQIECCQLKAAJKdvdwIECBCIFfh8b/4Vu73FCRAgQIBAqIBfAEKDtzYBAgQIZAsoANn5254AAQIEQgUUgNDgrU2AAAEC2QIKQHb+tidAgACBUAEFIDR4axMgQIBAtoACkJ2/7QkQIEAgVEABCA3e2gQIECCQLaAAZOdvewIECBAIFVAAQoO3NgECBAhkCygA2fnbngABAgRCBRSA0OCtTYAAAQLZAgpAdv62J0CAAIFQAQUgNHhrEyBAgEC2gAKQnb/tCRAgQCBUQAEIDd7aBAgQIJAtoABk5297AgQIEAgVUABCg7c2AQIECGQLKADZ+dueAAECBEIFFIDQ4K1NgAABAtkCCkB2/rYnQIAAgVABBSA0eGsTIECAQLaAApCdv+0JECBAIFRAAQgN3toECBAgkC2gAGTnb3sCBAgQCBVQAEKDtzYBAgQIZAsoANn5254AAQIEQgUUgNDgrU2AAAEC2QIKQHb+tidAgACBUAEFIDR4axMgQIBAtoACkJ2/7QkQIEAgVEABCA3e2gQIECCQLaAAZOdvewIECBAIFVAAQoO3NgECBAhkCygA2fnbngABAgRCBRSA0OCtTYAAAQLZAgpAdv62J0CAAIFQAQUgNHhrEyBAgEC2gAKQnb/tCRAgQCBUQAEIDd7aBAgQIJAt8D8/shcJBTWILAAAAABJRU5ErkJggg=="/></svg>',
  equipment:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="108" height="70" viewBox="0 0 120 120"><image id="Image_21" data-name="Image 21" width="108" height="70" xlink:href="data:image/png;base64,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"/></svg>',
  graph:'<svg id="ATOMS_ICON_2019_growth-blk" data-name="ATOMS/ICON/2019/growth-blk" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 26 26"><image id="_3d0a102a270061314b032ee0ebc2b7a4d55b54fd" data-name="3d0a102a270061314b032ee0ebc2b7a4d55b54fd" width="24" height="24" transform="translate(0 0)" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAuIwAALiMBeKU/dgAABHdJREFUeAHtmvF12jAQh0Ne/i8bxBuEThA6QdkgZILSCeJuQDZgg5IJqm5AJ6gzQekE9LvUzsOOLPmMZUyQ3rtnW/pJuvs4yXLa0W63uxhCGY1GKX48YL+wTWH4Z7gfRBkNCJaByG0NlWfqC4Ciy/A749prGRKsjMivFdH/RSsATX4VgPIcrAwCFktwTIR/OojyEWCLDsaxDnFpre2/MmFKWWqHlqCZdXWod130z5dPkmfYhDGnWILJ/Q3WtGRNhW10g1iGPseBuEJz59MBfeTTHNI+lGVojQFIE8zQ6AWFRo4cQcsglmE1wnw5ykb9UG1zPAfdr2TewcEC1Ay/lpjmGCGxBIc1mGUIJNng1wT93QPqSchYSnBYF2yKRzcCT7EttnNYRtsMS7A3uj7iOCoogp5ikhFvgq/UpTyPBQhFgFX1mz5gHWXPyjfwlKC/YK7yk8YFIARoUSbFzd51v32vutvb3mEBak4IS+yDIxT57kuBJLpqORqs3pYhESeYwapLqPq8QvOy5GxLi7YMq/aZ2rRd1wWHJYFjqSXAasAZGmfQtMtY1X7yXAu3S2BBYUnwWIbZAizqtrSnTYJCN7WMlTXp24UmCCwCkgxYWwIrABVXgyZpGgjaFCv6Fte1rT86Y9EWfdpdbRMdUoeDC0yyxeWQtM/azEO/CTbHlpjB5rZx8jaXD/o220Rt6nBOgthgPickyOB7DHOYBr74fC23twGz30cCxwRAeeC3zwJyst835D1zmQY++XwutR90zuLMNMOhFdb2zETXXov8GWfbcMYJunJcbX5dBkkwg5XIW57X1AVfcrYYmNdY/JnatLY6W/9LKlWFbErp8Bu7dXR8pu0TTsgm3vSXdAw3jKbGyxBIU1xeYdeYq3wDUOoSnGqbFxaQxgS3xO48QcpHr7zGM4/uZJudyxBQCyKT4F2g5KP3HkiyH4j23RZrZgFpQsSSTa59SaA8YimQtvLw3ksJVr7kUoL2/Z1JXsELIBmuZ1NeYQFqRtSSTa4NXJacZJLozq5cASkhagn+M+YqTzRKNmUu0Xtuk8zaYOWTajliOTMJpHW5Wv+U74Vjfc/6Hn1vBSmu7GpM2sY4dNGFMZbB6uZqVV/nV81c8sZuFIutvxwdZAlK9uwXOTN9ZGDZn7b7Ded8f5nDmOcQZAMvzkybcwZji/3lbQgww35yj2AdM8mG6X/d69EBSKt6WdAWObM1Xeq3QT3xDP4Ky6ML2SxvWtNkArJfXgJHK85vw6N5NdCJIyzFDxNhRVgKAgqpfBvO0SeKPl4pG3bqFZ2gQN6Gc6zrV3LKmO+uxD1L8ZNGWBGWgoBCWneC/8oYTT+kfyjmO2lpHayN4hPkpAFonI97loJWhBVhKQgopDGzIiwFAYU0ZlaEpSCgkMbMirAUBBTSmFkRloKAQhozK8JSEFBIY2ZFWAoCCmnMrAhLQUAhjZkVYSkIKKQxsxSw6v7BYsk/6zf9D2aK6azSoc41qXpbB+umKgz4fDJzxWWoyIIIK8JSEFBI/wFBvwgGJHbZ2wAAAABJRU5ErkJggg=="/></svg>'
}

detailsBox = ' <g>'+
'<rect id="svg_1" height="275" width="220" y="14.31741" x="11.0232" stroke-width="0" stroke="#000" fill="#ededef"/>'+
'<rect id="svg_15" height="100" width="220" y="189.28593" x="11.13099" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#2e2925"/>'+
'<line stroke-width="0.5" stroke-linecap="null" stroke-linejoin="null" id="svg_6" y2="95.08772" x2="210.9388" y1="95.08772" x1="30.26238" stroke="#999999" fill="none"/>'+
'<line stroke-width="0.5" stroke-linecap="null" stroke-linejoin="null" id="svg_16" y2="214.75984" x2="210.9388" y1="214.75984" x1="30.26238" stroke="#999999" fill="none"/>'+
'<line stroke-width="0.5" stroke-linecap="null" stroke-linejoin="null" id="svg_17" y2="239.75984" x2="210.9388" y1="239.75984" x1="30.26238" stroke="#999999" fill="none"/>'+
'<line stroke-width="0.5" stroke-linecap="null" stroke-linejoin="null" id="svg_18" y2="264.75983" x2="210.9388" y1="264.75983" x1="30.26238" stroke="#999999" fill="none"/>'+
'<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_2" y="30.23529" x="20.41176" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000">NE Name:</text>'+
'<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_4" y="69.64705" x="20.41176" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000">TID:</text>'+
'<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_7" y="119.6471" x="20.41176" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000">CLLI:</text>'+
'<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_8" y="139.73641" x="20.41176" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000">NE Type:</text>'+
'<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_9" y="159.82572" x="20.41176" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000">Vendor:</text>'+
'<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_10" y="179.91503" x="20.41176" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000">Model:</text>'+
'<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_19" y="205.07669" x="95.8399" stroke-width="0" stroke="#107ebd" fill="#ededef">Shelf</text>'+
'<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_20" y="230.32784" x="100.33197" stroke-width="0" stroke="#107ebd" fill="#ededef">Slot</text>'+
'<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_21" y="254.50817" x="90.33197" stroke-width="0" stroke="#107ebd" fill="#ededef">SubSlot</text>'+
'<text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_22" y="280.32784" x="100.33197" stroke-width="0" stroke="#107ebd" fill="#ededef">Port</text>'+
'<text id="neName" font-weight="bold" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_3" y="44.94117" x="20.41176" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#107ebd"></text>'+
'<text id="TID" font-weight="bold" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_5" y="85.38759" x="19.96534" stroke-width="0" stroke="#000" fill="#107ebd"></text>'+
'<text id="CLLI" font-weight="bold" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_11" y="119.76262" x="80.23326" stroke-width="0" stroke="#000" fill="#107ebd"></text>'+
'<text id="neType" font-weight="bold" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_12" y="139.85193" x="80.23326" stroke-width="0" stroke="#107ebd" fill="#000"></text>'+
'<text id="vendor" font-weight="bold" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_13" y="159.94124" x="80.23326" stroke-width="0" stroke="#107ebd" fill="#000"></text>'+
'<text id="model" font-weight="bold" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_14" y="179.58412" x="80.23326" stroke-width="0" stroke="#107ebd" fill="#000"></text>'+
'<text id="shelf0" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_24" y="205.32784" x="30.25001" stroke-width="0" stroke="#000" fill="#ffffff"></text>'+
'<text id="shelf1" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_25" y="205.32784" x="175.75819" stroke-width="0" stroke="#000" fill="#ffffff"></text>'+
'<text id="slot0" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_27" y="230.32784" x="30.25001" stroke-width="0" stroke="#000" fill="#ffffff"></text>'+
'<text id="slot1" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_26" y="230.32784" x="175.75819" stroke-width="0" stroke="#000" fill="#ffffff"></text>'+
'<text id="subSlot0" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_28" y="254.918" x="30.25001" stroke-width="0" stroke="#000" fill="#ffffff"></text>'+
'<text id="subSlot1" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_29" y="254.918" x="175.75819" stroke-width="0" stroke="#000" fill="#ffffff"></text>'+
'<text id="port0" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_31" y="280.32784" x="30.25001" stroke-width="0" stroke="#000" fill="#ffffff"></text>'+
'<text id="port1" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="12" id="svg_30" y="280.32784" x="175.75819" stroke-width="0" stroke="#000" fill="#ffffff"></text>'+
'</g>'

lineBoxField = ['circuitName','type','serviceType','status','bandwidth','segmentName','cableName','length'];
lineBox = {
  'Circuit':'<g><rect id="svg_1" height="120" width="200" y="9.94832" x="9.66667" stroke="#000" fill="#ffffff"/><rect stroke-width="0" id="svg_2" height="40" width="198" y="10.55589" x="10.54039" stroke-opacity="null" stroke="#000" fill="#e3e4e6"/><text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_3" y="24.64884" x="20.00015" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000">Circuit Name:</text><text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_4" y="62.67695" x="20.28184" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000">Type:</text><text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_5" y="82.67692" x="20.28184" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000">Service Type:</text><text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_6" y="102.67688" x="20.28184" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000">Status:</text><text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_7" y="122.67685" x="20.28184" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000">Bandwidth:</text><text font-weight="bold" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" y="40.42346" x="20.28184" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#359ace" id="circuitName"></text><text font-weight="bold" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" y="62.67695" x="94.64791" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000" id="type"></text><text font-weight="bold" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" y="82.67692" x="94.64791" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000" id="serviceType"></text><text font-weight="bold" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" y="102.67688" x="94.64791" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000" id="status"></text><text font-weight="bold" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" y="122.67685" x="94.64791" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000" id="bandwidth"></text></g>',
  'Segment':'<g><rect id="svg_1" height="120" width="200" y="9.94832" x="9.66667" stroke="#000" fill="#ffffff"/><rect stroke-width="0" id="svg_2" height="40" width="198" y="10.55589" x="10.54039" stroke-opacity="null" stroke="#000" fill="#e3e4e6"/><text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_3" y="24.64884" x="20.00015" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000">Segment Name:</text><text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_4" y="62.67695" x="20.28184" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000">Type:</text><text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_5" y="82.67692" x="20.28184" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000">Service Type:</text><text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_6" y="102.67688" x="20.28184" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000">Status:</text><text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_7" y="122.67685" x="20.28184" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000">Bandwidth:</text><text font-weight="bold" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" y="40.42346" x="20.28184" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#359ace" id="segmentName"></text><text font-weight="bold" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" y="62.67695" x="94.64791" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000" id="type"></text><text font-weight="bold" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10"  y="82.67692" x="94.64791" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000" id="serviceType"></text><text font-weight="bold" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" y="102.67688" x="94.64791" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000" id="status"></text><text font-weight="bold" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10"  y="122.67685" x="94.64791" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000" id="bandwidth"></text></g>',
  'Cable':'<g><rect id="svg_1" height="120" width="200" y="9.94832" x="9.66667" stroke="#000" fill="#ffffff"/><rect stroke-width="0" id="svg_2" height="40" width="198" y="10.55589" x="10.54039" stroke-opacity="null" stroke="#000" fill="#e3e4e6"/><text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_3" y="24.64884" x="20.00015" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000">Cable Name:</text><text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_4" y="62.67695" x="20.28184" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000">Type:</text><text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_5" y="82.67692" x="20.28184" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000">Length:</text><text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_6" y="102.67688" x="20.28184" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000">Status:</text><text font-weight="bold" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" y="40.42346" x="20.28184" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#359ace" id="cableName"></text><text font-weight="bold" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" y="62.67695" x="94.64791" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000" id="type"></text><text font-weight="bold" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10"  y="82.67692" x="94.64791" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000" id="length"></text><text font-weight="bold" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="10" y="102.67688" x="94.64791" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000" id="status"></text></g>'
}

}

