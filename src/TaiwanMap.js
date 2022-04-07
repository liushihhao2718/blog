//@ts-check
import * as d3 from "d3";
import * as topojson from "topojson-client";
import data from "./COUNTY_MOI_1090820.json";
import people from "./人口性別統計.json";

class TaiwanMap extends HTMLElement {
  constructor() {
    super();
    this._root = null;
    this.selected = new Set();
    this._root = this.attachShadow({mode: 'open'});
    this.style.display = 'block'
    this.style.backgroundColor = "#f8f9fa!important"
  }
  get value(){
    return Array.from(this.selected).map(x=> people[x]);
  }
  disconnectedCallback(){
    this.map.remove()
  }
  connectedCallback(){
    const wrapper = document.createElement('div');
    wrapper.style.width = '100%';
    wrapper.style.height = 'auto';
    // 設定 svg 的寬高
    this.map = d3
      .select(wrapper)
      .append('svg')
      .attr("width", 1000)
      .attr("height", 1000)
      .attr("viewBox", "0 0 1000 1000")
      .style("width", "100%")
      .style("height", "auto");
    this.draw(data);

    this._root.appendChild(wrapper)
  }
  draw(mapData) {
    // 設定投影中心點與縮放倍率
    const projection = d3.geoMercator().center([120.5, 25]).scale(12000);

    // 將投影資料轉換為路徑
    const path = d3.geoPath(projection);
    const geojson = topojson.feature(mapData, data.objects.COUNTY_MOI_1090820);

    let selected = this.selected;
    // 繪製地圖
    this.map
      .selectAll("path")
      .data(geojson.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("stroke", "black")
      .attr("stroke-width", "0.7")
      .attr("fill", "steelblue")
      .attr("data-name", (d) => {
        // console.log(
        //   people.findIndex((x) => x.區域別 === d.properties.COUNTYNAME)
        // );
        return people.findIndex((x) => x.區域別 === d.properties.COUNTYNAME);
      })
      .on("mouseover", function () {
        let el = d3.select(this);
        if (!selected.has(el.attr("data-name"))) {
          d3.select(this).attr("fill", "#007bff");
        }

        //   const i = d3.select(this).attr('data-name');
        //   console.log(people[i])
      })
      .on("mouseleave", function () {
        let el = d3.select(this);
        if (!selected.has(el.attr("data-name"))) {
          d3.select(this).attr("fill", "steelblue");
        }
      })
      .on("click", function () {
        let el = d3.select(this);
        if (!selected.has(el.attr("data-name"))) {
          el.attr("fill", "red");
          selected.add(el.attr("data-name"));
        } else {
          el.attr("fill", "#007bff");
          selected.delete(el.attr("data-name"));
        }
      });
  }
}
customElements.define("tw-map", TaiwanMap);
