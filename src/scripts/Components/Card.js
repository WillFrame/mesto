export class Card {
    constructor(data, userId, template, handleCardClick, handleDeleteClick, handleLikeClick) {
        this._title = data.name;
        this._photo = data.link;
        this._likes = data.likes;
        this._id = data._id;
        this._ownerId = data.owner._id;
        this._userId = userId;

        this._template = template;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
    }

    _getTemplate() {
        const newCard = document.querySelector(this._template).content.querySelector('.elements__card').cloneNode(true);
        return newCard;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.elements__card-photo').src = this._photo;
        this._element.querySelector('.elements__card-photo').alt = this._title;
        this._element.querySelector('.elements__card-title').textContent = this._title;
        this.setLikes(this._likes);
        if (this._ownerId !== this._userId) {
            this._element.querySelector('.elements__card-delete-button').style.display = 'none';
        }

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.elements__card-delete-button').addEventListener('click', () => {
            this._handleDeleteClick(this._id);
        });
        this._element.querySelector('.elements__card-heart').addEventListener('click', () => {
            this._handleLikeClick(this._id);
        });
        this._element.querySelector('.elements__card-photo').addEventListener('click', () => {
            this._handleCardClick(this._title, this._photo);
        });
    }

    setLikes(newLikes) {
        this._likes = newLikes;
        const likeCount = this._element.querySelector('.elements__card-like-count');
        likeCount.textContent = this._likes.length;
        if (this.isLiked()) {
            this._handleLikeOn();
        } else {
            this._handleLikeOff();
        }
    }

    handleDeleteCard() {
        this._element.querySelector('.elements__card-delete-button').closest('.elements__card').remove();
    }

    _handleLikeOn() {
        this._element.querySelector('.elements__card-heart').classList.add('elements__card-heart_active');
    }

    _handleLikeOff() {
        this._element.querySelector('.elements__card-heart').classList.remove('elements__card-heart_active');
    }

    isLiked() {
        const userHasLikedCard = this._likes.find(user => user._id === this._userId);
        return userHasLikedCard;
    }
}