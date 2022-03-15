class Card {
    constructor(title, photo) {
        this._title = title;
        this._photo = photo;
    }

    _getTemplate() {
        const newCard = document.querySelector('#element__card').content.querySelector('.elements__card').cloneNode(true);
        return newCard;
    }

    generateCard() {
        console.log('work');
        this._element = this._getTemplate();
        console.log('work');
        this._setEventListeners();
        this._element.querySelector('.elements__card-photo').src = this._photo;
        this._element.querySelector('.elements__card-photo').alt = this._title;
        this._element.querySelector('.elements__card-title').textContent = this._title;
        return this._element;
    }

    _setEventListeners() {
        console.log('work');
        this._element.querySelector('.elements__card-delete-button').addEventListener('click', () => {
            this._handleDeleteCard();
        });
        console.log('work');
        this._element.querySelector('.elements__card-heart').addEventListener('click', () => {
            this._handleLike();
        });
        console.log('work');
        this._element.querySelector('.elements__card-photo').addEventListener('click', () => {
            this._handlePopupViewImage();
        });
        console.log('work');
    }

    _handleDeleteCard() {
        this._element.querySelector('.elements__card-delete-button').closest('.elements__card').remove();
        console.log('work');
    }

    _handleLike() {
        this._element.querySelector('.elements__card-heart').classList.toggle('elements__card-heart_active');
        console.log('work');
    }

    _handlePopupViewImage() {
        document.querySelector('.popup__image').src = this._photo;
        document.querySelector('.popup__image').alt = this._title;
        document.querySelector('.popup__view-image-title').textContent = this._title;
        openPopup(popupViewImage);
        console.log('work');
    }
}

export default Card;