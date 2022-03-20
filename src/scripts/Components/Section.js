export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element) {
        this._container.prepend(element);
    }

    setItem() {
        console.log(this.items);
        this.items.forEach((element) => {
            this._renderer(element);
        });
    }
}