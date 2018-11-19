// @TODO: YOUR CODE HERE!
// d3.csv("/assets/data/data.csv").then(function(Data, error) {
//     if (error) return console.warn(error);
  
//     console.log(Data);
// });

function makeResponsive() {
    var svgArea = d3.select("body").select("svg");
     // SVG wrapper dimensions are determined by the current width and
  // height of the browser window.
    var svgWidth = 760;
    var svgHeight = 500;

    var margin = {
    top: 50,
    bottom: 50,
    right: 50,
    left: 50
    };

    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;

    // Append SVG element
    var svg = d3
        .select("#scatter")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    // Append group element
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Read CSV
    d3.csv("/assets/data/data.csv").then(function(f){
        f.forEach(function(data){
            data.smokes = +data.smokes;
            data.age = +data.age;
        });

         // create scales
        var xLinearScale = d3.scaleLinear()
            .domain([0, d3.max(f, d => d.age)])
            .range([0, width]);

        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(f, d => d.smokes)])
            .range([height, 0]);

        // create axes
        var xAxis = d3.axisBottom(xLinearScale).ticks(7)
        var yAxis = d3.axisLeft(yLinearScale).ticks(10);

        // append axes
        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        chartGroup.append("g")
            .call(yAxis);

        chartGroup
            .append("text")             
            .attr("x", width / 2 )
            .attr("y",  height + margin.top + 20 )
            .style("text-anchor", "middle")
            .text("Age(median)");
            
        chartGroup
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Poverty(%)");

        // append circles
        var circlesGroup = chartGroup.selectAll("circle")
            .data(f)
            .enter()
            .append("circle")
            .attr("cx", d => xLinearScale(d.age))
            .attr("cy", d => yLinearScale(d.smokes))
            .attr("r", "10")
            .attr("fill", "lightblue")
            .attr("stroke-width", "1")
            .attr("stroke", "black");

        circlesGroup.append("text")
            .text(function(d){return d.abbr})
            .attr("font-size", 10)
            .attr('dx', -10)//positions text towards the left of the center of the circle
            .attr('dy',4)


    });

}

// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);