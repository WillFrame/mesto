import { openPopup } from "./index.js";

class Card {
    constructor(data, template) {
        this._title = data.name;
        this._photo = data.link;
        this._template = template;
    }

    _getTemplate() {
        const newCard = document.querySelector('#element__card').content.querySelector('.elements__card').cloneNode(true);
        return newCard;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.elements__card-photo').src = this._photo;
        this._element.querySelector('.elements__card-photo').alt = this._title;
        this._element.querySelector('.elements__card-title').textContent = this._title;
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.elements__card-delete-button').addEventListener('click', () => {
            this._handleDeleteCard();
        });
        this._element.querySelector('.elements__card-heart').addEventListener('click', () => {
            this._handleLike();
        });
        this._element.querySelector('.elements__card-photo').addEventListener('click', () => {
            this._handlePopupViewImage();
        });
    }

    _handleDeleteCard() {
        this._element.querySelector('.elements__card-delete-button').closest('.elements__card').remove();
    }

    _handleLike() {
        this._element.querySelector('.elements__card-heart').classList.toggle('elements__card-heart_active');
    }

    _handlePopupViewImage() {
        document.querySelector('.popup__image').src = this._photo;
        document.querySelector('.popup__image').alt = this._title;
        document.querySelector('.popup__view-image-title').textContent = this._title;
        openPopup(document.querySelector('.popup_content_view-image'));
    }
}

export default Card;