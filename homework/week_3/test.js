console.log("hoi rosa");

// reading the file with XMLHttpRequest
var fileName = "bevolking.json";
var txtFile = new XMLHttpRequest();
txtFile.onreadystatechange = function() {
    if (txtFile.readyState === 4 && txtFile.status == 200) {
        var list = JSON.parse(txtFile.responseText);
        axeKeys = Object.keys(list);
        xAxe = [];
        yAxe = [];

        axeKeys.forEach(element => {
            yAxe.push(list[element]["Bevolking op 1 januari (x 1 000)"]);
            // console.log(yAxe);
            xAxe.push(list[element]["Perioden"]);
            // console.log(xAxe);
        })
        // console.log(xAxe);
        // console.log(yAxe);
        console.log("hoi rosa2");
        parsheData = dataParshing(list);
        lineGraph(parsheData);
        }
    }

txtFile.open("GET", fileName);
txtFile.send();

function lineGraph( axes ){ 
    
    var xAxe = axes [0];
    var yAxe = axes [1];
    var canvas = document.getElementById( "canvas" );  
    var context = canvas.getContext( "2d" );  
    
    // declare graph start and end  
    var GRAPH_TOP = 25;  
    var GRAPH_BOTTOM = 375;  
    var GRAPH_LEFT = 25;  
    var GRAPH_RIGHT = 475;      
    var GRAPH_HEIGHT = 350;   
    var GRAPH_WIDTH = 450;

    // draw X and Y axis  
    context.beginPath();  
    context.moveTo( GRAPH_LEFT, GRAPH_BOTTOM );  
    context.lineTo( GRAPH_RIGHT, GRAPH_BOTTOM );  
    context.lineTo( GRAPH_RIGHT, GRAPH_TOP ); 
    context.stroke(); 
} 

/*
function createTransform(domain, range){
	// domain is a two-element array of the data bounds [domain_min, domain_max]
	// range is a two-element array of the screen bounds [range_min, range_max]
	// this gives you two equations to solve:
	// range_min = alpha * domain_min + beta
	// range_max = alpha * domain_max + beta
 		// a solution would be:

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

*/