import { openPopup } from '../common/popup.js';
import { getItem, setItem } from '../common/storage.js';
import { onChangeEventColor } from './changeColor.js';
import { onDeleteEvent } from './deleteEvent.js';
import { renderEvents } from './renderer.js';

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
  if (currentEvent && colorPickerInPopup) {
    colorPickerInPopup.value = currentEvent.color || '#71a1e0';
  }

  openPopup(event.clientX, event.clientY);
}

export function initEvents() {
  weekElem.addEventListener('click', handleEventClick);
  deleteEventBtn.addEventListener('click', onDeleteEvent);
  
  if (colorPickerInPopup) {
    colorPickerInPopup.addEventListener('input', onChangeEventColor);
  }

  renderEvents();
}