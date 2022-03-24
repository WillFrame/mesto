export const validationValue = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const profileAvatarButton = document.querySelector('.profile__avatar-button');

const popupEditProfile = document.querySelector('.popup_content_edit-profile');
export const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
export const popupEditProfileInputName = popupEditProfile.querySelector('.popup__input_content_name');
export const popupEditProfileInputInfo = popupEditProfile.querySelector('.popup__input_content_subname');
export const popupEditProfileSubmitBtn = popupEditProfile.querySelector('.popup__save-button');

const popupAddCard = document.querySelector('.popup_content_add-card');
export const popupAddCardForm = popupAddCard.querySelector('.popup__form');
export const popupAddCardInputTitle = popupAddCard.querySelector('.popup__input_content_title');
export const popupAddCardInputImage = popupAddCard.querySelector('.popup__input_content_image');
export const popupAddCardSubmitBtn = popupAddCard.querySelector('.popup__save-button');

const popupEditAvatar = document.querySelector('.popup_content_edit-avatar');
export const popupEditAvatarForm = popupEditAvatar.querySelector('.popup__form');
export const popupEditAvatarSubmitBtn = popupEditAvatar.querySelector('.popup__save-button');