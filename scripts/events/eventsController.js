import { openPopup } from '../common/popup.js';
import { getItem, setItem, STORAGE_KEY_EVENTS, STORAGE_KEY_SELECTED_EVENT_ID } from '../common/storage.js';
import { onChangeEventColor } from './changeEventColor.js';
import { onDeleteEvent } from './deleteEvent.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');
const colorPickerInPopup = document.querySelector('.change-event-color-picker');

const handleEventClick = (event) => {
  const eventElem = event.target.closest('.event');
  if (!eventElem) return;

  event.stopPropagation();
  const eventId = eventElem.dataset.eventId;
  setItem(STORAGE_KEY_SELECTED_EVENT_ID, eventId);

  const events = getItem(STORAGE_KEY_EVENTS) || [];
  const currentEvent = events.find(e => e.id === eventId);
  if (currentEvent && colorPickerInPopup) {
    colorPickerInPopup.value = currentEvent.color || '#1a73e8';
  }

  openPopup(event.clientX, event.clientY);
}

export const initEvents = () => {
  if (weekElem) {
    weekElem.addEventListener('click', handleEventClick);
  }
  
  if (deleteEventBtn) {
    deleteEventBtn.addEventListener('click', onDeleteEvent);
  }
  
  if (colorPickerInPopup) {
    colorPickerInPopup.addEventListener('change', onChangeEventColor);
  }
}
