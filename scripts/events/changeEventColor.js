import { getItem } from '../common/storage.js';
import { getEventsList, updateEvent } from '../server/eventsGateway.js';
import { renderEvents } from './eventRenderer.js';

export async function onChangeEventColor(event) {
  const eventId = getItem('selectedEventId');
  const newColor = event.target.value;

  const events = await getEventsList();
  const eventToUpdate = events.find(e => e.id === eventId);

  if (eventToUpdate) {
    const updated = { ...eventToUpdate, color: newColor };
    await updateEvent(eventId, updated);
    renderEvents();
  }
}
