import { closePopup, openPopup } from '../common/popup.js';
import { getItem, setItem } from '../common/storage.js';
// import shmoment from '../common/shmoment.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');

function handleEventClick(event) {
  const eventElem = event.target.closest('.event');
  if (!eventElem) return;

  event.stopPropagation();

  const eventId = eventElem.dataset.eventId;
  setItem('selectedEventId', eventId);

  openPopup(event.clientX, event.clientY);
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
  const eventId = getItem('selectedEventId');
  const events = getItem('events') || [];

  const updateEvents = events.filter(event => event.id !== eventId);

  setItem('events', updateEvents);
  closePopup();
  renderEvents();
}

deleteEventBtn.addEventListener('click', onDeleteEvent);
weekElem.addEventListener('click', handleEventClick);
