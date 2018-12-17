/*
Rosa Slagt, 11040548
Linked views
 to run a local host typ: python -m http.server 8888
information regarding the pie chart is from: https://codepen.io/anon/pen/xmVONM
*/

window.onload = function() {

    d3.json("woningen.json").then(function(data) {
    var steden = ["Amsterdam","Rotterdam","'s-Gravenhage (gemeente)","Utrecht (gemeente)"];
    // used for the text on the page
    var nameSteden = ["Amsterdam","Rotterdam","'s-Gravenhage","Utrecht"];

    var oppervlakteklasse = ["75 tot 100 m²","100 tot 150 m²","150 tot 250 m²","250 tot 500 m²"];
    var totalAdam = 0;
    var totalRot = 0;
    var totalUt = 0;
    var totalDh = 0;

    var adamDict = []; 
    var rotDict = []; 
    var utDict = []; 
    var dhDict = []; 

    for(var i = 0; i < data.length; i++){
        // totalCity is the total of als the houses
            if(data[i]["Regio's"] === steden[0]){
                totalAdam = totalAdam + data[i]["Beginstand woningvoorraad (aantal)"]

                // the cityDict is a list with dictionaries of the houses and size
                adamDict.push({
                    name:   data[i]["Oppervlakteklasse"],
                    value: data[i]["Beginstand woningvoorraad (aantal)"]
                    });

                totalHuizen[0].push(data[i]["Beginstand woningvoorraad (aantal)"])
                "Oppervlakteklasse"

            }else if(data[i]["Regio's"] ===  steden[1]){
                totalRot = totalRot + data[i]["Beginstand woningvoorraad (aantal)"]
                totalHuizen[1].push(data[i]["Beginstand woningvoorraad (aantal)"])

                rotDict.push({
                    name:   data[i]["Oppervlakteklasse"],
                    value: data[i]["Beginstand woningvoorraad (aantal)"]
                    });

            }else if(data[i]["Regio's"] ===  steden[2]){
                totalDh = totalDh + data[i]["Beginstand woningvoorraad (aantal)"]
                totalHuizen[2].push(data[i]["Beginstand woningvoorraad (aantal)"])

                dhDict.push({
                    name:   data[i]["Oppervlakteklasse"],
                    value: data[i]["Beginstand woningvoorraad (aantal)"]
                    });

            }else if(data[i]["Regio's"] ===  steden[3]){
                totalUt = totalUt + data[i]["Beginstand woningvoorraad (aantal)"]
                totalHuizen[3].push(data[i]["Beginstand woningvoorraad (aantal)"])

                utDict.push({
                    name:   data[i]["Oppervlakteklasse"],
                    value: data[i]["Beginstand woningvoorraad (aantal)"]
                    });
            }

        }
        // to add all the lists with dics to the totalDict
        totalDict = {};
        totalDict["Amsterdam"] = adamDict;
        totalDict["Rotterdam"] = rotDict;
        totalDict["'s-Gravenhage"] = dhDict;
        totalDict["Utrecht"] = utDict;

        histogram([totalAdam, totalRot, totalDh, totalUt], nameSteden, oppervlakteklasse);
        pieChart(totalDict["Amsterdam"], "Amsterdam", oppervlakteklasse, false );
        

    })
       
}
    function histogram (dataLijst, nameSteden, oppervlakteklasse){
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
                    .attr("height", h)
                    .attr('class', 'bar');
                    

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
                        .attr("fill", "#e41a1c")
                        
                        // to make the chart interactive
                        .on("mouseover", function(d, i){
                            pieChart(totalDict[nameSteden[i]], nameSteden[i], oppervlakteklasse ,true)
                            d3.select(this)
                              .attr("fill", "#377eb8")
                            return (tool.style("visibility", "visible")
                                        .text("Aantal huizen: " + d))
                                
                    })
                        .on("mouseout", function(){
                            return (tool.style("visibility", "hidden"),
                            bars.attr("fill", "#e41a1c"));
        
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

                svg.append("text")
                    .attr("y", 0.3 * xPadding)
                    .attr("x", -h / (2 * w))
                    .text("Totaal aantal woningen 75 tot 500 vierkante meter, vier grootste steden")
                
                
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
                        return (i * ((w - xPadding) /dataLijst.length));
                    })
                    .attr("y", h - 10)
                    .attr("class", "name")
                    
    };
    
    function pieChart(currentDict, nameStad, oppervlakteklasse, update = false){
 
        // determining variables
        var width = screen.width/2;
        var height = 2 * screen.height - 200 - screen.height;
        var thickness = 100;
        var duration = 750;
        var text = "";
        var radius = Math.min(width, height) / 2;
        var color = d3.scaleOrdinal(d3.schemeSet1);

        // to remove the old pieChart 
        if (update){
            var svgPie = d3.select(".pie");
            svgPie.selectAll("*").remove();
        }
        // if there was no old piechart, make new one
        else {
            var svgPie = d3.select("body")
                            .append('svg')
                            .attr('class', 'pie')
                            .attr('width', width + 80)
                            .attr('height', height + 50);                   
        };
        

        var g = svgPie.append('g')
                      .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');
        
        // to make the donut chart
        var arc = d3.arc()
                    .innerRadius(radius - thickness)
                    .outerRadius(radius);
        
        // to append the name of the city
        svgPie.append('text')
              .text(nameStad)
              .attr('transform', 'translate(' + (width/2.25) + ',' + (height/1.5) + ')');

        var pie = d3.pie()
                    .value(function(d) { return d.value; })
                    .sort(null);

        // to append the title 
        svgPie.append("text")
                    .attr('transform', 'translate(' + (width/4.25) + ',' + (height + 20) + ')')
                    .text("Verdeling van oppervlakteklasses per stad")
        
        // to make the mouse over function
        var path = g.selectAll('path')
                    .data(pie(currentDict))
                    .enter()
                    .append("g")
                    .on("mouseover", function(d) {

                    let g = d3.select(this)
                            .style("cursor", "pointer")
                            .style("fill", "black")
                            .append("g")
                            .attr("class", "text-group");
            
                    g.append("text")
                     .attr("class", "name-text")
                     .text(`${d.data.name}`)
                     .attr('text-anchor', 'middle')
                     .attr('dy', '-1.2em');
                
                    g.append("text")
                     .attr("class", "value-text")
                     .text(`${d.data.value}`)
                     .attr('text-anchor', 'middle')
                     .attr('dy', '.6em');
                })
                    .on("mouseout", function(d) {
                        d3.select(this)
                         .style("cursor", "none")  
                         .style("fill", color(this._current))
                         .select(".text-group").remove();
                })
                    .append('path')
                    .attr('d', arc)
                    .attr('fill', (d,i) => color(i))

                    .on("mouseover", function(d) {
                        d3.select(this)     
                          .style("cursor", "pointer")
                          .style("fill", "black");
                })
                    .on("mouseout", function(d) {
                         d3.select(this)
                    .style("cursor", "none")  
                    .style("fill", color(this._current));
                   })
                    .each(function(d, i) { this._current = i; });
          
                g.append('text')
                 .attr('text-anchor', 'middle')
                 .attr('dy', '.35em')
                 .text(text);
        
        // to make the legend
        var legend = svgPie.selectAll('.legend')
                            .data(oppervlakteklasse)
                            .enter().append('g')
                            .attr("class", "legend")
                            .attr("transform", function (d, i) {
                            {
                                return "translate(0," + i * 20 + ")"
                            }
                            })

        // to append the colours
        legend.append('rect')
             .attr("x", 560)
             .attr("y", 450)
             .attr("width", 10)
             .attr("height", 10)
             .style("fill", function (d, i) {
                return color(i)
        })
        // to add the legend text
        legend.append('text')
            .attr("x", 580)
            .attr("y", 460)
            .text(function (d, i) {
                return d
            })
    };


    
    