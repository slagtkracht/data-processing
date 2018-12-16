/*
Rosa Slagt, 11040548
Linked views
 to run a local host typ: python -m http.server 8888
information regarding the pie chart is from: https://codepen.io/anon/pen/xmVONM
*/

window.onload = function() {

    d3.json("woningen.json").then(function(data) {
    // console.log(data)
    var steden = ["Amsterdam","Rotterdam","'s-Gravenhage (gemeente)","Utrecht (gemeente)"];
    var nameSteden = ["Amsterdam","Rotterdam","'s-Gravenhage","Utrecht"];
    var oppervlakteklasse = ["75 tot 100 m²","100 tot 150 m²","150 tot 250 m²","250 tot 500 m²"];
    var totalHuizen = [[],[],[],[]];
    var totalAdam = 0;
    var totalRot = 0;
    var totalUt = 0;
    var totalDh = 0;

    for(var i = 0; i < data.length; i++){
        // total middle big houses
            if(data[i]["Regio's"] === steden[0]){
                totalAdam = totalAdam + data[i]["Beginstand woningvoorraad (aantal)"]
                totalHuizen[0].push(data[i]["Beginstand woningvoorraad (aantal)"])

            }else if(data[i]["Regio's"] ===  steden[1]){
                totalRot = totalRot + data[i]["Beginstand woningvoorraad (aantal)"]
                totalHuizen[1].push(data[i]["Beginstand woningvoorraad (aantal)"])

            }else if(data[i]["Regio's"] ===  steden[2]){
                totalDh = totalDh + data[i]["Beginstand woningvoorraad (aantal)"]
                totalHuizen[2].push(data[i]["Beginstand woningvoorraad (aantal)"])

            }else if(data[i]["Regio's"] ===  steden[3]){
                totalUt = totalUt + data[i]["Beginstand woningvoorraad (aantal)"]
                totalHuizen[3].push(data[i]["Beginstand woningvoorraad (aantal)"])
            }

        }
        //console.log(totalHuizen);
        // histogram([totalAdam, totalRot, totalDh, totalUt], nameSteden);
        pieChart(totalHuizen, nameSteden);
    })
       
}
    function histogram (dataLijst, nameSteden){
        // making the tool for the mouse click
        var tool = d3.select("body")
                     .append("div")
                     .style("position", "absolute")
                     .style("visibility", "hidden")     
        
        // determining width, height and padding between the bars
        var w = screen.width;
        var h = screen.height - 300;
        var barPadding = 0.5;
       
        // selecting for SVG               
        var svg = d3.select("body")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);

        // determing the padding
        var yPadding = h / 10;
        var xPadding = h / 5;
       
        // making the y axe
        var yScale = d3.scaleLinear()
                        .domain([0, d3.max(dataLijst)])
                        .range([h- yPadding, yPadding]);

        // making the x axe
        var xScale = d3.scaleLinear()
                        .domain([0, dataLijst.length])
                        .range([w, xPadding]);
    
        // adding the padding to make the chart correct
        var  bars = svg.selectAll("rect")
                       .data(dataLijst)
                       .enter()
                       .append("rect")
                       .attr("x", function(d, i) {
                            return i * ((w - xPadding) /dataLijst.length) + xPadding; 
                        })
                        .attr("y", function(d) {
                        return yScale(d);

                        })
                        .attr("width", (w - xPadding) / dataLijst.length - barPadding)
                        .attr("height", function(d) {
                        return h - yScale(d) - yPadding;
                        })
                        .attr("fill", "teal")
                        
                        // to make the chart interactive
                        .on("mouseover", function(d){
                    d3.select(this)
                      .attr("fill", "yellow")
                        return (tool.style("visibility", "visible")
                                 .text("Aantal huizen: " + d))
                                
                    })
                        .on("mouseout", function(){
                        return (tool.style("visibility", "hidden"),
                            bars.attr("fill", "teal"));
        
                    })
                    .on("mousemove", function(d, i){
                    return (tool.style("top", event.clientY + "px")
                                .style("left", event.clientX + 5 + "px"));
                    });

                // call y-axis ticks
                svg.append("g")
                    .attr("class", "axis")
                    .attr("transform", "translate(" + xPadding + ",0)")
                    .call(d3.axisLeft(yScale));
                
                // labeling the y axe
                svg.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 0.3 * xPadding)
                    .attr("x", -h / 1.5)
                    .text("Huizenvoorraad");
                     
                    // to name the x-axe
                svg.selectAll("name")
                    .data(nameSteden)
                    .enter()
                    .append("text")
                    .attr("transform", "translate(" + xPadding + ",0)")
                    .text(function(d) {
                        return d;
                    })
                    // increasing y and x axe
                    .attr("x", function(d, i) {
                    return (i * ((w - xPadding) /dataLijst.length) + 2 * xPadding);
                    })
                    .attr("y", h - 10)
                    .attr("class", "name")
                    
    };
    
    function pieChart(totalHuizen, nameSteden){
 
        // determining variables
        var width = screen.width/2;
        //console.log(width)
        var height = 2 * screen.height - 300 - screen.height;
        var thickness = 40;
        var duration = 750;
        var text = "";
        var radius = Math.min(width, height) / 2;
        //console.log(radius)
        var color = d3.scaleOrdinal(d3.schemeSet1);
          
        var svgPie = d3.select("#chart")
                    .append('svg')
                    .attr('class', 'pie')
                    .attr('width', width)
                    .attr('height', height);
                console.log(svgPie)
          
        var g = svgPie.append('g')
                   .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');
          
        var arc = d3.arc()
                    .innerRadius(radius - thickness)
                    .outerRadius(radius);
        
        var pie = d3.pie()
                    .value(function(d) { return d.value; })
                    .sort(null);
    };
    
    