export default class Section {
  constructor({items, renderer}, selectorContainer) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selectorContainer);
  }

  renderItem() {
    // console.log(this._items)
    // this._items.forEach(item => {
    //   this._renderer(item)
    // })
    this._items.then((items) => {
      return items.map((item) => {
        this._renderer(item)
      })
    })
  }

  addItem(element) {
    this._container.append(element)
  }
}