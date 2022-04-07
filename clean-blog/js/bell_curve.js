//@ts-check
import * as d3 from "d3";

class BellCurveChart extends HTMLElement {
    constructor() {
        super();

        this._root = this.attachShadow({ mode: "open" });
        this.style.display = "block";
        // this.style.backgroundColor = "#f8f9fa";

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
        let that = this;
        const data = [];

        let max = this.attributes["max"]
            ? Number(this.attributes["max"].value)
            : 1;
        let min = this.attributes["min"]
            ? Number(this.attributes["min"].value)
            : -1;

        getData(); // popuate data

        const bound = this.getBoundingClientRect();
        const margin = {
                top: 30,
                right: 30,
                bottom: 50,
                left: 50,
            },
            width = bound.width - margin.left - margin.right,
            height =
                bound.width * (((3 / 4) * 2) / 5) - margin.top - margin.bottom;

        const x = d3.scaleLinear().range([0, width]);

        const y = d3.scaleLinear().range([height, 0]);

        const xAxis = d3
            .axisBottom(x)
            .tickFormat((x) => (x == 0 ? "0" : `${x}σ`));

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
            .attr(
                "viewBox",
                `0 0 ${width + margin.left + margin.right} ${
                    height + margin.top + margin.bottom
                }`
            )
            .append("g")
            .attr(
                "transform",
                "translate(" + margin.left + "," + margin.top + ")"
            );

        x.domain([-4, 4]);
        y.domain([0, 0.4]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .attr("shape-rendering", "crispEdges")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .attr("shape-rendering", "crispEdges")
            .call(yAxis);

        svg.append("path")
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
            .style("fill", "#6ea8fe")
            .attr("stroke", "#0d6efd")
            .attr("r", 5)
            .style("opacity", 1)
            .attr("cx", x(min))
            .attr("cy", y(data[bisect(data, min)].p));

        const bottom_focusLine = svg
            .append("g")
            .append("line")
            .style("fill", "none")
            .attr("stroke", "#6ea8fe")
            .style("opacity", 1)
            .attr("x1", x(min))
            .attr("y1", y(0))
            .attr("x2", x(min))
            .attr("y2", y(0.4));

        const upper_focus = svg
            .append("g")
            .append("circle")
            .style("pointer-events", "all")
            .style("cursor", "pointer")
            .style("fill", "#6ea8fe")
            .attr("stroke", "#0d6efd")
            .attr("r", 5)
            .style("opacity", 1)
            .attr("cx", x(max))
            .attr("cy", y(data[bisect(data, max)].p));
        this.up_value = data[bisect(data, max)];
        const upper_focusLine = svg
            .append("g")
            .append("line")
            .style("fill", "none")
            .attr("stroke", "#6ea8fe")
            .style("opacity", 1)
            .attr("x1", x(max))
            .attr("y1", y(0))
            .attr("x2", x(max))
            .attr("y2", y(0.4));

        this.down_value = data[bisect(data, min)];

        const bottom_drag = d3
            .drag()
            .on("drag", (e) => bottom_mousemove.call(this, e));

        const upper_drag = d3.drag().on("drag", (e) => {
            upper_mousemove.call(this, e);
        });
        bottom_focus.call(bottom_drag);
        upper_focus.call(upper_drag);

        let v = this.value;
        const valueText = svg
            .append("text")
            .style("font-size", "16px")
            .attr("x", width / 2 - 4 * 8)
            .attr("y", height + 35)
            .text((v * 100).toFixed(4) + "%");

        function getData() {
            d3.ticks(-4, 4, 100).map((x) => {
                const el = {
                    q: x,
                    p: gaussian(x),
                };
                data.push(el);
            });
            // need to sort for plotting
            data.sort(function (x, y) {
                return x.q - y.q;
            });
        }

        function bottom_mousemove(e) {
            const x0 = x.invert(e.x);
            const i = bisect(data, x0);
            let selectedData = data[i];

            if (
                !selectedData ||
                x(selectedData.q) >= Number(upper_focus.attr("cx"))
            ) {
                return;
            }

            this.down_value = selectedData;

            bottom_focus
                .attr("cx", x(selectedData.q))
                .attr("cy", y(selectedData.p));
            bottom_focusLine
                .attr("x1", x(selectedData.q))
                .attr("y1", y(0))
                .attr("x2", x(selectedData.q))
                .attr("y2", y(0.4));
            valueText.text((that.value * 100).toFixed(4) + "%");

            let event = new CustomEvent("change");
            that.dispatchEvent(event);
        }

        function upper_mousemove(e) {
            const x0 = x.invert(e.x);
            const i = bisect(data, x0);
            let selectedData = data[i];

            if (
                !selectedData ||
                x(selectedData.q) <= Number(bottom_focus.attr("cx"))
            ) {
                return;
            }

            this.up_value = selectedData;

            upper_focus
                .attr("cx", x(selectedData.q))
                .attr("cy", y(selectedData.p));
            upper_focusLine
                .attr("x1", x(selectedData.q))
                .attr("y1", y(0))
                .attr("x2", x(selectedData.q))
                .attr("y2", y(0.4));
            valueText.text((that.value * 100).toFixed(4) + "%");
            let event = new CustomEvent("change");
            that.dispatchEvent(event);
        }
    }

    get value() {
        return GetZPercent(this.up_value.q) - GetZPercent(this.down_value.q);
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

function GetZPercent(z) {
    // z == number of standard deviations from the mean

    // if z is greater than 6.5 standard deviations from the mean the
    // number of significant digits will be outside of a reasonable range

    if (z < -6.5) {
        return 0.0;
    }

    if (z > 6.5) {
        return 1.0;
    }

    var factK = 1;
    var sum = 0;
    var term = 1;
    var k = 0;
    var loopStop = Math.exp(-23);

    while (Math.abs(term) > loopStop) {
        term =
            (((0.3989422804 * Math.pow(-1, k) * Math.pow(z, k)) /
                (2 * k + 1) /
                Math.pow(2, k)) *
                Math.pow(z, k + 1)) /
            factK;
        sum += term;
        k++;
        factK *= k;
    }

    sum += 0.5;

    return sum;
}
