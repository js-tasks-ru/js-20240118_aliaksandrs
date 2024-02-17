export default class SortableTable {
  headerData;
  data;
  element={};
  subElements={};

  constructor(headerConfig = [], data = []) {
    this.headerData = headerConfig;
    this.data = data;
    this.element = this.renderTable();
    this.initSubElements();
  }

  initSubElements() {
    this.element.querySelectorAll('[data-element]').forEach(element => {
      this.subElements[element.dataset.element] = element;
    });
  }

  renderTable() {
    const element = document.createElement('div');
    element.innerHTML = this.createTemplate();
    return element.firstChild;
  }

  createTemplate() {
    return `<div data-element="productsContainer" class="products-list__container">
                    <div class="sortable-table">
                      ${this.createHeader()}
                      ${this.createBody(this.createRowsBody(this.data))}
                    </div>
                  </div>`
  }

  createHeader() {
    return `<div data-element="header" class="sortable-table__header sortable-table__row">
              ${this.headerData.map(el => {
                return `<div class="sortable-table__cell" data-id="${el.id}" data-sortable="${el.sortable}" "> //data-order="${this.order}
                            <span>${el.title}</span>
                        </div>`
              }).join('')}
            </div>`
  }

  createBody(cont) {
    return `<div data-element="body" class="sortable-table__body">
            ${cont}
            </div>`;
  }

  createColumsBody(elem) {
    return this.headerData.map(i => {
      if ('template' in i) {
        return i.template(elem[i.id]);
      }
      return `<div class="sortable-table__cell">${elem[i.id]}</div>`;
    }).join('');
  }

  createRowsBody(arr) {
    return arr.map(i => {
      return `
			<a href="/products/${i.id}" class="sortable-table__row">
				${this.createColumsBody(i)}
			</a>`;
    }).join('');
  }



  destroy() {
    this.remove();
  }

  remove() {
    this.element.remove();
  }


  sort(field = 'title', type = 'asc') {
    let subElems;
    if (type == 'desc') {
      subElems = [...this.data].sort((a,b) => {
        if (typeof a[field] === 'string'){
          return new Intl.Collator(["ru", "eng"]).compare(b[field], a[field]);
        } else {
          return b[field] - a[field];
        }
      });
    } else {
      subElems = [...this.data].sort((a,b) =>  {
        if (typeof a[field] === 'string'){
          return new Intl.Collator(["ru", "eng"]).compare(a[field], b[field]);
        } else {
          return a[field] - b[field];
        }
      });
    }
    console.log(subElems);
    this.subElements.body.innerHTML = this.createRowsBody(subElems);
  }
}

