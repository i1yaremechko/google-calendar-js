import { createNumbersArray } from '../common/createNumbersArray.js';
import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { renderEvents } from '../events/events.js';


const generateDay = () => {
  const hours = createNumbersArray(0, 23);

  return hours.map(hour => {
    return `<div class="calendar__time-slot" data-time="${hour}"></div>`;
  }).join('');
};

export const renderWeek = () => {
  const weekContainer = document.querySelector('.calendar__week');
  const displayedWeekStart = getItem('displayedWeekStart');
  const weekDates = generateWeekRange(displayedWeekStart);

  const weekMarkup = weekDates.map(date => {
    return `
      <div class="calendar__day" data-day="${date.getDate()}">
        ${generateDay()} 
      </div>
    `;
  }).join('');

  weekContainer.innerHTML = weekMarkup;

  renderEvents();
};
