const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const cardTemplate = document.querySelector('#element__card').content;
const elementsContainer = document.querySelector('.elements');

const popupViewImage = document.querySelector('.popup_content_view-image');
const popupViewImagePhoto = popupViewImage.querySelector('.popup__image');
const popupViewImageTitle = popupViewImage.querySelector('.popup__view-image-title');
const popupViewImageCloseButton = popupViewImage.querySelector('.popup__close');

const profileName = document.querySelector('.profile__name');
const profileSubName = document.querySelector('.profile__subname');

const popups = Array.from(document.querySelectorAll('.popup'));

const popupEditProfile = document.querySelector('.popup_content_edit-profile');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const popupEditProfileInputName = popupEditProfile.querySelector('.popup__input_content_name');
const popupEditProfileInputSubName = popupEditProfile.querySelector('.popup__input_content_subname');

const popupAddCard = document.querySelector('.popup_content_add-card');
const popupAddCardForm = popupAddCard.querySelector('.popup__form');
const popupAddCardInputTitle = popupAddCard.querySelector('.popup__input_content_title');
const popupAddCardInputImage = popupAddCard.querySelector('.popup__input_content_image');

class Card {
    constructor(data) {
        this._title = data.name;
        this._photo = data.link;
    }

    _getTemplate() {
        const newCard = document.querySelector('#element__card').content.querySelector('.elements__card').cloneNode(true);
        return newCard;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__card-photo').src = this._photo;
        this._element.querySelector('.element__card-photo').alt = this._title;
        this._element.querySelector('.element__card-title').textContent = this._title;
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.elements__card-delete-button').addEventListener('click', () => {
            this._handleDeleteCard();
        });
        this._element.querySelector('.elements__card-heart').addEventListener('click', () => {
            this._handleLike();
        });
        this._element.querySelector('.element__card-photo').addEventListener('click', () => {
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
        document.querySelector('.popup_content_view-image').classList.add('popup_opened');
    }
}

initialCards.forEach((item) => {
    const card = new Card(item);
    const cardElement = card.generateCard();
    elementsContainer.append(cardElement);
  });

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

function submitPopup(popup, event) {
    event.preventDefault();
    closePopup(popup);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

function addNewCard(data) {
    const newCard = new Card(data);
    elementsContainer.prepend(newCard);
}

function createNewCard(title, photo) {
    const newCard = cardTemplate.querySelector('.elements__card').cloneNode(true);
    const cardImage = newCard.querySelector('.elements__card-photo');
    const cardTitle = newCard.querySelector('.elements__card-title');
    cardImage.src = photo;
    cardImage.alt = title;
    cardTitle.textContent = title;
    const deleteButton = newCard.querySelector('.elements__card-delete-button');
    deleteButton.addEventListener('click', () => {
        const element = deleteButton.closest('.elements__card');
        element.remove();
    });
    const likeButton = newCard.querySelector('.elements__card-heart');
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('elements__card-heart_active');
    });
    cardImage.addEventListener('click', () => {
        popupViewImagePhoto.src = cardImage.src;
        popupViewImagePhoto.alt = cardImage.alt;
        popupViewImageTitle.textContent = cardTitle.textContent;
        openPopup(popupViewImage);
    });
    return newCard;
}

function checkNewOpen(form) {
    inputList = Array.from(form.querySelectorAll('.popup__input'));
    buttonElement = form.querySelector('.popup__save-button');
    toggleButtonState(inputList, buttonElement, validationValue);
}

profileEditButton.addEventListener('click', () => {
    popupEditProfileInputName.value = profileName.textContent;
    popupEditProfileInputSubName.value = profileSubName.textContent;
    checkNewOpen(popupEditProfileForm);
    clearErrors(popupEditProfileForm, validationValue);
    openPopup(popupEditProfile);
});

popupEditProfileForm.addEventListener('submit', (event) => {
    submitPopup(popupEditProfile, event);
    profileName.textContent = popupEditProfileInputName.value;
    profileSubName.textContent = popupEditProfileInputSubName.value;
});

popups.forEach((item) => {
    item.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
            closePopup(item);
        }
    });
});

function closeByEscape(event) {
    if (event.key === 'Escape') {
        const currentPopup = document.querySelector('.popup_opened');
        closePopup(currentPopup);
    }
};

profileAddButton.addEventListener('click', () => {
    popupAddCardForm.reset();
    checkNewOpen(popupAddCardForm);
    clearErrors(popupAddCardForm, validationValue);
    openPopup(popupAddCard);
});

popupAddCardForm.addEventListener('submit', (event) => {
    submitPopup(popupAddCard, event);
    addNewCard(popupAddCardInputTitle.value, popupAddCardInputImage.value);
});