export default class Section {
  constructor({items, renderer}, selectorContainer) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selectorContainer);
  }

  renderItem() {
    this._items.then((items) => {
      return items.map((item) => {
        this._renderer(item)
      })
    })
  }

  addItem(element) {
    this._container.append(element)
    // this._container.prepend(element)
  }
}