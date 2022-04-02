const popupEdit = document.querySelector('.popup-edit');
const editButton = document.querySelector('.profile__button_type_edit');
const closeButton1 = document.querySelectorAll('.popup__button-close')[0];
const closeButton2 = document.querySelectorAll('.popup__button-close')[1];
const popupAdd = document.querySelector('.popup-add');
const addButton = document.querySelector('.profile__button_type_add');
const popup = document.querySelector('.popup');

editButton.addEventListener('click', function() {
    popupEdit.classList.add('popup_opened');

    const name = document.querySelector('.profile__name');
    const about = document.querySelector('.profile__description');
    const inputName = document.querySelector('#name');
    const inputAbout = document.querySelector('#about');
    inputName.value = name.textContent;
    inputAbout.value = about.textContent;

    const formElement = document.querySelector('.form');
    function formSubmitHandler (evt) {
        evt.preventDefault();
        inputName.value;
        inputAbout.value;
        name.textContent = inputName.value;
        about.textContent = inputAbout.value;
        popupEditClose();
    }
    formElement.addEventListener('submit', formSubmitHandler);

});

addButton.addEventListener('click', function() {
    popupAdd.classList.add('popup_opened');
});

function popupEditClose() {
    popupEdit.classList.remove('popup_opened'); //optimize code
}

function popupAddClose() {
    popupAdd.classList.remove('popup_opened');
}

closeButton1.addEventListener('click', popupEditClose);
closeButton2.addEventListener('click', popupAddClose);

