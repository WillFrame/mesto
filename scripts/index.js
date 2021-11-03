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

let profileName = document.querySelector('.profile__name');
let profileSubName = document.querySelector('.profile__subname');

const popupEditProfile = document.querySelector('.popup_content_edit-profile');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close');
let popupEditProfileInputName = popupEditProfile.querySelector('.popup__input_content_name');
let popupEditProfileInputSubName = popupEditProfile.querySelector('.popup__input_content_subname');

const popupAddCard = document.querySelector('.popup_content_add-card');
const popupAddCardForm = popupAddCard.querySelector('.popup__form');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close');
let popupAddCardInputTitle = popupAddCard.querySelector('.popup__input_content_title');
let popupAddCardInputImage = popupAddCard.querySelector('.popup__input_content_image');

initialCards.forEach((item) => {
    addNewCard(item.name, item.link);
})

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function submitPopup(popup, event) {
    event.preventDefault();
    closePopup(popup);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function addNewCard(title, photo) {
    const newCard = cardTemplate.querySelector('.elements__card').cloneNode(true);
    newCard.querySelector('.elements__card-photo').src = photo;
    newCard.querySelector('.elements__card-title').textContent = title;
    elementsContainer.prepend(newCard);
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
popupEditProfileCloseButton.addEventListener('click', () => {
    closePopup(popupEditProfile);
});

profileAddButton.addEventListener('click', () => {
    openPopup(popupAddCard);
});
popupAddCardForm.addEventListener('submit', () => {
    submitPopup(popupAddCard, event);
    addNewCard(popupAddCardInputTitle.value, popupAddCardInputImage.value);
})