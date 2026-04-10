import { getItem } from '../common/storage.js';
import { createEventElement } from './eventElement.js';

export const renderEvents = () => {
  document.querySelectorAll('.event').forEach(elem => elem.remove());

  const events = getItem('events') || [];
  
  events.forEach(event => {
    const start = new Date(event.start);
    const eventDay = start.getDate();
    const eventHour = start.getHours();

    const slotSelector = `.calendar__day[data-day="${eventDay}"] .calendar__time-slot[data-time="${eventHour}"]`;
    const timeSlotElem = document.querySelector(slotSelector);

    if (timeSlotElem) {
      timeSlotElem.append(createEventElement(event));
    }
  });
};