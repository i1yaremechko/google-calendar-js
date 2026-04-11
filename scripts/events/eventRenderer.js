import { getEventsList } from '../server/eventsGateway.js';
import { createEventElement } from './eventElement.js';

export const renderEvents = async () => {
  document.querySelectorAll('.event').forEach(elem => elem.remove());

  try {
    const events = await getEventsList();
    
    events.forEach(event => {
      const start = new Date(event.start);
      const slotSelector = `.calendar__day[data-day="${start.getDate()}"] .calendar__time-slot[data-time="${start.getHours()}"]`;
      const timeSlotElem = document.querySelector(slotSelector);

      if (timeSlotElem) {
        timeSlotElem.append(createEventElement(event));
      }
    });
  } catch (err) {
    alert('Internal Server Error');
  }
};
