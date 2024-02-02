export default class ColumnChart {
  data;
  label;
  value;
  link;
  element;
  chartHeight;
  constructor({data=[], label, value, link, formatHeading = (data) => data} = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = formatHeading(value);
    this.chartHeight = this.setChartHeight();
    this.element = this.renderElement();
  }

  renderElement() {
    const element = document.createElement("column-chart__container");
    element.innerHTML = this.template()
    return element.firstChild;
  }

  template() {
    if (!this.data || !this.data.length) {
      return (
          `<div class="column-chart column-chart_loading" style="--chart-height: 50">
            <div class="column-chart__title">
              Total ${this.label}
              <a class="column-chart__link" href="#">View all</a>
            </div>
            <div class="column-chart__container">
              <div data-element="header" class="column-chart__header">
                ${this.value}
              </div>
              <div data-element="body" class="column-chart__chart">

              </div>
            </div>
          </div>`
        );
    }
      return (
          `<div class="column-chart" style="--chart-height: 50">
            <div class="column-chart__title">
              Total ${this.label}
              <a href="/sales" class="column-chart__link">View all</a>
            </div>
            <div class="column-chart__container">
              <div data-element="header" class="column-chart__header">${this.value}</div>
              <div data-element="body" class="column-chart__chart">
                ` + this.columnsRender()  + `
              </div>
            </div>`
      );
  }

  destroy() {
    this.element = null;
  }

  remove() {
    this.element.remove()
  }

  columnsRender() {
    let result = "";
    this.data.forEach(el => result += `<div style="--value: ${Number.parseInt(el * (50 / this.chartHeight))}" data-tooltip="${(el / this.chartHeight * 100).toFixed(0)}%"></div>\n`);
    return result
  }

  update(data) {
    this.data = data;
    this.columnsRender();
  }

  setChartHeight() {
    if (!this.data.length) {
      return 50;
    }
    return Math.max(...this.data);
  }

}



