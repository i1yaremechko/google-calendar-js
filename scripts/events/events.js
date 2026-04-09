import { closePopup, openPopup } from '../common/popup.js';
import shmoment from '../common/shmoment.js';
import { getItem, setItem } from '../common/storage.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');
const colorPickerInPopup = document.querySelector('.change-event-color-picker');

function handleEventClick(event) {
  const eventElem = event.target.closest('.event');
  if (!eventElem) return;

  event.stopPropagation();
  const eventId = eventElem.dataset.eventId;
  setItem('selectedEventId', eventId);

  const events = getItem('events') || [];
  const currentEvent = events.find(e => e.id === eventId);
  if (currentEvent) {
    colorPickerInPopup.value = currentEvent.color || '#71a1e0';
  }

  openPopup(event.clientX, event.clientY);
}

function removeEventsFromCalendar() {
  const existingEvents = document.querySelectorAll('.event');
  existingEvents.forEach(elem => elem.remove());
}

const createEventElement = (event) => {
  const start = new Date(event.start);
  const end = new Date(event.end);

  const eventElem = document.createElement('div');
  eventElem.classList.add('event');
  eventElem.dataset.eventId = event.id;
  eventElem.style.backgroundColor = event.color || '#71a1e0';

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
  removeEventsFromCalendar();
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

function onChangeEventColor(event) {
  const eventId = getItem('selectedEventId');
  const events = getItem('events') || [];
  const newColor = event.target.value;

  const updatedEvents = events.map((e) => {
    if (e.id === eventId) {
      return { ...e, color: newColor };
    }
    return e;
  });

  setItem('events', updatedEvents);
  renderEvents();
}

function onDeleteEvent() {
  const eventId = getItem('selectedEventId');
  const events = getItem('events') || [];
  const eventToDelete = events.find(event => event.id === eventId);
  
  if (!eventToDelete) {
    closePopup();
    return;
  }
  
  const currentDate = new Date();
  const eventStart = new Date(eventToDelete.start);
  const deleteLimit = shmoment(eventStart).subtract('minutes', 15).result();

  if (currentDate > deleteLimit && currentDate < eventStart) {
    alert('You cannot delete an event less than 15 minutes before it starts!');
    return;
  }

  const updateEvents = events.filter(event => event.id !== eventId);

  setItem('events', updateEvents);
  closePopup();
  renderEvents();
}

if (colorPickerInPopup) {
  colorPickerInPopup.addEventListener('input', onChangeEventColor);
}
deleteEventBtn.addEventListener('click', onDeleteEvent);
weekElem.addEventListener('click', handleEventClick);
