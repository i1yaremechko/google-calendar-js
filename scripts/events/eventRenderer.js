import { getItem, setItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { getEventsList } from '../server/eventsGateway.js';
import { createEventElement } from './eventElement.js';

export const renderEvents = async () => {  
  document.querySelectorAll('.event').forEach(elem => elem.remove());

  try {
    const events = await getEventsList();
    setItem('events', events);
    const displayedWeekStart = getItem('displayedWeekStart');
    const weekDates = generateWeekRange(displayedWeekStart);
    
    const weekDatesStrings = weekDates.map(date => date.toDateString());

    events.forEach(event => {
      const eventStart = new Date(event.start);
      
      if (weekDatesStrings.includes(eventStart.toDateString())) {
        const slotSelector = `.calendar__day[data-day="${eventStart.getDate()}"] .calendar__time-slot[data-time="${eventStart.getHours()}"]`;
        const timeSlotElem = document.querySelector(slotSelector);

        if (timeSlotElem) {
          timeSlotElem.append(createEventElement(event));
        }
      }
    });
  } catch (err) {
    alert('Internal Server Error');
  }
};