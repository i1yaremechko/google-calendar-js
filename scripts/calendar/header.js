import { getItem, STORAGE_KEY_DISPLAYED_WEEK_START } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';

const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export const renderHeader = () => {
  const headerContainer = document.querySelector('.calendar__header');
  const displayedWeekStart = getItem(STORAGE_KEY_DISPLAYED_WEEK_START);
  const weekDates = generateWeekRange(displayedWeekStart);

  const daysMarkup = weekDates.map(date => {
    const dayName = daysOfWeek[date.getDay()];
    const dayNumber = date.getDate();
    const isToday = new Date().toDateString() === date.toDateString();
    
    return `
      <div class="calendar__header-day" data-day="${dayNumber}">
        <span class="day-name">${dayName}</span>
        <span class="day-number ${isToday ? 'day-number_today' : ''}">${dayNumber}</span>
      </div>
    `;
  }).join('');

  headerContainer.innerHTML = `
    <div class="calendar__gmt-label">GMT+03</div>
    ${daysMarkup}
  `;
};