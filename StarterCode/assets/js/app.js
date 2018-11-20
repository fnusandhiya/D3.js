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
            data.poverty = +data.poverty;
            data.healthcare = +data.healthcare;
        });

         // create scales
        var xLinearScale = d3.scaleLinear()
            .domain(d3.extent(f, d => d.poverty))
            .range([0, width]);

        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(f, d => d.healthcare)])
            .range([height, 0]);

        // create axes
        var xAxis = d3.axisBottom(xLinearScale)
        var yAxis = d3.axisLeft(yLinearScale);

        // append axes
        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        chartGroup.append("g")
            .call(yAxis);

        // chartGroup
        //     .append("text")             
        //     .attr("x", width / 2 )
        //     .attr("y",  height + margin.top + 20 )
        //     .style("text-anchor", "middle")
        //     .text("Age(median)");
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", `translate(${width / 2}, ${height + margin.top + 40})`)
            .classed("xlabel", true)
            .text("In Poverty (%)");
            
        chartGroup
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Healthcare(%)");

        // append circles
        var circlesGroup = chartGroup.selectAll("circle")
            .data(f)
            .enter()
            .append("circle")
            .attr("cx", d => xLinearScale(d.poverty))
            .attr("cy", d => yLinearScale(d.healthcare))
            .attr("r", "10")
            .attr("fill", "lightblue")
            // .attr("stroke-width", "1")
            // .attr("stroke", "black");
        var s = chartGroup.selectAll('g theCircles').data(f).enter();
        s.append("text")
            .text(function(d){return d.abbr})
            .attr('class', 'stateText')
            .attr("font-size", 10)
            .attr('dx', d => xLinearScale(d.poverty))//positions text towards the left of the center of the circle
            .attr('dy', d => yLinearScale(d.healthcare) + 4);

        // Step 1: Initialize Tooltip
        var toolTip = d3.tip()
            .attr("class", "tooltip")
            .offset([80, -60])
            .html(function(d) {
                return (`<strong>${d.healthcare}<strong><hr>${d.poverty}`);
            });

        // Step 2: Create the tooltip in chartGroup.
        chartGroup.call(toolTip);

        // Step 3: Create "mouseover" event listener to display tooltip
        circlesGroup.on("mouseover", function(d) {
            toolTip.show(d, this);
        })
        // Step 4: Create "mouseout" event listener to hide tooltip
        .on("mouseout", function(d) {
            toolTip.hide(d);
        });


    });

}

// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);