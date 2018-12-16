        
         
                  
        var path = g.selectAll('path')
                    .data(pie(totalHuizen))
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
                    .text(`${d.totalHuizen.}`)
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

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // for(var stad = 0; stad < steden.length; stad++){
        //     if (data[i]["Regio's"] !== steden[stad]) {
        //         continue;
        //     }
        //     else {
        //        totalHuizen[stad] = totalHuizen[stad] + data[i]["Beginstand woningvoorraad (aantal)"]

        //         for (var oppk = 0; oppk < oppervlakteklasse; oppk++){
        //             if (data[i]["Oppervlakteklasse"] !== oppervlakteklasse[oppk]) {
        //                 continue;
        //             }else{
        //                 oppervlakteklasse[oppk] = 
        //             }
        //         }

        //         break;
        //     }
        // }






var relaAdamTot = 0;
var eensUtTot = 0;
var relaRotTot = 0;
var relaDhTot = 0;
var relaAdam = [];
var relaRot = [];
var relaUt = [];
var relaDh = [];
console.log(eensUtTot)

if (data[i]["Woningtype"] === "Eengezinswoning"){
    if (data[i]["Regio's"] === steden[0]){

        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[0]){
            relaAdam.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / relaAdamTot))
        }
        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[1]){
            relaAdam.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / relaAdamTot))
        }
        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[2]){
            relaAdam.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / relaAdamTot))
        }
        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[3]){
            relaAdam.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / relaAdamTot))
        }
        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[4]){
            relaAdam.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / relaAdamTot))
        }
        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[5]){
            relaAdam.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / relaAdamTot))
        }
        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[6]){
            relaAdam.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / relaAdamTot))

        }
    } if (data[i]["Regio's"] === steden[1]){
        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[0]){
            relaRot.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / relaRotTot))
        }
        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[1]){
            relaRot.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / relaRotTot))
        }
        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[2]){
            relaRot.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / relaRotTot))
        }
        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[3]){
            relaRot.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / relaRotTot))
        }
        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[4]){
            relaRot.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / relaRotTot))
        }
        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[5]){
            relaRot.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / relaRotTot))
        }
        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[6]){
            relaRot.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / relaRotTot))   
        }

    } if (data[i]["Regio's"] === steden[2]){
        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[0]){
            relaDh.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / relaDhTot))

        }
        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[1]){
            relaDh.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / relaDhTot))
        }
        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[2]){
            relaDh.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / relaDhTot))
        }
        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[3]){
            relaDh.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / relaDhTot))
        }
        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[4]){
            relaDh.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / relaDhTot))
        }
        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[5]){
            relaDh.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / relaDhTot))
        }
        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[6]){
            relaDh.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / relaDhTot))

        }

    }if (data[i]["Regio's"] === steden[3]){
        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[0]){
            relaUt.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / eensUtTot))

        }
        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[1]){
            relaUt.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / eensUtTot))
        }
        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[2]){
            relaUt.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / eensUtTot))
        }
        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[3]){
            relaUt.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / eensUtTot))
        }
        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[4]){
            relaUt.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / eensUtTot))
        }
        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[5]){
            relaUt.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / eensUtTot))
        }
        if(data[i]["Oppervlakteklasse"] === oppervlakteklasse[6]){
            relaUt.push(Math.round(100 * data[i]["Beginstand woningvoorraad (aantal)"] / eensUtTot))

        }

    }

            // total eensgezinswoningen
            if (data[i]["Woningtype"] === "Eengezinswoning"){
                if (data[i]["Regio's"] === steden[0]){
                    relaAdamTot = relaAdamTot + data[i]["Beginstand woningvoorraad (aantal)"]
                    //console.log(relaAdamTot);
    
                }else if(data[i]["Regio's"] === steden[1]){
                    relaRotTot = relaRotTot + data[i]["Beginstand woningvoorraad (aantal)"]
                    //console.log(relaDhTot);
    
                }else if(data[i]["Regio's"] === steden[2]){
                    relaDhTot = relaDhTot + data[i]["Beginstand woningvoorraad (aantal)"]
                    //console.log(eensUtTot);
    
                }else if (data[i]["Regio's"] === steden[3]){
                    eensUtTot = eensUtTot + data[i]["Beginstand woningvoorraad (aantal)"]  
                }
            }