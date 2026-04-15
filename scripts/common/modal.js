const modalElem = document.querySelector('.modal');
const closeBtnElem = document.querySelector('.create-event__close-btn'); // Знаходимо кнопку за класом

export const openModal = () => {
  modalElem.classList.remove('hidden');
};

export const closeModal = () => {
  modalElem.classList.add('hidden');
};

closeBtnElem.addEventListener('click', closeModal);