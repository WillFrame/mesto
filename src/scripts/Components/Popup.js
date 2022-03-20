export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
        this._popup.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt)
        });
    }

    close() {
        this._popup.classList.remove('popup_opened');
        this._popup.removeEventListener('keydown', (evt) => {
            this._handleEscClose(evt)
        });
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
                close();
            }
        });
    }
}