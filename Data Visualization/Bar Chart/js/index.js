var height = 500,
  width = 900,
  barWidth = width / 300;

var svg = d3
  .select(".graph")
  .append("svg")
  .attr("height", height + 100)
  .attr("width", width + 100);

var tooltip = d3
  .select(".graph")
  .append("div")
  .attr("id", "tooltip");

d3.json(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json",
  (data) => {
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -100)
      .attr("y", 80)
      .text("GDP");

    svg
      .append("text")
      .attr("x", width / 2 + 120)
      .attr("y", height + 50)
      .text("http://www.bea.gov/national/pdf/nipaguid.pdf")
      .attr("class", "information");

    var datasetGDP = data.data;
    var gdp = datasetGDP.map((item) => item[1]);
    var gdpMax = d3.max(gdp);
    var year = datasetGDP.map((item) => item[0].substring(0, 4));
    var date = datasetGDP.map((item) => new Date(item[0]));

    var xMax = new Date(d3.max(date));
    xMax.setMonth(xMax.getMonth() + 3);
    var xScale = d3
      .scaleTime()
      .domain([d3.min(date), xMax])
      .range([0, width]);
    var xAxis = d3.axisBottom().scale(xScale);

    var linearScale = d3.scaleLinear().domain([0, gdpMax]).range([0, height]);
    var gdpScale = gdp.map((item) => linearScale(item));

    var yScale = d3.scaleLinear().domain([0, gdpMax]).range([height, 0]);
    var yAxis = d3.axisLeft(yScale);

    svg
      .append("g")
      .call(xAxis)
      .attr("id", "x-axis")
      .attr("transform", "translate(60, 510)");

    svg
      .append("g")
      .call(yAxis)
      .attr("id", "y-axis")
      .attr("transform", "translate(60, 10)");

    svg
      .selectAll("rect")
      .data(gdpScale)
      .enter()
      .append("rect")
      .attr("data-date", (d, i) => datasetGDP[i][0])
      .attr("data-gdp", (d, i) => datasetGDP[i][1])
      .attr("x", (d, i) => xScale(date[i]))
      .attr("y", (d) => height + 10 - d)
      .attr("width", barWidth)
      .attr("height", (d) => d)
      .attr("transform", "translate(60, 0)")
      .attr("class", "bar")

      .on("mouseover", function (d, i) {
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 0.9);
      
      tooltip
          .html("data")
          .attr("data-date", data.data[i][0]);
      })
      .on("mouseout", function () {
        tooltip.transition().duration(200).style("opacity", 0);
      });
  }
);
