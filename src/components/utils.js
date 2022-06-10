function keyHandler(evt) {
  if(evt.key === 'Escape') {
    Array.from(document.querySelectorAll('.popup')).forEach(popup => {
      closePopup(popup);
    })
  }
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
}