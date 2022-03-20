import { Popup } from "./Popup";

export class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupTitle = this._popup.querySelector('.popup__view-image-title');
    }

    open(title, photo) {
        this._popupImage.src = photo;
        this._popupImage.alt = title;
        this._popupTitle.textContent = title;
        super.open();
    }
}