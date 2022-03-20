import { Popup } from "./Popup";

export class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(title, photo) {
        this._popup.querySelector('.popup__image').src = photo;
        this._popup.querySelector('.popup__image').alt = title;
        this._popup.querySelector('.popup__view-image-title').textContent = title;
        super.open();
    }
}