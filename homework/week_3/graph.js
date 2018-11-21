// Rosa Slagt
// 11040548
// code for

console.log("Hoi, veel plezier met mijn grafiek!");


function createTransform(domain, range){

	// domain is a two-element array of the data bounds [domain_min, domain_max]
	// range is a two-element array of the screen bounds [range_min, range_max]
	// this gives you two equations to solve:
	// range_min = alpha * domain_min + beta
	// range_max = alpha * domain_max + beta
    var domain_min = domain[0]
    var domain_max = domain[1]
    var range_min = range[0]
    var range_max = range[1]

    // formulas to calculate the alpha and the beta
   	var alpha = (range_max - range_min) / (domain_max - domain_min)
    var beta = range_max - alpha * domain_max

    // returns the function for the linear transformation (y= a * x + b)
    return function(x){
      return alpha * x + beta;
    }
}

// reading the file with XMLHttpRequest
var fileName = "bevolking.json";
var txtFile = new XMLHttpRequest();

// defining the range
var GRAPH_TOP = 0;  
var GRAPH_BOTTOM = 375;  
var GRAPH_LEFT = 25;  
var GRAPH_RIGHT = 475; 

// hard coding the x and y values
var yValues = [5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000];
var xValues = [1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020, 2030];

// starting canvas
var canvas = document.getElementById( "canvas" );  
var context = canvas.getContext( "2d" ); 

txtFile.onreadystatechange = function() {
    if (txtFile.readyState === 4 && txtFile.status == 200) {
        var list = JSON.parse(txtFile.responseText);

        // list with the index
        axeKeys = Object.keys(list);

         // list for values per axe
         yAxe = [];
         xAxe = [];
 
         // filling the lists
         axeKeys.forEach(function(element) {
             yAxe.push(list[element]["Bevolking op 1 januari (x 1 000)"])
             xAxe.push(list[element]["Perioden"]);
         })
         // lists with the both lists
         axes = [];
         axes.push(xAxe);
         axes.push(yAxe);

         // functions used
         var xyAxes = xyAxe();
         var point = points(axes);
         var line = lines(point);
         
        }
    }
          
txtFile.open("GET", fileName);
txtFile.send();

function xyAxe(){ 
    // creating the x and y axes
    context.beginPath();
    context.moveTo(GRAPH_RIGHT, GRAPH_BOTTOM);
    context.lineTo(GRAPH_LEFT, GRAPH_BOTTOM);
    context.lineTo(GRAPH_LEFT, GRAPH_TOP);
    context.stroke();

    // creating labels
    context.fillText("Years", 250, 400);
    context.rotate(-90 * Math.PI / 180);
    // to rotate the label
    context.fillText("Bevolkingsomvang per 1 januari", -250, 10)
    context.rotate (90 * Math.PI / 180);
    
    //reference values y axe
    for (var value = yValues.length; value >= 0; value--){
        context.fillText(yValues[value], 27, (375/yValues.length) * (yValues.length - value));
    }

    // reference values Y axe
    for (var year = 0; year < xValues.length; year++){
        context.fillText(xValues[year], (450/xValues.length) * (year + 1), 410);
    }
}

function points(axes){
    // create x coordinates
    // the yearrange
    var domain = [1900, 2030];
    var range = [GRAPH_LEFT, GRAPH_RIGHT];

    xList = [];
    functionX = createTransform(domain, range);
    for (var years = 0; years < xValues.length; years++){
        xList.push(functionX(Number(axes[0][years])))
    }

    // create y coordinates
    // maxima values
    domain = [5104, 19082];
    range = [GRAPH_BOTTOM, GRAPH_TOP];
  
    yList = [];
    functionY = createTransform(domain, range);
    for (var years = 0; years < yValues.length; years++) {
    yList.push(functionY(Number(axes[1][years])));
    }

    // creating the y coordinates label
    domain = [5104, 19082];
    range = [GRAPH_BOTTOM, GRAPH_TOP];
    
    yLabelList = [];
    yLabel = createTransform(domain, range);
    for (var years = 0; years < yValues.length; years++) {
        yLabelList.push(yLabel(yValues[years]));
    }

    return xList, yList, yLabelList, yValues
}

function lines(point){

    context.beginPath();
    context.moveTo(GRAPH_LEFT, GRAPH_TOP);

    // drawing the reference lines
    for (drawLines = 0; drawLines < xValues.length; drawLines++) {
      context.moveTo(GRAPH_LEFT, yLabelList[drawLines]);
      context.lineTo(GRAPH_RIGHT, yLabelList[drawLines]);
    }
    context.stroke();

    // drawing line
    context.beginPath();
    context.moveTo(xList[0], yList[0]);
    for (var year = 0; year < xList.length; year++) {
      context.lineTo(xList[year], yList[year]);
    }
    context.stroke();
  }
  
