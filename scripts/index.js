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
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close');
const popupEditProfileInputName = popupEditProfile.querySelector('.popup__input_content_name');
const popupEditProfileInputSubName = popupEditProfile.querySelector('.popup__input_content_subname');

const popupAddCard = document.querySelector('.popup_content_add-card');
const popupAddCardForm = popupAddCard.querySelector('.popup__form');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close');
const popupAddCardInputTitle = popupAddCard.querySelector('.popup__input_content_title');
const popupAddCardInputImage = popupAddCard.querySelector('.popup__input_content_image');

initialCards.forEach((item) => {
    addNewCard(item.name, item.link);
})

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

function addNewCard(title, photo) {
    const newCard = createNewCard(title, photo);
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

function popupAddCardInputClear() {
    popupAddCardInputTitle.value = '';
    popupAddCardInputImage.value = '';
}

profileEditButton.addEventListener('click', () => {
    popupEditProfileInputName.value = profileName.textContent;
    popupEditProfileInputSubName.value = profileSubName.textContent;
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
    popupAddCardInputClear();
    openPopup(popupAddCard);
});
popupAddCardForm.addEventListener('submit', (event) => {
    submitPopup(popupAddCard, event);
    addNewCard(popupAddCardInputTitle.value, popupAddCardInputImage.value);
})