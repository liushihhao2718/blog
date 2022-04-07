//@ts-check

import * as d3 from "d3";

class PopulationPyramid extends HTMLElement {
    constructor() {
        super();
        this._root = null;
        this.data = []
        this._root = this.attachShadow({ mode: "open" });
        this.style.display = "block";
        this.style.backgroundColor = "#f8f9fa!important";
    }
    connectedCallback() {
        this.wrapper = document.createElement("div");
        this.wrapper.style.width = "100%";
        this.wrapper.style.height = "auto";

        pyramidBuilder(this.data, this.wrapper)
        this._root.appendChild(this.wrapper);
    }


    setData(data){
        this.wrapper.remove()
        this.wrapper = document.createElement("div");
        this.wrapper.style.width = "100%";
        this.wrapper.style.height = "auto";

        
            pyramidBuilder(data, this.wrapper)
        
        
        this._root.appendChild(this.wrapper);
    }

}
customElements.define("population-pyramid", PopulationPyramid);

function pyramidBuilder(data, target, options) {
    var w = typeof options?.width === "undefined" ? 500 : options.width,
        h = typeof options?.height === "undefined" ? 500 : options.height,
        w_full = w,
        h_full = h;

    var margin = {
            top: 50,
            right: 10,
            bottom: 20,
            left: 10,
            middle: 20,
        },
        sectorWidth = w / 2 - margin.middle,
        leftBegin = sectorWidth - margin.left,
        rightBegin = w - margin.right - sectorWidth;

    w = w - (margin.left + margin.right);
    h = h - (margin.top + margin.bottom);
    let style = {
            leftBarColor: "#6c9dc6",
            rightBarColor: "#de5454",
            tooltipBG: "#fefefe",
            tooltipColor: "black",
        };


    var totalPopulation = d3.sum(data, function (d) {
            return d.male + d.female;
        }),
        percentage = function (d) {
            return d / totalPopulation;
        };

    var region = d3
        .select(target)
        .append("svg")
        .attr("width", w_full)
        .attr("height", h_full)
        .attr("viewBox", `0 0 ${w_full} ${h_full}`)
        .style("width", "100%")
        .style("height", "auto");

    var legend = region.append("g").attr("class", "legend");

    legend
        .append("rect")
        .attr("class", "bar left")
        .attr("x", w / 2 - margin.middle * 3)
        .attr("y", 12)
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", style.leftBarColor)

    legend
        .append("text")
        .attr("fill", "#000")
        .attr("x", w / 2 - margin.middle * 2)
        .attr("y", 18)
        .attr("dy", "0.32em")
        .text("Males");

    legend
        .append("rect")
        .attr("class", "bar right")
        .attr("x", w / 2 + margin.middle * 2)
        .attr("y", 12)
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", style.rightBarColor)

    legend
        .append("text")
        .attr("fill", "#000")
        .attr("x", w / 2 + margin.middle * 3)
        .attr("y", 18)
        .attr("dy", "0.32em")
        .text("Females");

    var tooltipDiv = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var pyramid = region
        .append("g")
        .attr("class", "inner-region")
        .attr("transform", translation(margin.left, margin.top));

    // find the maximum data value for whole dataset
    // and rounds up to nearest 5%
    //  since this will be shared by both of the x-axes
    var maxValue =
        Math.ceil(
            Math.max(
                d3.max(data, function (d) {
                    return percentage(d.male);
                }),
                d3.max(data, function (d) {
                    return percentage(d.female);
                })
            ) / 0.05
        ) * 0.05;

    // SET UP SCALES

    // the xScale goes from 0 to the width of a region
    //  it will be reversed for the left x-axis
    var xScale = d3
        .scaleLinear()
        .domain([0, maxValue])
        .range([0, sectorWidth - margin.middle])
        .nice();

    var yScale = d3
        .scaleBand()
        .domain(
            data.map(function (d) {
                return d.age;
            })
        )
        .range([h, 0])
        .padding(0.1);

    // SET UP AXES
    var yAxisLeft = d3
        .axisRight(yScale)
        .tickSize(4)
        .tickPadding(margin.middle - 4);

    var yAxisRight = d3.axisLeft(yScale).tickSize(4).tickFormat((d)=>"");

    var xAxisRight = d3.axisBottom(xScale).tickFormat(d3.format(".0%"));

    var xAxisLeft = d3
        .axisBottom(xScale.copy().range([leftBegin, 0]))
        // REVERSE THE X-AXIS SCALE ON THE LEFT SIDE BY REVERSING THE RANGE
        .tickFormat(d3.format(".0%"));

    // MAKE GROUPS FOR EACH SIDE OF CHART
    // scale(-1,1) is used to reverse the left side so the bars grow left instead of right
    var leftBarGroup = pyramid
        .append("g")
        .attr("transform", translation(leftBegin, 0) + "scale(-1,1)");
    var rightBarGroup = pyramid
        .append("g")
        .attr("transform", translation(rightBegin, 0));

    // DRAW AXES
    pyramid
        .append("g")
        .attr("class", "axis y left")
        .attr("transform", translation(leftBegin, 0))
        .call(yAxisLeft)
        .selectAll("text")
        .style("text-anchor", "middle");

    pyramid
        .append("g")
        .attr("class", "axis y right")
        .attr("transform", translation(rightBegin, 0))
        .call(yAxisRight);

    pyramid
        .append("g")
        .attr("class", "axis x left")
        .attr("transform", translation(0, h))
        .call(xAxisLeft);

    pyramid
        .append("g")
        .attr("class", "axis x right")
        .attr("transform", translation(rightBegin, h))
        .call(xAxisRight);

    // DRAW BARS
    leftBarGroup
        .selectAll(".bar.left")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar left")
        .attr("x", 0)
        .attr("y", function (d) {
            return yScale(d.age) + margin.middle / 4;
        })
        .attr("width", function (d) {
            return xScale(percentage(d.male));
        })
        .attr("height", yScale.range()[0] / data.length - margin.middle / 2)
        .attr("fill", style.leftBarColor)

    rightBarGroup
        .selectAll(".bar.right")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar right")
        .attr("x", 0)
        .attr("y", function (d) {
            return yScale(d.age) + margin.middle / 4;
        })
        .attr("width", function (d) {
            return xScale(percentage(d.female));
        })
        .attr("height", yScale.range()[0] / data.length - margin.middle / 2)
        .attr("fill", style.rightBarColor)

    /* HELPER FUNCTIONS */

    // string concat for translate
    function translation(x, y) {
        return "translate(" + x + "," + y + ")";
    }
}
