export class Section {
    constructor({ item, renderer }, containerSelector) {
        this._renderedItems = item;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    addItem(element) {
        this._container.prepend(element);
    }

    setItem() {
        this._renderedItems.forEach(item => {
            this._renderer(item);
        });
    }
}