import { closeModal } from '../common/modal.js';
import { getDateTime } from '../common/time.utils.js';
import { createEvent, getEventsList } from '../server/eventsGateway.js';
import { renderEvents } from './eventRenderer.js';

const eventFormElem = document.querySelector('.event-form');

async function onCreateEvent(event) {
  event.preventDefault();
  const formData = new FormData(eventFormElem);

  const startDateTime = getDateTime(formData.get('date'), formData.get('startTime'));
  const endDateTime = getDateTime(formData.get('date'), formData.get('endTime'));

  try {
    const currentEvents = await getEventsList();
    const isOverlapping = currentEvents.some(e => 
      startDateTime < new Date(e.end) && endDateTime > new Date(e.start)
    );

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

    await createEvent(newEvent);
    closeModal();
    eventFormElem.reset();
    renderEvents();
  } catch (err) {
    alert('Internal Server Error');
  }
}

export function initEventForm() {
  eventFormElem.addEventListener('submit', onCreateEvent);
}
