//@ts-check
import * as d3 from "d3";

class BellCurveChart extends HTMLElement {
  constructor() {
    super();

    this._root = this.attachShadow({ mode: "open" });
    this.style.display = "block";
    this.style.backgroundColor = "#f8f9fa";

    this.up_value = {};
    this.down_value = {};
  }
  connectedCallback() {
    this.draw();
  }

  draw() {
    const wrapper = document.createElement("div");
    wrapper.style.width = "100%";
    wrapper.style.height = "auto";
    this._root.appendChild(wrapper);

    const data = [];

    getData(); // popuate data

    // line chart based on http://bl.ocks.org/mbostock/3883245

    const bound = this.getBoundingClientRect();
    const margin = {
        top: 30,
        right: 30,
        bottom: 30,
        left: 50,
      },
      width = bound.width - margin.left - margin.right,
      height = bound.width * (((3 / 4) * 2) / 5) - margin.top - margin.bottom;

    const x = d3.scaleLinear().range([0, width]);

    const y = d3.scaleLinear().range([height, 0]);

    const xAxis = d3.axisBottom(x);

    const yAxis = d3.axisLeft(y).ticks(4);

    const line = d3
      .line()
      .curve(d3.curveBasis)
      .x(function (d) {
        return x(d.q);
      })
      .y(function (d) {
        return y(d.p);
      });
    const bisect = d3.bisector(function (d) {
      return d.q;
    }).left;
    const svg = d3
      .select(wrapper)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("width", "100%")
      .style("height", "auto")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain([-4, 4]);
    y.domain([0, 0.4]);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .attr("shape-rendering", "crispEdges")
      .call(xAxis);

    svg
      .append("g")
      .attr("class", "y axis")
      .attr("shape-rendering", "crispEdges")
      .call(yAxis);

    svg
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("fill", "none")
      .attr("opacity", ".6")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("d", line);

    const bottom_focus = svg
      .append("g")
      .append("circle")
      .style("pointer-events", "all")
      .style("cursor", "pointer")
      .style("fill", "green")
      .attr("stroke", "black")
      .attr("r", 8.5)
      .style("opacity", 1)
      .attr("cx", x(-1))
      .attr("cy", y(data[bisect(data, -1)].p));

    const bottom_focusLine = svg
      .append("g")
      .append("line")
      .style("fill", "none")
      .attr("stroke", "green")
      .style("opacity", 1)
      .attr("x1", x(-1))
      .attr("y1", y(0))
      .attr("x2", x(-1))
      .attr("y2", y(0.4));

    const upper_focus = svg
      .append("g")
      .append("circle")
      .style("pointer-events", "all")
      .style("cursor", "pointer")
      .style("fill", "red")
      .attr("stroke", "black")
      .attr("r", 8.5)
      .style("opacity", 1)
      .attr("cx", x(1))
      .attr("cy", y(data[bisect(data, 1)].p));
    this.up_value = data[bisect(data, 1)];
    const upper_focusLine = svg
      .append("g")
      .append("line")
      .style("fill", "none")
      .attr("stroke", "red")
      .style("opacity", 1)
      .attr("x1", x(1))
      .attr("y1", y(0))
      .attr("x2", x(1))
      .attr("y2", y(0.4));

    this.down_value = data[bisect(data, -1)];
    // Create the text that travels along the curve of chart
    const focusText = svg
      .append("g")
      .append("text")
      .style("opacity", 0)
      .attr("text-anchor", "left")
      .attr("alignment-baseline", "middle");

    const bottom_drag = d3.drag().on("drag", (e) => {
      bottom_mousemove.call(this, e);
    });


    const upper_drag = d3.drag().on("drag", (e) => {
      upper_mousemove.call(this, e);
    });
    bottom_focus.call(bottom_drag);
    upper_focus.call(upper_drag);

    bottom_focus.on("touchstart", bottom_drag)
    bottom_focus.on("touchmove", bottom_drag)
    upper_focus.on("touchstart", upper_drag)
    upper_focus.on("touchmove", upper_drag)
    
    function getData() {
      d3.ticks(-4, 4, 100).map((x) => {
        const el = {
          q: x,
          p: gaussian(x),
        };
        data.push(el);
      });
      // need to sort for plotting
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
      data.sort(function (x, y) {
        return x.q - y.q;
      });
    }

    function bottom_mousemove(e) {
      const x0 = x.invert(d3.pointer(e)[0] - bound.left - margin.left);
      const i = bisect(data, x0);
      let selectedData = data[i];

      if (
        !selectedData ||
        x(selectedData.q) >= Number(upper_focus.attr("cx"))
      ) {
        return;
      }

      this.down_value = selectedData;

      bottom_focus.attr("cx", x(selectedData.q)).attr("cy", y(selectedData.p));
      bottom_focusLine
        .attr("x1", x(selectedData.q))
        .attr("y1", y(0))
        .attr("x2", x(selectedData.q))
        .attr("y2", y(0.4));
    }

    function upper_mousemove(e) {
      const x0 = x.invert(d3.pointer(e)[0] - bound.left - margin.left);
      const i = bisect(data, x0);
      let selectedData = data[i];

      if (
        !selectedData ||
        x(selectedData.q) <= Number(bottom_focus.attr("cx"))
      ) {
        return;
      }

      this.up_value = selectedData;

      upper_focus.attr("cx", x(selectedData.q)).attr("cy", y(selectedData.p));
      upper_focusLine
        .attr("x1", x(selectedData.q))
        .attr("y1", y(0))
        .attr("x2", x(selectedData.q))
        .attr("y2", y(0.4));
    }
  }
}
customElements.define("bell-chart", BellCurveChart);

function normal() {
  let x = 0,
    y = 0,
    rds,
    c;
  do {
    x = Math.random() * 2 - 1;
    y = Math.random() * 2 - 1;
    rds = x * x + y * y;
  } while (rds == 0 || rds > 1);
  c = Math.sqrt((-2 * Math.log(rds)) / rds); // Box-Muller transform
  return x * c; // throw away extra sample y * c
}

//taken from Jason Davies science library
// https://github.com/jasondavies/science.js/
function gaussian(x) {
  const gaussianConstant = 1 / Math.sqrt(2 * Math.PI),
    mean = 0,
    sigma = 1;

  x = (x - mean) / sigma;
  return (gaussianConstant * Math.exp(-0.5 * x * x)) / sigma;
}
