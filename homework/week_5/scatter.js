/*
Rosa Slagt, 11040548
The scatterplot is based of the number female scientist and cosumer confidence
*/


// variables chart
var width = screen.width - 25;
var height = 200;
var margin = 50;
var barheight = 0;
var barWidth;

// to make sure the code in functions will run
window.onload = function() {

  // receiving the data
  var consConf = "http://stats.oecd.org/SDMX-JSON/data/HH_DASH/FRA+DEU+KOR+NLD+PRT+GBR.COCONF.A/all?startTime=2007&endTime=2015"
  var womenInScience = "http://stats.oecd.org/SDMX-JSON/data/MSTI_PUB/TH_WRXRS.FRA+DEU+KOR+NLD+PRT+GBR/all?startTime=2007&endTime=2015"
  var requests = [d3.json(consConf), d3.json(womenInScience)];

  Promise.all(requests).then(function(response) {
    main(response)

  }).catch(function(e){
      throw(e);
  });

};


// function that transforms jason in appropriated format 
function transformResponse(data){

    // access data property of the response
    let dataHere = data.dataSets[0].series;

    // access variables in the response and save length for later
    let series = data.structure.dimensions.series;
    let seriesLength = series.length;

    // set up array of variables and array of lengths
    let varArray = [];
    let lenArray = [];

    series.forEach(function(serie){
        varArray.push(serie);
        lenArray.push(serie.values.length);
    });

    // get the time periods in the dataset
    let observation = data.structure.dimensions.observation[0];

    // add time periods to the variables, but since it's not included in the
    // 0:0:0 format it's not included in the array of lengths
    varArray.push(observation);

    // create array with all possible combinations of the 0:0:0 format
    let strings = Object.keys(dataHere);

    // set up output array, an array of objects, each containing a single datapoint
    // and the descriptors for that datapoint
    let dataArray = [];

    // for each string that we created
    strings.forEach(function(string){
        // for each observation and its index
        observation.values.forEach(function(obs, index){
            let data = dataHere[string].observations[index];
            if (data != undefined){


                let tempObj = {};

                let tempString = string.split(":");
                tempString.forEach(function(s, indexi){
                    tempObj[varArray[indexi].name] = varArray[indexi].values[s].name;
                });


                tempObj["time"] = obs.name;
                tempObj["datapoint"] = data[0];
                dataArray.push(tempObj);
            }
        });
    });

    return dataArray;
}

function main(response){
  var consConfidence = transformResponse(response[0]);
  var womScience = transformResponse(response[1]);

  // lists for data
  countries = [];
  consConfList = [];
  womScienceList = [];
  bigList = [];

  // to select the data from consumer confidence
  consConfidence.forEach(function(datapoint) {
    var time = datapoint["time"]
    var country = datapoint["Country"]
    var consConfData = datapoint["datapoint"]
    
    countries.push(country)
    consConfList.push([consConfData])
    bigList.push([consConfData, time, country]);

  });

  // to select the data from women in science
  womScience.forEach(function(datapoint) {
    var womenData = datapoint["datapoint"]
    var time = datapoint["time"]
    var country = datapoint['Country']
    womScienceList.push([womenData])

    // to check
    bigList.forEach(function(point) {
      if (point[1] === time && point[2] === country) {
        point.unshift(womenData);
        return;
      }
    });

  });

  // remove invalid data
  bigList.forEach(function(point, i) {
    if (point.length !== 4) {
      bigList.splice(i, 1)
    }
  });

  console.log(bigList);

  // scaling
  var max = Math.max.apply(null, womScienceList);
  var minConsCon = Math.min.apply(null, consConfList);
  var maxConsCon = Math.max.apply(null, consConfList);
  var xScale = d3.scaleLinear()
                 .domain([0, max])
                 .range([margin, width - margin - 110]);
  var yScale = d3.scaleLinear()
                 .domain([minConsCon, maxConsCon])
                 .range([height - margin, margin]);

  //coloring
  dict ={};
  color = ['#f6eff7','#bdc9e1','#67a9cf','#1c9099','#016c59', "#fd8d3c", "#f03b20"];
  country = 0;
  countries.forEach(function(datapoint, line) {
    if (!(countries[line] in dict)){
      dict[countries[line]] = color[country]
      country++
    }
  });

  // SVG 
  var svg = d3.select("body")
              .append("svg")
              .attr("width", width)
              .attr("height", height);

  svg.selectAll("circle")
     .data(bigList)
     .enter()
     .append("circle")
     .attr("cx", function(d) {
      return xScale(d[0]);
      })
      .attr("cy", function(d) {
      return yScale(d[1]);
      })
      .attr("r", 5)
      .attr("fill", function(d){
    return dict[d[3]]
  });

  // create Y axe
  var yAxe = d3.axisLeft(yScale);
  svg.append("g")
     .attr("class", "axis")
     .attr("transform", "translate(" + [margin, 0] + ")")
     .call(yAxe);

  // create X axe
  var xAxe = d3.axisBottom(xScale);
  svg.append("g")
     .attr("class", "axis")
     .attr("transform", "translate(" + [0, height - margin] + ")")
     .call(xAxe);

  // create label x axe
  svg.append("text")
     .attr("transform", "translate(" + [(width -4)/ 2, height - margin / 4] + ")")
     .text("Percentage of Women in Science");

  // create label y axe
  svg.append("text")
     .attr("text-anchor", "middle")
     .attr("transform", "translate(" + [margin / 4, height / 3 * 2 - margin] + ") rotate(-90)")
     .text("Consumer Confidence");

  // create legenda
  legend = svg.selectAll(".legend")
              .data(Object.keys(dict))
              .enter()
              .append("g")
              .attr("class", ".legend")
              .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"
    });

    legend.append("rect")
      .attr("x", width - 145)
      .attr("y", 0)
      .attr("width", 32)
      .attr("height", 20)
      .style("fill", function(d, i) {
        return Object.values(dict)[i]
      })

      // text by legenda
      legend.append("text")
        .attr("x", width - 110)
        .attr("y", 20)
        .text(function(d){
          return d;
        })

}
