import { getItem, setItem } from '../common/storage.js';
import { renderEvents } from './renderer.js';

export function onChangeEventColor(event) {
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