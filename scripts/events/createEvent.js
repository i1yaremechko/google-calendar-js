import { closeModal } from '../common/modal.js';
import { getItem, STORAGE_KEY_EVENTS } from '../common/storage.js';
import { getDateTime } from '../common/time.utils.js';
import { createEvent } from '../server/eventsGateway.js';
import { fetchAndRenderEvents } from './eventRenderer.js';

const eventFormElem = document.querySelector('.event-form');

const onCreateEvent = async (event) => {
  event.preventDefault();
  const formData = new FormData(eventFormElem);

  const startDateTime = getDateTime(formData.get('date'), formData.get('startTime'));
  const endDateTime = getDateTime(formData.get('date'), formData.get('endTime'));

  const durationInMinutes = (endDateTime - startDateTime) / (1000 * 60);
  if (durationInMinutes % 15 !== 0) {
    alert('Event duration and start/end time must be a multiple of 15 minutes!');
    return;
  }

  if (durationInMinutes > 360) {
    alert('The event cannot last longer than 6 hours!');
    return;
  }

  if (startDateTime.toDateString() !== endDateTime.toDateString()) {
    alert('The event must start and end within the same day!');
    return;
  }

  const currentEvents = getItem(STORAGE_KEY_EVENTS) || []; 
  const isOverlapping = currentEvents.some(e => {
    const eStart = new Date(e.start);
    const eEnd = new Date(e.end);
    return startDateTime < eEnd && endDateTime > eStart;
  });

  if (isOverlapping) {
    alert('Another event is already planned for this time!');
    return;
  }

  const newEvent = {
    title: formData.get('title') || 'No Title',
    description: formData.get('description'),
    start: startDateTime.toISOString(),
    end: endDateTime.toISOString(),
    color: formData.get('color'),
  };

  try {
    await createEvent(newEvent);
    closeModal();
    eventFormElem.reset();
    await fetchAndRenderEvents();
  } catch (err) {
    alert('Internal Server Error');
  }
}

export const initEventForm = () => {
  eventFormElem.addEventListener('submit', onCreateEvent);
}
