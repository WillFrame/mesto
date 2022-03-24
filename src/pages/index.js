import { Card } from '../scripts/Components/Card.js';
import { FormValidation } from '../scripts/Components/FormValidation.js';
import { PopupWithImage } from '../scripts/Components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/Components/PopupWithForm.js';
import { Section } from '../scripts/Components/Section.js';
import { UserInfo } from '../scripts/Components/UserInfo.js';
import { Api } from '../scripts/Components/Api.js';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
    headers: {
        authorization: 'fc1e8853-6135-4999-aec3-43dddd019696',
        'Content-Type': 'application/json'
    }
});

let userId;

api.getProfile()
    .then(res => {
        userInfo.setUserInfo(res.name, res.about);
        userId = res._id;
    });

api.getInitialCards()
    .then(cardList => {
        cardList.forEach(data => {
            const newCard = createCard(data);
            section.addItem(newCard);
        });
    });

import { validationValue, profileEditButton, profileAddButton, profileAvatarButton, popupEditProfileForm, popupEditProfileInputName, 
popupEditProfileInputInfo, popupAddCardForm, popupEditAvatarForm} from '../scripts/utils/constants.js';

import './index.css';

const validationProfileForm = new FormValidation(validationValue, popupEditProfileForm);
const validationCardForm = new FormValidation(validationValue, popupAddCardForm);
const validationAvatarForm = new FormValidation(validationValue, popupEditAvatarForm);
const popupWithImage = new PopupWithImage('.popup_content_view-image');
const userInfo = new UserInfo( { nameSelector: '.profile__name', infoSelector: '.profile__subname', avatarSelector: '.profile__avatar'});
const popupEditProfileInfo = new PopupWithForm('.popup_content_edit-profile', handleEditProfileSubmit);
const popupCloseSubmit = new PopupWithForm('.popup_content_close-submit', () => {})
const popupEditProfileAvatar = new PopupWithForm('.popup_content_edit-avatar', handleEditAvatarSubmit);

const section = new Section( {
    items: [], 
    renderer: (item) => {
        const newCard = createCard(item);
        section.addItem(newCard);
    }
}, '.elements');

const popupAddNewCard = new PopupWithForm('.popup_content_add-card', handleAddCardSubmit);

function createCard(data) {
    const card = new Card(data, userId, '#element__card', handleCardClick, 
    (id) => {
        popupCloseSubmit.open();
        popupCloseSubmit.changeSubmitCallback(() => {
            api.deleteCard(id)
            .then(() => {
                popupCloseSubmit.close();
                card.handleDeleteCard();
            })
        });
    },
    (id) => {
        if (card.isLiked()) {
            api.deleteLike(id)
            .then(res => card.setLikes(res.likes));
        } else {
            api.addLike(id)
            .then(res => card.setLikes(res.likes));
        }
    }
    );
    const cardElement = card.generateCard();
    return cardElement;
}

function handleCardClick(title, photo) {
    popupWithImage.open(title, photo);
}

function handleEditProfileSubmit(data) {
    api.editProfile(data.name, data.info)
    .then(() => {
        userInfo.setUserInfo(data.name, data.info);
        this.close();
    });
}

function handleAddCardSubmit(item) {
    api.addCard(item.name, item.link)
    .then((res) => {
        const newCard = createCard(res);
        section.addItem(newCard);
        this.close();
    });
}

function handleEditAvatarSubmit(data) {
    api.editAvatar(data.avatar)
    .then((res) => {
        console.log(res);
        userInfo.setNewAvatar(data.avatar);
        this.close();
    });
}

profileAddButton.addEventListener('click', () => {
    popupAddCardForm.reset();
    validationCardForm.toggleButtonState();
    validationCardForm.clearErrors();
    popupAddNewCard.open();
});

profileEditButton.addEventListener('click', () => {
    const data = userInfo.getUserInfo();
    popupEditProfileInputName.value = data.name;
    popupEditProfileInputInfo.value = data.info;
    validationProfileForm.toggleButtonState();
    validationProfileForm.clearErrors();
    popupEditProfileInfo.open();
});

profileAvatarButton.addEventListener('click', () => {
    popupEditAvatarForm.reset();
    validationAvatarForm.toggleButtonState();
    validationAvatarForm.clearErrors();
    popupEditProfileAvatar.open();
});

section.setItem();
popupWithImage.setEventListeners();
popupEditProfileInfo.setEventListeners();
popupAddNewCard.setEventListeners();
popupCloseSubmit.setEventListeners();
popupEditProfileAvatar.setEventListeners();
validationProfileForm.enableValidation();
validationCardForm.enableValidation();
validationAvatarForm.enableValidation();