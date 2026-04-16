import { getItem, setItem } from '../common/storage.js';
import { updateEvent } from '../server/eventsGateway.js';
import { fetchAndRenderEvents, renderEvents } from './eventRenderer.js';

export async function onChangeEventColor(event) {
  const eventId = getItem('selectedEventId');
  const newColor = event.target.value;
  let events = getItem('events') || [];

  events = events.map(e => 
    e.id === eventId ? { ...e, color: newColor } : e
  );
  setItem('events', events);

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
