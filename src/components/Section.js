export default class Section {
  constructor({items, renderer}, selectorContainer) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selectorContainer);
  }

  renderItem() {
    console.log('start Section.renderItem')
    // this._items.then((items) => {
    //   return items.map((item) => {
    //     // this._renderer(item)
    //     // console.log(card)
    //     this.addItem(this._renderer(item))
    //   })
    // })
    
      return this._items.map((item) => {
        // this._renderer(item)
        // console.log(card)
        this.addItem(this._renderer(item))
      })
    
  }

  addItem(element) {
    console.log('start addItem')
    this._container.append(element)
    // this._container.prepend(element)
  }
}