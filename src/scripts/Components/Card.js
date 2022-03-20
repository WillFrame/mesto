export class Card {
    constructor(data, template, handleCardClick) {
        console.log('constructor', {data});
        this._title = data.title;
        this._photo = data.photo;
        this._template = template;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const newCard = document.querySelector(this._template).content.querySelector('.elements__card').cloneNode(true);
        return newCard;
    }

    generateCard() {
        console.log('generate 0', {item: this});
        this._element = this._getTemplate();
        this._setEventListeners();
        console.log('generate', {item: this});
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
            this._handleCardClick(this._title, this._photo);
        });
    }

    _handleDeleteCard() {
        this._element.querySelector('.elements__card-delete-button').closest('.elements__card').remove();
    }

    _handleLike() {
        this._element.querySelector('.elements__card-heart').classList.toggle('elements__card-heart_active');
    }
}