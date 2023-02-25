export default class Section {
  constructor({ items, renderer }, selectorContainer) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selectorContainer);
  }

  renderItem() {
    return this._items.map((item) => {
      this.addItem(this._renderer(item));
    });
  }

  prependItem(element) {
    this._container.prepend(element);
  }

  addItem(element) {
    this._container.append(element);
  }
}
