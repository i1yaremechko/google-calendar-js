import { closeModal } from '../common/modal.js';
import { getItem, setItem } from '../common/storage.js';
import { getDateTime } from '../common/time.utils.js';
import { renderEvents } from './events.js';

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

  const title = formData.get('title'); 
  const description = formData.get('description');
  const date = formData.get('date');
  const startTime = formData.get('startTime');
  const endTime = formData.get('endTime');

  if (!date || !startTime || !endTime) {
    alert('Please fill in the date and time of the event!');
    return;
  }

  const startDateTime = getDateTime(date, startTime);
  const endDateTime = getDateTime(date, endTime);

  if (startDateTime.getTime() >= endDateTime.getTime()) {
    alert('The end time must be later than the start time!');
    return;
  }

  const newEvent = {
    id: Math.random().toString(), 
    title,
    description,
    start: startDateTime,
    end: endDateTime,
  };

  const currentEvents = getItem('events') || [];
  const updatedEvents = [...currentEvents, newEvent];

  setItem('events', updatedEvents);
  onCloseEventForm();

  renderEvents();
};

export function initEventForm() {
  closeEventFormBtn.addEventListener('click', onCloseEventForm);
  eventFormElem.addEventListener('submit', onCreateEvent);
};
