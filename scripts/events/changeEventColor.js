import { getItem, setItem, STORAGE_KEY_EVENTS, STORAGE_KEY_SELECTED_EVENT_ID } from '../common/storage.js';
import { updateEvent } from '../server/eventsGateway.js';
import { fetchAndRenderEvents, renderEvents } from './eventRenderer.js';

export const onChangeEventColor = async (event) => {
  const eventId = getItem(STORAGE_KEY_SELECTED_EVENT_ID);
  const newColor = event.target.value;
  let events = getItem(STORAGE_KEY_EVENTS) || [];

  events = events.map(e => 
    e.id === eventId ? { ...e, color: newColor } : e
  );
  setItem(STORAGE_KEY_EVENTS, events);

  const eventElem = document.querySelector(`.event[data-event-id="${eventId}"]`);
  if (eventElem) {
    eventElem.style.backgroundColor = newColor;
  }

  try {
    const eventToUpdate = events.find(e => e.id === eventId);
    await updateEvent(eventId, eventToUpdate);

    renderEvents();
  } catch (error) {
    alert('error updating color on server')
    await fetchAndRenderEvents();
  }
};
