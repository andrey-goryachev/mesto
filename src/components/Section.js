export default class Section {
  constructor({items, renderer}, selectorContainer) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selectorContainer);
  }

  renderItem() {   
      return this._items.map((item) => {
        this.addItem(this._renderer(item))
      })
    
  }

  addItem(element) {
    return new Promise((resolve, reject) => { 
      this._container.append(element)
      const childrensContainer = Array.from(this._container.children)
      childrensContainer.includes(element) ? resolve() : reject()
     })
  }
}