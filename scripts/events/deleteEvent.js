import { closePopup } from '../common/popup.js';
import shmoment from '../common/shmoment.js';
import { getItem, setItem } from '../common/storage.js';
import { renderEvents } from './eventRenderer.js';

export function onDeleteEvent() {
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