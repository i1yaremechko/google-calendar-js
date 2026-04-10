import { closeModal } from '../common/modal.js';
import { getItem, setItem } from '../common/storage.js';
import { getDateTime } from '../common/time.utils.js';
import { renderEvents } from './renderer.js';

const eventFormElem = document.querySelector('.event-form');
const closeEventFormBtn = document.querySelector('.create-event__close-btn');

function clearEventForm() {
  eventFormElem.reset();
}

function onCloseEventForm() {
  closeModal();
  clearEventForm();
}

function onCreateEvent(event) {
  event.preventDefault();
  const formData = new FormData(eventFormElem);

  const title = formData.get('title') || 'No Title'; 
  const description = formData.get('description');
  const date = formData.get('date');
  const startTime = formData.get('startTime');
  const endTime = formData.get('endTime');
  const selectedColor = formData.get('color');

  if (!date || !startTime || !endTime) {
    alert('Please fill in the date and time of the event!');
    return;
  }

  const startDateTime = getDateTime(date, startTime);
  const endDateTime = getDateTime(date, endTime);
  const durationInMinutes = (endDateTime - startDateTime) / (1000 * 60);

  if (durationInMinutes <= 0) {
    alert('The end time must be later than the start time!');
    return;
  }

  if (startDateTime.getMinutes() % 15 !== 0 || endDateTime.getMinutes() % 15 !== 0) {
    alert('Start and end times should be a short 15 minutes!');
    return;
  }

  if (durationInMinutes > 360) {
    alert('The event cannot be longer than 6 hours!');
    return;
  }

  if (startDateTime.toDateString() !== endDateTime.toDateString()) {
    alert('The event must start and end within the same day!');
    return;
  }

  const currentEvents = getItem('events') || [];
  const isOverlapping = currentEvents.some(existingEvent => {
    const existingStart = new Date(existingEvent.start);
    const existingEnd = new Date(existingEvent.end);
    return startDateTime < existingEnd && endDateTime > existingStart;
  });

  if (isOverlapping) {
    alert('Another event is already planned for this time!');
    return;
  }

  const newEvent = {
    id: Math.random().toString(), 
    title,
    description,
    start: startDateTime,
    end: endDateTime,
    color: selectedColor,
  };

  const updatedEvents = [...currentEvents, newEvent];

  setItem('events', updatedEvents);
  onCloseEventForm();
  renderEvents();
};

export function initEventForm() {
  closeEventFormBtn.addEventListener('click', onCloseEventForm);
  eventFormElem.addEventListener('submit', onCreateEvent);
};
