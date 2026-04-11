import { closePopup } from '../common/popup.js';
import { getItem } from '../common/storage.js';
import { deleteEvent } from '../server/eventsGateway.js';
import { renderEvents } from './eventRenderer.js';

export async function onDeleteEvent() {
  const eventId = getItem('selectedEventId');
  if (!eventId) return;

  try {
    await deleteEvent(eventId);
    closePopup();
    renderEvents();
  } catch (err) {
    alert('Internal Server Error');
  }
}
