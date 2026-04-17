import { closePopup } from '../common/popup.js';
import { getItem, STORAGE_KEY_SELECTED_EVENT_ID } from '../common/storage.js';
import { deleteEvent } from '../server/eventsGateway.js';
import { fetchAndRenderEvents } from './eventRenderer.js';

export const onDeleteEvent = async () => {
  const eventId = getItem(STORAGE_KEY_SELECTED_EVENT_ID);
  if (!eventId) return;

  try {
    await deleteEvent(eventId);
    closePopup();
    await fetchAndRenderEvents();
  } catch (err) {
    alert('Internal Server Error');
  }
}
