import { getItem } from '../common/storage.js';
// import { getItem, setItem } from '../common/storage.js';
// import shmoment from '../common/shmoment.js';
// import { openPopup, closePopup } from '../common/popup.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');

function handleEventClick(event) {
  // если произошел клик по событию, то нужно паказать попап с кнопкой удаления
  // установите eventIdToDelete с id события в storage
}

function removeEventsFromCalendar() {
  // ф-ция для удаления всех событий с календаря
}

const createEventElement = (event) => {
  const start = new Date(event.start);
  const end = new Date(event.end);

  const eventElem = document.createElement('div');
  eventElem.classList.add('event');

  eventElem.dataset.eventId = event.id;

  const durationInMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
  eventElem.style.height = `${durationInMinutes}px`;

  eventElem.style.top = `${start.getHours() * 60 + start.getMinutes()}px`;

  const startHours = start.getHours().toString().padStart(2, '0');
  const starMinutes = start.getMinutes().toString().padStart(2, '0');
  const endHours = end.getHours().toString().padStart(2, '0');
  const endMinutes = end.getMinutes().toString().padStart(2, '0');

  eventElem.innerHTML = `
    <div class="event__title">${event.title}</div>
    <div class="event__time">${startHours}:${starMinutes} - ${endHours}:${endMinutes}</div>
    <div class="event__description">${event.description || ''}</div>
  `;

  return eventElem;
};

export const renderEvents = () => {
  const existingEvents = document.querySelectorAll('.event');
  existingEvents.forEach(elem => elem.remove());

  const events = getItem('events') || [];

  events.forEach(event => {
    const start = new Date(event.start);
    const eventDay = start.getDate();
    const eventHour = start.getHours();

    const slotSelector = `.calendar__day[data-day="${eventDay}"] .calendar__time-slot[data-time="${eventHour}"]`;
    const timeSlotElem = document.querySelector(slotSelector);

    if (timeSlotElem) {
      const eventElement = createEventElement(event);
      timeSlotElem.append(eventElement);
    }
  });
};

function onDeleteEvent() {
  // достаем из storage массив событий и eventIdToDelete
  // удаляем из массива нужное событие и записываем в storage новый массив
  // закрыть попап
  // перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)
}

deleteEventBtn.addEventListener('click', onDeleteEvent);
weekElem.addEventListener('click', handleEventClick);
